import { Button } from '@/components/Button';
import { SanitizedPrice } from '@/clientAPI/product';

import styles from './BundleCard.module.scss';

interface BundleCardProps {
  name: string;
  price: SanitizedPrice;
  features: Record<string, string>;
  onClick: () => Promise<void>;
}

export const BundleCard = ({
  name,
  price,
  features,
  onClick,
}: BundleCardProps) => {
  return (
    <div className={styles.bundleCard}>
      <h5>{name}</h5>
      <p className={styles.price}>
        {price.unit_amount / 100}
        {price.currency.toLocaleUpperCase()}
      </p>
      <p>{price.type === 'recurring' ? 'Havi' : 'Egyszeri'}</p>
      <ul>
        {Object.entries(features).map(([k, v]) => (
          <li key={k}>
            <img src="./icons/check.svg" />
            <p>{v}</p>
          </li>
        ))}
      </ul>
      <Button text="AKAROM, KELL!" onClick={onClick} />
    </div>
  );
};
