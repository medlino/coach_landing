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
      toast.success(
        'Gratulálunk, hogy sikeresen megtetted az első fontos és talán legnehezebb lépést egy örömtelibb, szabadabb és sikeresebb élet felé. Izgalmas utazás lesz, őrizd meg kitartásod és lelkesedésed! A program indulásának időpontja 04.08. Április 08. Hétfő 18.00. Kérdés esetén írj az info@medlino.hu címre!'
      );
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
