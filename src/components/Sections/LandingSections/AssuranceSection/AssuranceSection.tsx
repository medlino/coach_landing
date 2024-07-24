'use client';

import { Button } from '../../../Button/Button';

import { useRouter } from 'next/navigation';

import styles from './AssuranceSection.module.scss';

export const AssuranceSection = () => {
  const router = useRouter();

  return (
    <section id="garancia" className={styles.assuranceSection}>
      <h1 className={styles.bTitle}>Garancia</h1>
      <p className={styles.bonus}>
        Természetesen nem szeretnénk olyan diákokat a programban, akik
        elégedetlenek vagy úgy érzik olyan dolgot vásároltak, amire valójában
        nincs is szükségük.{' '}
        <span style={{ textDecoration: 'underline' }}>
          Biztosak vagyunk abban, hogy ha lelkiismeretesen végigcsinálod a
          programot, akkor megváltozik az életed.
        </span>{' '}
        Éppen ezért úgy döntöttünk hogy a vásárlást követő első 30 napban
        bármikor elállhatsz a vásárlástól és visszafizetjük a teljes összeget. A
        visszaigényléshez kérlek írj egy emailt info@medlino.hu címre és a pénzt
        pár napon belül újra a számládon találod. Nincsenek tesztkérdések!
      </p>
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
