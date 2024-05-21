import { Product } from '@/interfaces/product';

export async function getStripeProducts() {
  try {
    const response = await fetch('/api/product', { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Error: ${JSON.stringify(response)}`);
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
