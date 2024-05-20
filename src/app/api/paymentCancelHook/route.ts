import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import clientPromise from '../../../lib/mongodb';

async function insertPayment(data: any) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  return await collection.insertOne(data);
}

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripeApiKey = process.env.STRIPE_API_KEY;
  const sig = req.headers.get('stripe-signature');

  if (!stripeKey || !stripeApiKey || !sig) {
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
    case 'customer.subscription.deleted': {
      const session = event.data.object;

      try {
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
