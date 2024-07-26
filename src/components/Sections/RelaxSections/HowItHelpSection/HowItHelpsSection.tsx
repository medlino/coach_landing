'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';

import styles from './HowItHelpsSection.module.scss';

export const HowItHelpsSection = () => {
  const router = useRouter();

  return (
    <section id="hogyan-segit" className={styles.howItHelpsSection}>
      <h1>Hogyan segít egy elvonulás?</h1>
      <p>
        Mi lenne, ha egy olyan környezet venne téged körül, amely felerősíti a
        pozitív tulajdonságaidat, a téged korlátozó berögzült rossz szokásaidra,
        PROGRAMOKRA, MINTÁKRA felhívja a figyelmedet, és segít legyőzni őket.
      </p>
      <p>
        Mi lenne, ha egy olyan környezet venne téged körül, amely felerősíti a
        pozitív tulajdonságaidat, a téged korlátozó berögzült rossz szokásaidra
        felhívja a figyelmedet, és segít legyőzni őket, mert járt már a te
        cípődben, így hitelesen elfogadod majd tanácsát.
      </p>
      <p>
        Szerinted milyen hamar venne 180 fokot, ha olyan emberektől tanulnál,
        akik megbízható hiteles tudást és tapasztalatot tudnak nyújtani a
        problémáidra?
      </p>
      <p>
        Minden, amire vágysz 1 döntésnyire van. Nincs jó vagy rossz döntés,
        döntés létezik, az, hogy utána mi történik az csak RAJTAD MÚLIK!
      </p>
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
