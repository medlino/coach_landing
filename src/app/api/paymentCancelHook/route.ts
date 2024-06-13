import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import clientPromise from '../../../lib/mongodb';
import { MPayment } from '@/interfaces/payment';

async function getPayment(id: string): Promise<MPayment | null> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('payments');
  const query = { subscription: id };
  return collection.findOne(query) as Promise<MPayment | null>;
}

export async function POST(req: Request) {
  const stripeHookKey = process.env.STRIPE_PAYMENT_CANCELED_HOOK_KEY;
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;
  const sig = req.headers.get('stripe-signature');

  if (!stripeApiKey || !stripeHookKey || !sig || !discordToken || !guildId) {
    throw new Error('Invalid request');
  }

  let event;
  const stripe = new Stripe(stripeApiKey!);
  const reqPayload = await req.text();

  try {
    event = stripe.webhooks.constructEvent(reqPayload, sig, stripeHookKey!);
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    throw new Error(`Something went wrong! - ${err}`);
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
      } catch (error) {
        console.error(error);
        throw new Error(`Something went wrong! - ${error}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
