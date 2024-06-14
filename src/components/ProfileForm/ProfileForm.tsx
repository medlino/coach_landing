'use client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { useDiscordMember } from '@/hooks/useDiscrodMember';
import { cancelPayment } from '@/clientAPI/cancelPayment';
import { PaymentStatus } from '@/interfaces/payment';
import { useSuccessToast } from '@/hooks/useSuccessToast';

import { Loading } from '../Loading/Loading';
import { Button } from '../Button/Button';

import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
  const triggerSuccessToast = useSuccessToast('Sikeres leiratkozás!');
  const { session, isMember, payments, promiseLoading, sessionLoading } =
    useDiscordMember();
  const [cancelLoading, setCancelLoading] = useState(false);

  const inviteLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;

  const roleAddPendingPayments = useMemo(
    () =>
      payments.filter(
        (payment) => payment.status === PaymentStatus.ROLE_ADD_PENDING
      ),
    [payments]
  );

  const activePayments = useMemo(
    () => payments.filter((payment) => payment.status === PaymentStatus.ACTIVE),
    [payments]
  );

  const areAllPaymentsCancelled = useMemo(
    () => payments.every((p) => p.status === PaymentStatus.CANCELED),
    [payments]
  );

  const handleCancelPayment = async (subscriptionId: string) => {
    try {
      setCancelLoading(true);
      await cancelPayment(subscriptionId);
      triggerSuccessToast();
    } catch (error) {
      toast.error('Hiba történt a leiratkozás során!');
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className={styles.profileForm}>
      <h1>Profil információk</h1>
      {session ? (
        <>
          {promiseLoading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.section}>
                <div className={styles.profileDetails}>
                  <div className={styles.row}>
                    <span>Név:</span>
                    <span>{session.user.name}</span>
                  </div>
                </div>
                {isMember ? (
                  <div className={styles.detailContainer}>
                    <Link href="/#csomagok">Csomagok megtekintése</Link>
                  </div>
                ) : (
                  <div className={styles.detailContainer}>
                    <p>Még nem vagy tagja a discord közzöségnek</p>
                    <a
                      href={inviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Csatlakozom a közösséghez
                    </a>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                {(payments.length === 0 || areAllPaymentsCancelled) && (
                  <p className={styles.announceTitle}>
                    Jelenleg nincs elérhető fizetésed
                  </p>
                )}
                {activePayments.length > 0 && (
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>Aktív tartalmak</p>
                    {activePayments.map((p) => (
                      <div key={p.checkoutId} className={styles.payment}>
                        <div className={styles.type}>
                          <p>
                            Típus:&nbsp;
                            {p.type === 'payment' ? 'Egyszeri' : 'Előfizetés'}
                          </p>
                        </div>
                        <div className={styles.bundles}>
                          <p>Csomag:&nbsp;</p>
                          {p.products.map((product) => (
                            <span key={product.id}>{product.name}</span>
                          ))}
                        </div>
                        {p.type === 'subscription' && (
                          <>
                            {cancelLoading ? (
                              <Loading />
                            ) : (
                              <Button
                                text="Leiratkozás"
                                onClick={() =>
                                  handleCancelPayment(p.subscription!)
                                }
                              />
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {roleAddPendingPayments.length > 0 && (
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>
                      Van előfizetésed, a lenti gombbal tudod aktiválni a
                      discord elérést.
                    </p>
                    <p className={styles.description}>
                      Ahol megtalálod a közösséget és a tartalmakat.
                    </p>
                    <Link href="/aktivalas">Tovább az aktiváláshoz</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {sessionLoading ? (
            <Loading />
          ) : (
            <p className={styles.announceTitle}>Bejelentkezés szükséges!</p>
          )}
        </>
      )}
    </div>
  );
};
