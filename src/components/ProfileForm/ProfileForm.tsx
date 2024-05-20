'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ColorRing } from 'react-loader-spinner';

import { MPayment } from '@/app/api/getPayments/route';
import { getPayments } from '@/clientAPI/getPayments';
import { useDiscordMember } from '@/hooks/useDiscrodMember';

import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
  const { session, isMember, isVip, promiseLoading, sessionLoading } =
    useDiscordMember();
  const [payments, setPayments] = useState<MPayment[]>([]);
  const [paymentLoading, setPaymentLoading] = useState(true);

  const inviteLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;

  useEffect(() => {
    getPayments()
      .then((payments) => {
        setPayments(payments);
      })
      .finally(() => {
        setPaymentLoading(false);
      });
  }, []);

  const Loading = () => {
    return (
      <div className={styles.loading}>
        <ColorRing
          visible
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  };

  return (
    <div className={styles.profileForm}>
      <h1>Profil információk</h1>
      {session ? (
        <>
          <div className={styles.section}>
            <h5>Jogusultság:</h5>
            {promiseLoading ? (
              <Loading />
            ) : (
              <>
                {isMember ? (
                  isVip ? (
                    <div className={styles.detailContainer}>
                      <p>VIP vagy, eléred a fizetett tartalmaid</p>
                    </div>
                  ) : (
                    <div className={styles.detailContainer}>
                      <p>Vendég</p>
                      <Link href="/#csomagok">Elérhető csomagok</Link>
                    </div>
                  )
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
              </>
            )}
          </div>
          <div className={styles.section}>
            <h5>Előfizetések:</h5>
            {paymentLoading ? (
              <Loading />
            ) : (
              <>
                {payments.length ? (
                  <div className={styles.detailContainer}>
                    {payments.map((payment, i) => (
                      <div key={i} className={styles.payment}>
                        <p>
                          {payment.type === 'payment'
                            ? 'Egyszeri előzfizetés'
                            : 'Havei előfizetés'}
                        </p>
                        <div className={styles.bundles}>
                          <span>Csomagok:&nbsp;</span>
                          {payment.products.map((product: string) => (
                            <p key={product}>{product}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nincs előfizetésed</p>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>{sessionLoading ? <Loading /> : <p>Bejelentkezés szükséges!</p>}</>
      )}
    </div>
  );
};
