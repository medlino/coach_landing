import Stripe from 'stripe';

export async function stripeCheckout() {
  try {
    const response = await fetch('/api/checkout', { method: 'POST' });
    if (!response.ok) {
      console.error('Something went wrong!');
    }

    const session = (await response.json()) as Stripe.Checkout.Session;
    console.log(session);
    window.location.assign(session.url!);
  } catch (error: any) {
    console.error('Something went wrong!');
  }
}
