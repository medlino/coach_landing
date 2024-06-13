'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import clsx from 'clsx';

import { useDebounce } from '@/hooks/useDebounce';
import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { MPayment, PaymentStatus } from '@/interfaces/payment';

import { Loading } from '../Loading/Loading';
import { Button } from '../Button/Button';

import styles from './BundleDetails.module.scss';

interface BundleDetailsProps {
  className?: string;
  payments: MPayment[];
}

export const BundleDetails = ({ className, payments }: BundleDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const success = useMemo(() => searchParams.get('success'), [searchParams]);

  const roleAddPendingPayments = useMemo(
    () =>
      payments.filter(
        (payment) => payment.status === PaymentStatus.ROLE_ADD_PENDING
      ),
    [payments]
  );

  const toastSuccess = useDebounce(() => {
    toast.success('Sikeres aktiválás! A Discordon eléred a tartalmakat!');
  }, 100);

  useEffect(() => {
    if (success) {
      toastSuccess();
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('success');
      router.replace(currentUrl.href);
    }
  }, [success]);

  const handleSetDiscordRole = async (checkoutId: string) => {
    setLoading(true);
    try {
      await setDiscordRole(checkoutId);

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('success', 'true');
      window.location.href = currentUrl.href;
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
                    <span key={product.id}>{product.name}</span>
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
