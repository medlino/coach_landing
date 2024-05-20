'use client';
import { useMemo } from 'react';
import Link from 'next/link';

import { useDiscordMember } from '@/hooks/useDiscrodMember';
import { roleMap } from '@/constants/roles';
import { PaymentStatus } from '@/interfaces/payment';
import { Loading } from '../Loading/Loading';

import styles from './ProfileForm.module.scss';

export const ProfileForm = () => {
  const { session, isMember, payments, roles, promiseLoading, sessionLoading } =
    useDiscordMember();

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
                {isMember ? (
                  <div className={styles.detailContainer}>
                    <div className={styles.roles}>
                      <p>Jogusultságaid:&nbsp;</p>
                      <span>{roles.map((r) => roleMap[r]).join(', ')}</span>
                    </div>
                    <Link href="/#csomagok">Elérhető csomagok</Link>
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
                {payments.length === 0 && <p>Nincs előfizetésed</p>}
                {activePayments.length > 0 && (
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>Aktív tartalmak</p>
                    {activePayments.map((p) => (
                      <div key={p.checkoutId} className={styles.payment}>
                        <div className={styles.bundles}>
                          <p>Megvásárolt csomagok:&nbsp;</p>
                          {p.products.map((product) => (
                            <span key={product.id}>{product.name}</span>
                          ))}
                        </div>
                        <div className={styles.rights}>
                          <p>A következő jogokkal jár:&nbsp;</p>
                          {p.roles.map((role) => (
                            <span key={role.id}>{role.name}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {roleAddPendingPayments.length > 0 && (
                  <div className={styles.contentWrapper}>
                    <p className={styles.title}>
                      Vannak nem aktivált tartalmaid
                    </p>
                    <Link href="/aktivalas">Tovább az aktiváláshoz</Link>
                  </div>
                )}
                {/*  {roleAddPendingPayments.length > 0 && (
                  <div className={styles.contentWrapper}>
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
                  </div>
                )} */}
              </div>
            </>
          )}
        </>
      ) : (
        <>{sessionLoading ? <Loading /> : <p>Bejelentkezés szükséges!</p>}</>
      )}
    </div>
  );
};
