import {
  getCountries,
  createClient,
  createInvoice,
  fetchExchnageRate,
} from '@/services/accounting';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export async function POST(req: Request) {
  const ENV = process.env.ENV;
  const stripeHookKey = process.env.STRIPE_INVOICE_PAYMENT_SUCCESS_HOOK_KEY;
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;
  const sig = req.headers.get('stripe-signature');

  if (!stripeApiKey || !stripeHookKey || !sig) {
    throw new Error('Invalid request');
  }

  let event;
  const stripe = new Stripe(stripeApiKey);
  const reqPayload = await req.text();

  try {
    event = stripe.webhooks.constructEvent(reqPayload, sig, stripeHookKey);
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    throw new Error(`Something went wrong! - ${err}`);
  }

  switch (event.type) {
    case 'invoice.payment_succeeded': {
      try {
        const session = event.data.object;
        const countries = await getCountries();

        if (
          ENV === 'prod' &&
          (!session.customer_address?.line1 ||
            !session.customer_address?.country ||
            !session.customer_address?.postal_code ||
            !session.customer_address?.city)
        ) {
          throw new Error(`Missing address data! ${session.customer_address}`);
        }

        const country = countries.find(
          (c) =>
            c.Country.iso ===
            session.customer_address?.country?.toLocaleLowerCase()
        );

        const newClient = {
          address: session.customer_address?.line1 || 'Tester address',
          city: session.customer_address?.city || 'Tester city',
          country: country?.Country.name || 'Hungary',
          country_id: country?.Country.id || 191, // TODO hungaries code
          currency: session.currency.toLocaleUpperCase(),
          email: session.customer_email || '',
          name: session.customer_name || 'Tester',
          phone: session.customer_phone || '',
          zip: session.customer_address?.postal_code || 'testZip',
        };

        const client = await createClient(newClient);
        const priceInEUR = await fetchExchnageRate(
          'EUR',
          'HUF',
          session.amount_paid / 100
        );

        const nowDate = getCurrentDate();
        const newInvoice = {
          Invoice: {
            invoice_currency: 'EUR',
            created: nowDate,
            delivery: nowDate,
            due: nowDate,
            already_paid: 1,
            comment: `Nie som platcom DPH ${session.amount_paid} HUF, ${priceInEUR} EUR 2122268643`,
          },
          InvoiceItem: [
            {
              name: 'Mentális egészségügyi képzés - Tréning v oblasti duševného zdravia',
              tax: 27,
              quantity: 1,
              unit_price: priceInEUR,
            },
          ],
          Client: {
            name: client.name,
            ico: client.ico,
            match_address: client.address,
            zip: client.zip,
            email: client.email,
            country_id: client.country_id,
            city: client.city,
          },
        };
        await createInvoice(newInvoice);
      } catch (error) {
        console.error(error);
        throw new Error(`INVOICE! - Something went wrong! - ${error}`);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
