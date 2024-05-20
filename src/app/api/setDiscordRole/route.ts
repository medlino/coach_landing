import { authMiddleware } from '@/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import clientPromise from '../../../lib/mongodb';
import { MPayment, PaymentStatus } from '@/interfaces/payment';

async function getPayment(
  checkoutId: string,
  email: string
): Promise<MPayment | null> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { checkoutId, email };
  return collection.findOne(query) as Promise<MPayment | null>;
}

async function activatePayment(checkoutId: string, userId: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const filter = { checkoutId };
  const updateDocument = {
    $set: { status: PaymentStatus.ACTIVE, userId },
  };
  return collection.updateOne(filter, updateDocument);
}

// TODO discord keys check, stripe check and init
export async function POST(req: NextRequest) {
  const paymentKey = process.env.PAYMENT_KEY;
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId || !discordToken || !paymentKey) {
    throw new Error('Invalid request!');
  }

  try {
    const session = await authMiddleware(req);

    const body = await req.json();
    const { checkoutId } = body;

    const payment = await getPayment(checkoutId, session?.email as string);
    if (!payment) {
      throw new Error('Payment not found!');
    }

    jwt.verify(payment?.token as string, paymentKey);

    const userId = session.uid;
    const urls = payment.roles.map(
      (role) =>
        `https://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/${role.id}`
    );
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${discordToken}`,
      },
    };
    const responses = await Promise.all(urls.map((url) => fetch(url, options)));
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    });

    await activatePayment(checkoutId, userId);

    return NextResponse.json({});
  } catch (error) {
    console.error('Failed to set discord role:', error);
    throw error;
  }
}
