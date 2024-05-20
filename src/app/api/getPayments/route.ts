import { NextRequest, NextResponse } from 'next/server';

import { authMiddleware } from '@/middlewares/auth';
import clientPromise from '../../../lib/mongodb';

export interface MPayment {
  email: string;
  amount: number;
  date: Date;
  type: 'subscription' | 'payment';
  token: string;
  products: string[];
}

async function getPaymentsByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { email };
  return collection.find(query).toArray();
}

export async function GET(req: NextRequest) {
  const session = await authMiddleware(req);
  const email = session?.email;

  try {
    const payments = await getPaymentsByEmail(email as string);
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Failed to fetch payment status:', error);
    throw error;
  }
}
