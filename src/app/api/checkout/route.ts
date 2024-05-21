import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const redirectUrl = process.env.CHECKOUT_REDIRECT_URL;
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;

  const res = await req.json();

  if (!res.priceId || !redirectUrl || !stripeApiKey) {
    throw new Error('Invalid request');
  }

  try {
    const stripe = new Stripe(stripeApiKey);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: res.priceId,
          quantity: 1,
        },
      ],
      mode: res.type === 'recurring' ? 'subscription' : 'payment',
      automatic_tax: {
        enabled: process.env.ENV === 'prod',
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      success_url: `${redirectUrl}?success=true`,
      cancel_url: `${redirectUrl}?canceled=true`,
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    throw new Error(`Failed to create checkout session: ${error}`);
  }
}
