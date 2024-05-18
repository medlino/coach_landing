import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const res = await req.json();

  const id =
    res.priceId ||
    (process.env.ENV === 'dev'
      ? 'price_1P1C4hLFpYtzSWrXNXCma1rx'
      : 'price_1PGiEaLFpYtzSWrXK835KTaN');
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
    mode: res.type === 'recurring' ? 'subscription' : 'payment',
    /*     automatic_tax: {
      enabled: true,
    }, */
    allow_promotion_codes: true,
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
