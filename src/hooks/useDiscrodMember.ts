'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { isDiscordMember } from '@/clientAPI/isDiscordMember';
import { getDiscordRoles } from '@/clientAPI/getDiscordRoles';
import { getPayments } from '@/clientAPI/getPayments';
import { MPayment } from '@/interfaces/payment';

//TODO refactor loading states
export const useDiscordMember = () => {
  const { data: session, status } = useSession();
  const [isMember, setIsMember] = useState<boolean | null>(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [payments, setPayments] = useState<MPayment[]>([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isMemberLoading, setIsMemberLoading] = useState(true);
  const [rolesIsLoading, setIsRoleLoading] = useState(true);
  const [paymmentIsLoadin, setPaymentIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading' && status === 'unauthenticated') {
      setSessionLoading(false);
      setIsMemberLoading(false);
      setIsRoleLoading(false);
      setPaymentIsLoading(false);
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
    if (isMember === null) {
      setIsMemberLoading(false);
      setIsRoleLoading(false);
      setPaymentIsLoading(false);
    }
    if (session && isMember) {
      Promise.all([
        getDiscordRoles()
          .then((roles) => {
            setRoles(roles);
          })
          .finally(() => {
            setIsRoleLoading(false);
          }),
        getPayments()
          .then((payments) => {
            setPayments(payments);
          })
          .finally(() => {
            setPaymentIsLoading(false);
          }),
      ]);
    }
  }, [session, isMember]);

  return {
    isMember,
    payments,
    roles,
    session,
    sessionLoading,
    promiseLoading: isMemberLoading || rolesIsLoading || paymmentIsLoadin,
  };
};
