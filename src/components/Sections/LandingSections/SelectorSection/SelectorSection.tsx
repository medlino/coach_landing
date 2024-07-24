'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';

import styles from './SelectorSection.module.scss';

export const SelectorSection = () => {
  const router = useRouter();

  return (
    <section id="tartalom" className={styles.contentSection}>
      <h1>Miből áll a program?</h1>
      <div className={styles.triangle}>
        <img src="/icons/triangle.png" alt="triangle" />
        <img src="/og-bg.png" alt="bg" />
        <Button text="KÖZÖSSÉG" onClick={() => router.push('/kozosseg')} />
        <Button text="ELVONULÁS" onClick={() => router.push('/elvonulas')} />
        <Button text="KÉPZÉS" onClick={() => router.push('/kepzes')} />
      </div>
    </section>
  );
};
