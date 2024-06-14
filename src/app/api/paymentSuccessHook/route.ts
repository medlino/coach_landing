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

    const prodRecurringMap: Record<
      string,
      { interval?: string; intervalCount?: number }
    > = {};
    items.forEach((item) => {
      prodRecurringMap[item.price.product as string] = {
        interval: item.price.recurring?.interval,
        intervalCount: item.price.recurring?.interval_count,
      };
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
      recurring: prodRecurringMap[p.id],
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
    dupedRoles = [{ id: '1229468577279770755', name: 'TAG' }]; // dev mock
  } else if (!dupedRoles.length && process.env.ENV === 'prod') {
    console.error('No roles found for product');
    dupedRoles = [{ id: '1229468577279770755', name: 'TAG' }]; // prod mock ()
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

function genEmail(email: string) {
  const msg = {
    to: email,
    from: 'hellomedlino@gmail.com',
    subject: 'Elme Ereje közösség - sikeres vásárlás!',
    html: '<div><strong>Kedves Elme Ereje Tag, </strong><p>Gratulálunk a csatlakozáshoz, ezzel meghoztál egy fontos döntését. Minden, amit a közösségünkben találsz neked és érted készült. Mi azon dolgozunk, hogy a lehető legtöbb tudást átadjuk és a lehető leghasznosabb és izgalmasabb eseményeket biztosítsuk, melyek segítségével egy következő szintre tudod emelni az életed. </p><p>Kérlek nézd meg a következő videót, amelyben elmagyarázzuk a csatlakozás lépéseit! </p><p><a href="https://www.loom.com/share/d0e476167684418594a599cca080b798?sid=5f6356e5-8ab4-4ca5-97f3-b240a0f26090" target="_blank" rel="noopener noreferrer">Itt tudod megtekinteni a videót</a></p><p><a href="https://elmeereje.hu/aktivalas/" target="_blank" rel="noopener noreferrer">Itt tudod elindítani az aktiválási folyamatot</a></p><span>Köszönettel,</span><p>Dokik</p></div>',
  };

  return msg;
}

export async function POST(req: Request) {
  const stripeHookKey = process.env.STRIPE_PAYMENT_SUCCESS_HOOK_KEY;
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const paymentKey = process.env.PAYMENT_KEY;
  const sig = req.headers.get('stripe-signature');

  if (
    !stripeHookKey ||
    !stripeApiKey ||
    !sig ||
    !sendGridApiKey ||
    !paymentKey
  ) {
    throw new Error('Invalid request');
  }

  let event;
  const stripe = new Stripe(stripeApiKey!);
  const reqPayload = await req.text();

  try {
    event = stripe.webhooks.constructEvent(reqPayload, sig, stripeHookKey!);
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    throw new Error(`Something went wrong! - ${err}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      try {
        const data = await genPaymentData(stripe, session, paymentKey!);
        const email = genEmail(data.email!);
        await insertPayment(data);

        sgMail.setApiKey(sendGridApiKey!);
        await sgMail.send(email);
      } catch (error) {
        console.error(error);
        throw new Error(`Something went wrong! - ${error}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
