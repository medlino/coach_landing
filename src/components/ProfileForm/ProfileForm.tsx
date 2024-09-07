'use client';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { useDiscordMember } from '@/hooks/useDiscrodMember';
import { cancelAtPayment } from '@/clientAPI/cancelAtPayment';
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

  const canceledAtPayments = useMemo(
    () =>
      payments.filter(
        (payment) => payment.status === PaymentStatus.CANCELED_AT
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
      await cancelAtPayment(subscriptionId);
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
                            {p.products[0]?.recurring && (
                              <span>
                                &nbsp;
                                {p.products[0].recurring.interval === 'month' &&
                                  p.products[0].recurring.intervalCount === 1 &&
                                  '- Havi csomag'}
                                {p.products[0].recurring.interval === 'month' &&
                                  p.products[0].recurring.intervalCount === 3 &&
                                  '- Negyedéves csomag'}
                              </span>
                            )}
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
                {canceledAtPayments.length > 0 && (
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>Lemondott tartalmak</p>
                    {canceledAtPayments.map((p) => (
                      <div key={p.checkoutId} className={styles.payment}>
                        <div className={styles.type}>
                          <p>
                            Típus:&nbsp;
                            {p.type === 'payment' ? 'Egyszeri' : 'Előfizetés'}
                            {p.products[0]?.recurring && (
                              <span>
                                &nbsp;
                                {p.products[0].recurring.interval === 'month' &&
                                  p.products[0].recurring.intervalCount === 1 &&
                                  '- Havi csomag'}
                                {p.products[0].recurring.interval === 'month' &&
                                  p.products[0].recurring.intervalCount === 3 &&
                                  '- Negyedéves csomag'}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className={styles.bundles}>
                          <p>Csomag:&nbsp;</p>
                          {p.products.map((product) => (
                            <span key={product.id}>{product.name}</span>
                          ))}
                        </div>
                        <div className={styles.bundles}>
                          <p>A következő fizetési időszak elején lejár</p>
                        </div>
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
