'use client';

import { useEffect, useState } from 'react';

import { SanitizedProduct, getStripeProducts } from '@/clientAPI/product';
import { stripeCheckout } from '@/clientAPI/checkout';

import { BundleCard } from './BundleCard/BundleCard';

import styles from './BundleSection.module.scss';

export const BundleSection = () => {
  const [products, setProducts] = useState<SanitizedProduct[]>([]);

  useEffect(() => {
    getStripeProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  return (
    <section id="csomagok" className={styles.bundleSection}>
      <h1>Itt vannak a Bündlék, hogy miiii? A bündléééK? na neee </h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <BundleCard
            key={product.id}
            name={product.name}
            price={product.price}
            features={product.features}
            onClick={() =>
              stripeCheckout({
                priceId: product.default_price,
                type: product.price.type,
              })
            }
          />
        ))}
      </div>
    </section>
  );
};
