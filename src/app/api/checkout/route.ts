import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const prices = await stripe.prices.list({
  //   limit: 4,
  // });

  // const id = prices.data[0]?.id;
  const id =
    process.env.ENV === 'dev'
      ? 'price_1P0sLaLFpYtzSWrXqf6da8eb'
      : 'price_1P1E6dLFpYtzSWrXbXpF1yVF';
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
    billing_address_collection: 'required',
    success_url:
      process.env.ENV === 'dev'
        ? 'http://localhost:3000?success=true'
        : 'https://elmeereje.hu?success=true',
    cancel_url:
      process.env.ENV === 'dev'
        ? 'http://localhost:3000?canceled=true'
        : 'https://elmeereje.hu',
  });

  return NextResponse.json(session);
}

export async function GET(_request: any) {
  return new Response('Hello, Next.js!');
}
