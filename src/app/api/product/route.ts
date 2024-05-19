import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export interface Product extends Stripe.Product {
  price: Stripe.Price;
}

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const responses = await Promise.all([
    stripe.products.list({ limit: 100 }),
    stripe.prices.list({ limit: 100 }),
  ]);

  const products = responses[0].data;
  const prices = responses[1].data;

  const mappedProducts = products
    .map((product) => ({
      ...product,
      price: prices.find((price) => price.id === product.default_price)!,
    }))
    .filter((product) => product.active);

  return NextResponse.json(mappedProducts);
}
