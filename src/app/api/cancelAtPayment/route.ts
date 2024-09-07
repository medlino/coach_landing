import { authMiddleware } from '@/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { PaymentStatus } from '@/interfaces/payment';
import clientPromise from '../../../lib/mongodb';

async function cancelAtPayment(id: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const filter = { subscription: id };
  const updateDocument = {
    $set: { status: PaymentStatus.CANCELED_AT },
  };
  return collection.updateOne(filter, updateDocument);
}

export async function PUT(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    throw new Error('Invalid request!');
  }

  try {
    const stripe = new Stripe(stripeKey);
    await authMiddleware(req);

    const res: Record<string, any> = await req.json();
    const { subscriptionId } = res;

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      proration_behavior: 'none',
    });
    await cancelAtPayment(subscriptionId);

    return NextResponse.json({});
  } catch (error) {
    console.error('Failed to cancel at payment:', error);
    throw error;
  }
}
