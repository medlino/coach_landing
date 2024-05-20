import { useMemo } from 'react';
import clsx from 'clsx';

import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { MPayment, PaymentStatus } from '@/interfaces/payment';

import { Button } from '../Button';

import styles from './BundleDetails.module.scss';
import { roleMap } from '@/constants/roles';

interface BundleDetailsProps {
  className?: string;
  payments: MPayment[];
  roles: string[];
}

export const BundleDetails = ({
  className,
  payments,
  roles,
}: BundleDetailsProps) => {
  const roleAddPendingPayments = useMemo(
    () =>
      payments.filter(
        (payment) => payment.status === PaymentStatus.ROLE_ADD_PENDING
      ),
    [payments]
  );

  return (
    <div className={clsx(styles.bundleDetails, className)}>
      <div className={styles.roles}>
        <p>Eddigi roljaid:&nbsp;</p>
        <span>{roles.map((r) => roleMap[r]).join(', ')}</span>
      </div>

      <div className={styles.paymentWrapper}>
        {roleAddPendingPayments.length === 0 && (
          <p className={styles.title}>Nincs aktiválandó tartalmad</p>
        )}
        {roleAddPendingPayments.length > 0 && (
          <>
            <p className={styles.title}>Nem aktivált tartalmak</p>
            {roleAddPendingPayments.map((p) => (
              <div key={p.checkoutId} className={styles.payment}>
                <div className={styles.bundles}>
                  <p>Megvásárolt csomagok:&nbsp;</p>
                  {p.products.map((product) => (
                    <span key={product.id}>{product.name}</span>
                  ))}
                </div>
                <div className={styles.rights}>
                  <p>A következő jogokat fogod megkapni:&nbsp;</p>
                  {p.roles.map((role) => (
                    <span key={role.id}>{role.name}</span>
                  ))}
                </div>
                <Button
                  text="Aktiválás"
                  onClick={() => setDiscordRole(p.checkoutId)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
