import { authMiddleware } from '@/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { PaymentStatus } from '@/interfaces/payment';
import clientPromise from '../../../lib/mongodb';

async function cancelPayment(id: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const filter = { subscription: id };
  const updateDocument = {
    $set: { status: PaymentStatus.CANCELED },
  };
  return collection.updateOne(filter, updateDocument);
}

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
    await cancelPayment(subscriptionId as string);

    return NextResponse.json({});
  } catch (error) {
    console.error('Failed to cancel payment:', error);
    throw error;
  }
}
