import Stripe from 'stripe';

export async function stripeCheckout(options?: {
  type: 'recurring' | 'one_time';
  priceId: string;
}) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(options),
    });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
    }

    const session = (await response.json()) as Stripe.Checkout.Session;
    window.location.assign(session.url!);
  } catch (error: any) {
    console.error('Something went wrong!', JSON.stringify(error));
    throw new Error('Something went wrong!');
  }
}
