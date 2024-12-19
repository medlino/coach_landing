'use client';

import React, { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { SimpleModal } from '@/components/SimpleModal/SimpleModal';

import styles from './layout.module.scss';

function Toaster() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cancel = searchParams.get('cancel');

  useEffect(() => {
    if (cancel) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('cancel');
      router.replace(currentUrl.href);
      toast.error(
        'Sikertelen fizetés! Amennyiben segítségre van szükséged, írj az info@medlino.hu-ra és segítünk!'
      );
      window.history.replaceState(null, '', '/');
    }
  }, [cancel]);

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

function SuccessModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const success = searchParams.get('success');

  useEffect(() => {
    if (success) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('cancel');
      router.replace(currentUrl.href);
      setIsOpen(true);
      window.history.replaceState(null, '', '/');
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={closeModal}>
      <div className={styles.modalBody}>
        <h2 className={styles.modalTitle}>Kedves Elme Ereje Tag!</h2>
        <p>Gratulálunk a csatlakozáshoz, ezzel meghoztál egy fontos döntést.</p>
        <p>Minden, amit a közösségünkben találsz, neked és érted készült.</p>
        <p>
          Mi azon dolgozunk, hogy a lehető legtöbb tudást átadjuk, és a lehető
          leghasznosabb és legizgalmasabb eseményeket biztosítsuk, amelyek
          segítségével a következő szintre tudod emelni az életed.
        </p>
        <h2 className={styles.bold}>FONTOS!</h2>
        <p className={styles.bold}>
          Az itt leírtakat kiküldtük arra az email címedre, amellyel vásároltál.
          Kérlek, nézd meg a spam mappádat is, ha nem találod az emailt.
        </p>
        <p className={styles.bold}>
          Ugyanazzal az email címmel regisztrálj a Discordra, amellyel megvetted
          az Elme Ereje Közösség előfizetést.
        </p>
        <p className={styles.bold}>
          Ahhoz, hogy a teljes tartalmat elérd, aktiválnod kell a tagságodat!
        </p>
        <p className={styles.bold}>
          A megvásárolt csomagod egy havi előfizetés, amelyet minden hónapban
          automatikusan megújítunk. Ha bármikor le szeretnéd mondani az
          előfizetésed, itt teheted meg:
        </p>
        <p>
          <a
            href="https://elmeereje.hu/profil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profil oldal
          </a>
        </p>
        <p className={styles.bold}>
          Kérlek, nézd meg a következő videót lejjebb görgetve, amelyben
          elmagyarázzuk a csatlakozás lépéseit!
        </p>
        <p>
          <a
            href="https://www.loom.com/share/eea827d30f3341e681218e2a5d9692c4?sid=90141be0-133c-48e9-98c4-259657bb73ed"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tagság aktiválási folyamat videó magyarázat
          </a>
        </p>
        <p>
          <a
            href="https://elmeereje.hu/aktivalas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Itt tudod elindítani az aktiválási folyamatot
          </a>
        </p>
        <span>Köszönettel,</span>
        <p className={styles.signature}>Dokik</p>
      </div>
    </SimpleModal>
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
      <Suspense>
        <SuccessModal />
      </Suspense>
      <Footer />
    </div>
  );
}
