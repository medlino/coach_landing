import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export interface Product extends Stripe.Product {
  price: Stripe.Price;
}

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const responses = await Promise.all([
    stripe.products.list(),
    stripe.prices.list(),
  ]);

  const products = responses[0].data;
  const prices = responses[1].data;

  const mappedProducts = products.map((product) => ({
    ...product,
    price: prices.find((price) => price.id === product.default_price)!,
  }));

  return NextResponse.json(mappedProducts);
}
