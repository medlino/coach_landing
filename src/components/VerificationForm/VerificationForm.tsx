'use client';
import { useState, useEffect, useMemo } from 'react';
import { signIn, useSession } from 'next-auth/react';

import { isDiscordMember } from '@/clientAPI/isDiscordMember';
import { getDiscordRoles } from '@/clientAPI/getDiscordRoles';
import { setDiscordRole } from '@/clientAPI/setDiscordRole';
import { hasPaid } from '@/clientAPI/hasPaid';

import { Button } from '../Button';
import { Stepper } from '../Stepper/Stepper';

import styles from './VerificationForm.module.scss';

export const VerificationForm = () => {
  const { data: session } = useSession();
  const [isMember, setIsMember] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [hasUserPaid, setHasUserPaid] = useState(false);

  const inviteLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;
  const vipRoleId = process.env.NEXT_PUBLIC_DISCORD_VIP_ROLE_ID;

  const isVip = useMemo(() => {
    return vipRoleId ? roles.includes(vipRoleId) : false;
  }, [roles, vipRoleId]);

  /*   const startStep = useMemo(() => {
    if (!session) {
      return 1;
    }
    if (!isMember) {
      return 2;
    }
    return 3;
  }, [session, isMember]); */

  useEffect(() => {
    if (session) {
      isDiscordMember().then((isMember) => {
        setIsMember(isMember);
      });
    }
  }, [session]);

  useEffect(() => {
    if (session && isMember) {
      Promise.all([
        getDiscordRoles().then((roles) => {
          setRoles(roles);
        }),
        hasPaid().then((p) => {
          setHasUserPaid(p);
        }),
      ]);
    }
  }, [isMember]);

  return (
    <div className={styles.verificationForm}>
      <Stepper
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
    </div>
  );
};
