'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './layout.module.scss';

function Toaster() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get('success');
  const cancel = searchParams.get('cancel');

  useEffect(() => {
    if (success) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('success');
      router.replace(currentUrl.href);
      toast.success(
        'Gratulálunk, hogy beléptél a közösségbe. Minden további információt a kiküldött köszöntő emailben találsz! Nézd meg kérlek a spam mappát is!'
      );
      window.history.replaceState(null, '', '/');
    }
    if (cancel) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('cancel');
      router.replace(currentUrl.href);
      toast.error(
        'Sikertelen fizetés! Amennyiben segítségre van szükséged, írj az info@medlino.hu-ra és segítünk!'
      );
    }
  }, [success, cancel]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      style={{ fontSize: 20 }}
    />
  );
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.homeLayout}>
      <Header />
      {children}
      <Suspense>
        <Toaster />
      </Suspense>
      <Footer />
    </div>
  );
}
