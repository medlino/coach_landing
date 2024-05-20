'use client';
import { signIn } from 'next-auth/react';

import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { useDiscordMember } from '@/hooks/useDiscrodMember';

import { ColorRing } from 'react-loader-spinner';
import { Button } from '../Button';
import { Stepper } from '../Stepper/Stepper';

import styles from './VerificationForm.module.scss';
import { useCallback, useEffect, useState } from 'react';

export const VerificationForm = () => {
  const {
    session,
    isMember,
    isVip,
    hasUserPaid,
    sessionLoading,
    promiseLoading,
  } = useDiscordMember();
  const [stepLoading, setStepLoading] = useState(true);
  const [startStep, setStartStep] = useState(1);

  const inviteLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;

  useEffect(() => {
    if (!sessionLoading && !promiseLoading) {
      setStepLoading(false);
      setStartStep(!session ? 1 : !isMember ? 2 : 3);
    }
  }, [sessionLoading, promiseLoading]);

  const Loading = useCallback(() => {
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
  }, []);

  return (
    <div className={styles.verificationForm}>
      {sessionLoading || promiseLoading || stepLoading ? (
        <Loading />
      ) : (
        <Stepper
          startStep={startStep}
          stepsContent={[
            <div key="login">
              <p>Kérlek először jelentkezz be a Discordon keresztül!</p>
              {session ? (
                <p>Már be vagy jelentkezve</p>
              ) : (
                <Button text="Bejelentkezés" onClick={signIn} />
              )}
            </div>,
            <div key="join">
              <p>Kérlek csatlakozz a discord közösségünkhöz!</p>
              {isMember ? (
                <p>Már csatlakoztál a közösséghez</p>
              ) : (
                <a href={inviteLink} target="_blank" rel="noopener noreferrer">
                  Csatlakozom a közösséghez
                </a>
              )}
            </div>,
            <div key="roles">
              {isVip ? (
                <p>Már VIP vagy te-teee!</p>
              ) : hasUserPaid ? (
                <>
                  <p>Látom be vagy fizetve, de még nincs meg a rolod!</p>
                  <Button text="Kérem a VIP rolomat" onClick={setDiscordRole} />
                </>
              ) : (
                <p>Még nem vagy VIP</p>
              )}
            </div>,
          ]}
        />
      )}
    </div>
  );
};
