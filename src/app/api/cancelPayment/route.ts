import { authMiddleware } from '@/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function DELETE(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    throw new Error('Invalid request!');
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    await authMiddleware(req);

    const res = await req.json();
    const { subscriptionId } = res;

    await stripe.subscriptions.cancel(subscriptionId as string);

    return NextResponse.json({});
  } catch (error) {
    console.error('Failed to cancel payment:', error);
    throw error;
  }
}
