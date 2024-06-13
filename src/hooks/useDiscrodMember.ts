'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { isDiscordMember } from '@/clientAPI/isDiscordMember';
import { getPayments } from '@/clientAPI/getPayments';
import { MPayment } from '@/interfaces/payment';

//TODO refactor loading states
export const useDiscordMember = () => {
  const { data: session, status } = useSession();
  const [isMember, setIsMember] = useState<boolean | null>(false);
  const [payments, setPayments] = useState<MPayment[]>([]);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isMemberLoading, setIsMemberLoading] = useState(true);
  const [paymmentIsLoadin, setPaymentIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading' && status === 'unauthenticated') {
      setSessionLoading(false);
      setIsMemberLoading(false);
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
      setPaymentIsLoading(false);
    }
    if (session && isMember) {
      Promise.all([
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
    session,
    sessionLoading,
    promiseLoading: isMemberLoading || paymmentIsLoadin,
  };
};
