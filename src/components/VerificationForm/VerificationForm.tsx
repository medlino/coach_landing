'use client';
import { useEffect, useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';

import { useDiscordMember } from '@/hooks/useDiscrodMember';

import { Button } from '../Button/Button';
import { Stepper } from '../Stepper/Stepper';
import { BundleDetails } from '../BundleDetails/BundleDetails';
import { Loading } from '../Loading/Loading';

import styles from './VerificationForm.module.scss';

export const VerificationForm = () => {
  const { session, isMember, payments, sessionLoading, promiseLoading } =
    useDiscordMember();
  const [stepLoading, setStepLoading] = useState(true);
  const [startStep, setStartStep] = useState(1);

  const inviteLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;

  useEffect(() => {
    if (!sessionLoading && !promiseLoading) {
      setStepLoading(false);
      setStartStep(!session ? 1 : !isMember ? 2 : 3);
    }
  }, [sessionLoading, promiseLoading]);

  if (sessionLoading || promiseLoading || stepLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.verificationForm}>
      <Stepper
        startStep={startStep}
        steps={[
          {
            disable: !session,
            content: (
              <div className={styles.loginContainer} key="login">
                <p>Kérlek először jelentkezz be a Discordon keresztül!</p>
                {session ? (
                  <p>Már be vagy jelentkezve.</p>
                ) : (
                  <Button
                    className={styles.loginBtn}
                    text="Bejelentkezés"
                    onClick={signIn}
                  />
                )}
              </div>
            ),
          },
          {
            disable: !isMember,
            content: (
              <div className={styles.joinContainer} key="join">
                <p>Kérlek csatlakozz a discord közösségünkhöz!</p>
                {isMember ? (
                  <p>Már csatlakoztál a közösséghez.</p>
                ) : (
                  <a
                    href={inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Csatlakozom a közösséghez
                  </a>
                )}
              </div>
            ),
          },
          {
            content: (
              <Suspense>
                <BundleDetails key="bundles" payments={payments} />
              </Suspense>
            ),
          },
        ]}
      />
    </div>
  );
};
