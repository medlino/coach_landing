import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

import { productRoleMap } from '@/constants/product';
import { dedupArr } from '@/utils/dedupArray';
import { PaymentStatus } from '@/interfaces/payment';
import clientPromise from '../../../lib/mongodb';

async function insertPayment(data: any) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  return await collection.insertOne(data);
}

async function retrievePaymentProductDetails(
  stripe: Stripe,
  sessionId: string
) {
  try {
    const productPromises: Promise<Stripe.Response<Stripe.Product>>[] = [];
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 5,
    });

    lineItems.data.forEach((item) => {
      productPromises.push(
        stripe.products.retrieve(item.price?.product as string)
      );
    });

    const products = await Promise.all(productPromises);
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      desc: p.description,
      defaultPrice: p.default_price,
    }));
  } catch (error) {
    console.error('Error retrieving payment product details:', error);
    return [];
  }
}

async function retrieveSubProductDetails(stripe: Stripe, subscription: string) {
  try {
    const productPromises: Promise<Stripe.Response<Stripe.Product>>[] = [];
    const sub = await stripe.subscriptions.retrieve(subscription);
    const items = sub.items.data;

    items.forEach((item) => {
      productPromises.push(
        stripe.products.retrieve(item.price.product as string)
      );
    });

    const products = await Promise.all(productPromises);
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      defaultPrice: p.default_price,
    }));
  } catch (error) {
    console.error('Error retrieving subscription product details:', error);
    return [];
  }
}

async function genPaymentData(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  paymentKey: string
) {
  const name = session.customer_details?.name;
  const email = session.customer_details?.email;
  const products =
    session.mode === 'subscription'
      ? await retrieveSubProductDetails(stripe, session.subscription as string)
      : await retrievePaymentProductDetails(stripe, session.id);

  let dupedRoles = products
    .map((p) => productRoleMap[p.id])
    .flat()
    .filter((r) => r);
  if (!dupedRoles.length && process.env.ENV === 'dev') {
    dupedRoles = [{ id: '1229468577279770755', name: 'VIP' }];
  } else if (!dupedRoles.length && process.env.ENV === 'prod') {
    throw new Error('No roles found for product');
  }

  const dedupedRoles = dedupArr(dupedRoles, 'id');
  const roles = dedupArr(dedupedRoles, 'id');

  const data = {
    email,
    amount: session.amount_total,
    date: new Date(),
    type: session.mode as string,
    token: jwt.sign({ email }, paymentKey!),
    checkoutId: session.id,
    payment_intent: session.payment_intent,
    subscription: session.subscription,
    status: PaymentStatus.ROLE_ADD_PENDING,
    roles,
    products,
  };

  return data;
}

function genEmail(data: any) {
  //TODO mail
  const msg = {
    to: 'commonlevi.cl@gmail.com',
    from: 'hellomedlino@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js <a href="http://localhost:3000/aktivalas/" target="_blank" rel="noopener noreferrer">Verify</a></strong>',
  };

  return msg;
}

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripeApiKey = process.env.STRIPE_API_KEY;
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const paymentKey = process.env.PAYMENT_KEY;
  const sig = req.headers.get('stripe-signature');

  if (!stripeKey || !stripeApiKey || !sig || !sendGridApiKey || !paymentKey) {
    return NextResponse.json({ error: 'Invalid request' });
  }

  let event;
  const stripe = new Stripe(stripeKey!);
  const reqPayload = await req.text();

  try {
    event = stripe.webhooks.constructEvent(reqPayload, sig, stripeApiKey!);
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    return NextResponse.json({ error: 'Something wen wrong!' });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      try {
        const data = await genPaymentData(stripe, session, paymentKey!);
        const email = genEmail(data);
        await insertPayment(data);

        sgMail.setApiKey(sendGridApiKey!);
        await sgMail.send(email);
      } catch (error) {
        console.error(error);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
