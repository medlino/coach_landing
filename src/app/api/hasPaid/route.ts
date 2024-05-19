import { NextRequest, NextResponse } from 'next/server';

import { authMiddleware } from '@/middlewares/auth';
import clientPromise from '../../../lib/mongodb';

// TODO: An additional stripe check would be great
async function getPaymentByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { email };
  return collection.findOne(query);
}

export async function GET(req: NextRequest) {
  const session = await authMiddleware(req);
  const email = session?.email;

  try {
    const payment = await getPaymentByEmail(email as string);
    return NextResponse.json(!!payment);
  } catch (error) {
    console.error('Failed to fetch payment status:', error);
    throw error;
  }
}
