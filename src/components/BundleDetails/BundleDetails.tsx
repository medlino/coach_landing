import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import clsx from 'clsx';

import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { MPayment, PaymentStatus } from '@/interfaces/payment';

import { Button } from '../Button/Button';

import styles from './BundleDetails.module.scss';
import { roleMap } from '@/constants/roles';
import { Loading } from '../Loading/Loading';

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
  const [loading, setLoading] = useState(false);

  const roleAddPendingPayments = useMemo(
    () =>
      payments.filter(
        (payment) => payment.status === PaymentStatus.ROLE_ADD_PENDING
      ),
    [payments]
  );

  const handleSetDiscordRole = async (checkoutId: string) => {
    setLoading(true);
    try {
      await setDiscordRole(checkoutId);
      window.location.reload();
      toast.success('Sikeres aktiválás! A Discordon eléred a tartalmakat!');
    } catch (error) {
      toast.error(
        'Hiba történt az aktiválás során! Kérlek írj az info@medlino.hu címre!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={clsx(styles.bundleDetails, className)}>
      {/*       <div className={styles.roles}>
        <p>Jogosultságaid:&nbsp;</p>
        <span>{roles.map((r) => roleMap[r]).join(', ')}</span>
      </div> */}

      <div className={styles.paymentWrapper}>
        {roleAddPendingPayments.length === 0 && (
          <>
            <p className={styles.title}>
              Jelenleg nincs új aktiválandó tartalmad.
            </p>
            <p className={styles.title}>
              A megvásárolt csomagjaid megtalálod a{' '}
              <Link href="/profil">profilodban.</Link>
            </p>
          </>
        )}
        {roleAddPendingPayments.length > 0 && (
          <>
            <p className={styles.title}>Aktiválandó tartalmak</p>
            {roleAddPendingPayments.map((p) => (
              <div key={p.checkoutId} className={styles.payment}>
                <div className={styles.bundles}>
                  <p>Megvásárolt csomag:&nbsp;</p>
                  {p.products.map((product) => (
                    <span key={product.id}>{product.name}</span>
                  ))}
                </div>
                {/*               <div className={styles.rights}>
                  <p>A következő jogokat fogod megkapni:&nbsp;</p>
                  {p.roles.map((role) => (
                    <span key={role.id}>{role.name}</span>
                  ))}
                </div> */}
                {loading ? (
                  <Loading />
                ) : (
                  <Button
                    text="Aktiválás"
                    onClick={() => handleSetDiscordRole(p.checkoutId)}
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
