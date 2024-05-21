import Stripe from 'stripe';

export interface MProduct {
  id: string;
  name: string;
  type: string;
  desc: string;
  defaultPrice: string | null;
}

export interface Product extends Stripe.Product {
  price: Stripe.Price;
}

export interface SanitizedPrice {
  id: string;
  active: boolean;
  currency: string;
  unit_amount: number;
  type: 'recurring' | 'one_time';
  interval?: 'day' | 'week' | 'month' | 'year';
}

export interface SanitizedProduct {
  id: string;
  active: boolean;
  default_price: string;
  description: string | null;
  features: Record<string, string>;
  name: string;
  images: string[];
  price: SanitizedPrice;
}
