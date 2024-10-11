import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '../../../lib/mongodb';
import { Gift } from '@/interfaces/gift';

async function getGifts(qr_id: string): Promise<Gift | null> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<Gift>('gifts');
  const query = { qr_id };
  return collection.findOne(query);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const qr_id = searchParams.get('id');

  if (!qr_id) {
    throw new Error('Invalid request');
  }

  try {
    const gift = await getGifts(qr_id);

    return NextResponse.json({
      name: gift?.name,
      giftId: gift?.giftId,
    });
  } catch (error) {
    console.error('Failed to fetch gift:', error);
    throw error;
  }
}

export const dynamic = 'force-dynamic';
