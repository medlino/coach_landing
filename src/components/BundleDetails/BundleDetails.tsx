'use client';
import { Fragment, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import clsx from 'clsx';

import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { MPayment, PaymentStatus } from '@/interfaces/payment';
import { useSuccessToast } from '@/hooks/useSuccessToast';

import { Loading } from '../Loading/Loading';
import { Button } from '../Button/Button';

import styles from './BundleDetails.module.scss';

interface BundleDetailsProps {
  className?: string;
  payments: MPayment[];
}

export const BundleDetails = ({ className, payments }: BundleDetailsProps) => {
  const triggerSuccessToast = useSuccessToast(
    'Sikeres aktiválás! A Discordon eléred a tartalmakat!'
  );
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
      triggerSuccessToast();
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
                    <Fragment key={product.id}>
                      <span>{product.name}</span>
                      {product.recurring && (
                        <span>
                          {product.recurring.interval === 'month' &&
                          product.recurring.interval_count === 1
                            ? 'Havi csomag'
                            : product.recurring.interval_count === 3
                            ? 'Negyedéves csomag'
                            : ''}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </div>
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
