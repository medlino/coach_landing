import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const prices = await stripe.prices.list({
    limit: 4,
  });

  const id = prices.data[0]?.id;
  if (!id) {
    throw new Error('No price found!');
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  });

  return NextResponse.json(session);
}

export async function GET(_request: any) {
  return new Response('Hello, Next.js!');
}
