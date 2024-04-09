import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const id =
    process.env.ENV === 'dev'
      ? 'price_1P1C4hLFpYtzSWrXNXCma1rx'
      : 'price_1P3YskLFpYtzSWrXywduRFHh';
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
    automatic_tax: {
      enabled: true,
    },
    billing_address_collection: 'required',
    success_url:
      process.env.ENV === 'dev'
        ? 'http://localhost:3000?success=true'
        : 'https://elmeereje.hu?success=true',
    cancel_url:
      process.env.ENV === 'dev'
        ? 'http://localhost:3000?cancel=true'
        : 'https://elmeereje.hu?cancel=true',
  });

  return NextResponse.json(session);
}

export async function GET(_request: any) {
  return new Response('Hello, Next.js!');
}
