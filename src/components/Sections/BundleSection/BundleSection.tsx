'use client';

import { useEffect, useState } from 'react';

import { getStripeProducts } from '@/clientAPI/product';
import { stripeCheckout } from '@/clientAPI/checkout';
import { SanitizedProduct } from '@/interfaces/product';

import { BundleCard } from './BundleCard/BundleCard';
import { Loading } from '@/components/Loading/Loading';

import styles from './BundleSection.module.scss';

export const BundleSection = () => {
  const [products, setProducts] = useState<SanitizedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStripeProducts()
      .then((p) => {
        setProducts(p);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="csomagok" className={styles.bundleSection}>
      <h1>Elme Ereje Közösség Csomagok</h1>
      <div className={styles.productList}>
        {loading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};
