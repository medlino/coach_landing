'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';

import styles from './page.module.scss';

export default async function Verify() {
  const { refresh } = useRouter();

  return (
    <main className={styles.main}>
      <img
        src="/under-construction.jpg"
        alt="under-construction"
        width={350}
        height={350}
      />
      <p>Kérlek egy kicsit később próbáld meg frissíteni az oldalt!</p>
      <Button onClick={refresh} text="Frissítés" />
    </main>
  );
}
