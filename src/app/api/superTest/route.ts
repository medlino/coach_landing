import {
  createClient,
  createInvoice,
  getClientList,
} from '@/services/accounting';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const payments = await getClientList('test');
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Failed to fetch payment status:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const newClient = {
      address: 'Mese Világ',
      city: 'Budapest',
      country: 'Hungary',
      currency: 'HUF',
      email: 'tester@gmail.com',
      name: 'Tester',
      phone: '+36123456789',
      zip: '1234',
    };

    const client = await createClient(newClient);
    console.log(client);

    const newInvoice = {
      Invoice: {
        invoice_currency: 'EUR',
        created: '2025-01-19',
        delivery: '2025-01-19',
        due: '2025-01-19',
        already_paid: 1,
        comment: `Mi vvan veled?
        negereeerem`,
      },
      InvoiceItem: [
        {
          name: 'Mentális egészségügyi képzés - Tréning v oblasti duševného zdravia',
          tax: 27,
          unit_price: 4500,
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

    const invoice = await createInvoice(newInvoice);

    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    throw new Error(`Failed to create checkout session: ${error}`);
  }
}
