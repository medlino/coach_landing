import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import clientPromise from '../../../lib/mongodb';

async function getPaymentByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { email };
  return collection.findOne(query);
}

export async function GET(req: NextRequest) {
  const authKey = process.env.NEXTAUTH_SECRET;

  if (!authKey) {
    throw new Error('Invalid request!');
  }

  let session;
  try {
    session = await getToken({ req, secret: authKey });
  } catch (error) {
    console.error(error);
    throw new Error('Unauthorized');
  }

  try {
    const email = session?.email;
    const payment = await getPaymentByEmail(email as string);
    return NextResponse.json(payment);
  } catch (error) {
    console.error('Failed to fetch payment status:', error);
    throw error;
  }
}
