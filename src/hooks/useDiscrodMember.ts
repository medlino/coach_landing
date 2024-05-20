'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';

import { isDiscordMember } from '@/clientAPI/isDiscordMember';
import { getDiscordRoles } from '@/clientAPI/getDiscordRoles';
import { hasPaid } from '@/clientAPI/hasPaid';

export const useDiscordMember = () => {
  const { data: session, status } = useSession();
  const [isMember, setIsMember] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [hasUserPaid, setHasUserPaid] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isMemberLoading, setIsMemberLoading] = useState(true);
  const [rolesIsLoading, setIsRoleLoading] = useState(true);

  const vipRoleId = process.env.NEXT_PUBLIC_DISCORD_VIP_ROLE_ID;

  const isVip = useMemo(() => {
    return vipRoleId ? roles.includes(vipRoleId) : false;
  }, [roles, vipRoleId]);

  useEffect(() => {
    if (status !== 'loading' && status === 'unauthenticated') {
      setSessionLoading(false);
      setIsMemberLoading(false);
      setIsRoleLoading(false);
    }
    if (status !== 'loading' && status === 'authenticated') {
      setSessionLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (session) {
      isDiscordMember()
        .then((isMember) => {
          setIsMember(isMember);
        })
        .finally(() => {
          setIsMemberLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    if (session && isMember) {
      Promise.all([
        getDiscordRoles()
          .then((roles) => {
            setRoles(roles);
          })
          .finally(() => {
            setIsRoleLoading(false);
          }),
        hasPaid().then((p) => {
          setHasUserPaid(p);
        }),
      ]);
    }
  }, [isMember]);

  return {
    isMember,
    roles,
    hasUserPaid,
    isVip,
    session,
    sessionLoading,
    promiseLoading: isMemberLoading || rolesIsLoading,
  };
};
