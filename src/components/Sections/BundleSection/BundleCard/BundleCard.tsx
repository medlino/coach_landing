import { useMemo } from 'react';
import clsx from 'clsx';

import { SanitizedPrice } from '@/interfaces/product';

import { Button } from '@/components/Button/Button';

import styles from './BundleCard.module.scss';

interface BundleCardProps {
  name: string;
  price?: SanitizedPrice;
  features: Record<string, string>;
  onClick?: () => Promise<void>;
}

const THREE_MONTHS_PRICE = 21500;
const THREE_MONTHS_ORIGINAL_PRICE = 27000;
const ONE_MONTH_PRICE = 6990;
const ONE_MONTH_ORIGINAL_PRICE = 9000;

export const BundleCard = ({
  name,
  price,
  features,
  onClick,
}: BundleCardProps) => {
  const intervalText = useMemo(() => {
    if (!price) return '';

    if (price.recurring) {
      if (price.recurring.interval === 'month') {
        if (price.recurring.interval_count === 1) return 'Havi csomag';
        if (price.recurring.interval_count === 3) return 'Negyedéves csomag';
      }
    }

    return '';
  }, [price]);

  const amount = price && price.unit_amount / 100;

  const isUniqueCard = useMemo(() => name.includes('Egyéni'), []);

  const originalPrice = useMemo(() => {
    if (!price) return 0;
    if (amount === THREE_MONTHS_PRICE) return THREE_MONTHS_ORIGINAL_PRICE;
    if (amount === ONE_MONTH_PRICE) return ONE_MONTH_ORIGINAL_PRICE;
  }, [price]);

  return (
    <div className={styles.bundleCard}>
      <h5>{intervalText}</h5>
      {isUniqueCard && <p className={styles.name}>{name}</p>}
      <ul>
        {Object.entries(features).map(([k, v]) => (
          <li key={k}>
            <p>{v}</p>
          </li>
        ))}
      </ul>
      {price && (
        <div className={styles.priceContainer}>
          <div className={clsx(styles.contentContainer)}>
            <p className={styles.price}>
              <span style={{ fontSize: '2.2rem' }}>{amount}</span>
              <span style={{ fontSize: '1.9rem' }}>FT</span>
            </p>
            <span
              style={{
                color: 'grey',
                textDecoration: 'line-through',
                textDecorationThickness: '1px',
                textDecorationColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              {originalPrice}
            </span>
            <span
              style={{
                color: 'grey',
                textDecoration: 'line-through',
                textDecorationThickness: '1px',
                textDecorationColor: 'rgba(0, 0, 0, 0.4)',
                fontSize: '1.3rem',
              }}
            >
              FT
            </span>
            <p style={{ color: 'red', fontSize: '1.5rem' }}>20% kedvezmény</p>

            <p
              style={{
                textDecoration: 'none',
                fontSize: '0.7rem',
                color: 'red',
                marginTop: '0.5rem',
              }}
            >
              A kedvezmény 2024.08.01-ig érvényes
            </p>
          </div>
        </div>
      )}

      {onClick && <Button text="CSATLAKOZOM " onClick={onClick} />}
    </div>
  );
};
