import { Product } from '@/app/api/product/route';

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

export async function getStripeProducts() {
  try {
    const response = await fetch('/api/product', { method: 'GET' });
    if (!response.ok) {
      console.error('Something is not ok!', JSON.stringify(response));
    }

    const products = await response.json();

    const mappedProducts = products.map((product: Product) => ({
      id: product.id,
      active: product.active,
      default_price: product.default_price,
      description: product.description,
      features: product.metadata,
      name: product.name,
      images: product.images,
      price: product.price,
      type: product.type,
    }));

    return mappedProducts;
  } catch (error: any) {
    console.error('Something went wrong!', JSON.stringify(error));
    return [];
  }
}
