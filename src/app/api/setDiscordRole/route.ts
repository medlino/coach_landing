import { authMiddleware } from '@/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import clientPromise from '../../../lib/mongodb';

//TODO DRY - new layer for db would be great
async function getPaymentByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { email };
  return collection.findOne(query);
}

// TODO discord keys check, stripe check and init
export async function POST(req: NextRequest) {
  const paymentKey = process.env.PAYMENT_KEY;
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;
  const roleId = process.env.DISCORD_VIP_ROLE_ID;

  if (!guildId || !discordToken || !paymentKey || !roleId) {
    throw new Error('Invalid request!');
  }

  try {
    const session = await authMiddleware(req);
    const payment = await getPaymentByEmail(session?.email as string); //TODO: Fix this type
    jwt.verify(payment?.token as string, paymentKey);

    const userId = session?.uid;
    const url = `https://discord.com/api/v9/guilds/${guildId}/members/${userId}/roles/${roleId}`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${discordToken}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return NextResponse.json({});
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error('Failed to set discord role:', error);
    throw error;
  }
}
