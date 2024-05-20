import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import clientPromise from '../../../lib/mongodb';
import { MPayment, PaymentStatus } from '@/interfaces/payment';

async function getPayment(id: string): Promise<MPayment | null> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { subscription: id };
  return collection.findOne(query) as Promise<MPayment | null>;
}

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

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripeApiKey = process.env.STRIPE_API_KEY;
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;
  const sig = req.headers.get('stripe-signature');

  if (!stripeKey || !stripeApiKey || !sig || !discordToken || !guildId) {
    return NextResponse.json({ error: 'Invalid request' });
  }

  let event;
  const stripe = new Stripe(stripeKey!);
  const reqPayload = await req.text();

  try {
    event = stripe.webhooks.constructEvent(reqPayload, sig, stripeApiKey!);
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    return NextResponse.json({ error: 'Something wen wrong!' });
  }

  switch (event.type) {
    case 'customer.subscription.deleted': {
      const session = event.data.object;
      const payment = await getPayment(session.id);

      if (!payment) {
        throw new Error('Payment not found!');
      }
      if (!payment.userId) {
        throw new Error('User not found!');
      }

      const urls = payment.roles.map(
        (role) =>
          `https://discord.com/api/v9/guilds/${guildId}/members/${payment.userId}/roles/${role.id}`
      );
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bot ${discordToken}`,
        },
      };

      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url, options))
        );
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        });
        const cancelled = await cancelPayment(session.id);
        console.log(cancelled);
      } catch (error) {
        console.error(error);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
