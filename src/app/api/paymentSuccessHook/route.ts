import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripeApiKey = process.env.STRIPE_API_KEY;
  const sendGridApiKey = process.env.SENDGRID_API_KEY;
  const sig = req.headers.get('stripe-signature');

  if (!stripeKey || !stripeApiKey || !sig || !sendGridApiKey) {
    return NextResponse.json({ error: 'Invalid request' });
  }

  let event;
  const stripe = new Stripe(stripeKey!);
  const res = await req.json();
  sgMail.setApiKey(sendGridApiKey!);

  try {
    event = stripe.webhooks.constructEvent(res.body, sig, stripeApiKey!);
  } catch (err) {
    console.error(`Error: ${err}`);
    return NextResponse.json({ error: 'Something wen wrong!' });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object;
      const msg = {
        to: 'commonlevi.cl@gmail.com',
        from: 'hellomedlino@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>and easy to do anywhere, even with Node.js ${JSON.stringify(
          checkoutSessionCompleted
        )}</strong>`,
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        /*    if (error.response) {
            console.error(error.response.body)
          } */
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({});
}
