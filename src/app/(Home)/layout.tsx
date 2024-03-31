'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { ToastContainer, toast } from 'react-toastify';

import styles from './layout.module.scss';

function Toaster() {
  const searchParams = useSearchParams();

  const success = searchParams.get('success');
  const cancel = searchParams.get('cancel');

  useEffect(() => {
    if (success) {
      toast.success('Sikeres fizetés!');
      window.history.replaceState(null, '', '/');
    }
    if (cancel) {
      window.history.replaceState(null, '', '/');
      toast.error(`Sikertelen fizetés!
      Írj az info@medlino.hu-ra és segítünk!`);
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
      {/* <Header /> */}
      <main>{children}</main>
      <Suspense>
        <Toaster />
      </Suspense>
    </div>
  );
}
