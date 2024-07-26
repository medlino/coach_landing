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
        Gyermekkorunkban nevelés során megtanultuk a létezésünkhöz szükséges
        alapvető normákat, túlélést szocializálódást segítő elveket de sajnos
        ugyan úgy azt is hogy egy váratlan stresszhelyeztre alhokollal, vitával,
        magunkba fordulással, önleértékeléssel reagáljunk. EZEK PROGRAMOK.
        Folyamatosan figyeltük szüleink és környezetünk visszajelzéseit és
        eszerint építettük fel az életünket.
      </p>
      <p>
        Mi lenne, ha egy olyan környezet venne téged körül, amely felerősíti a
        pozitív tulajdonságaidat, a téged korlátozó berögzült rossz szokásaidra,
        PROGRAMOKRA, MINTÁKRA felhívja a figyelmedet, és segít legyőzni őket.
      </p>
      <p>
        Szerinted milyen hamar venne 180 fokot az életed, ha olyan emberektől
        tanulnál, akik megbízható hiteles tudást és tapasztalatot tudnak
        nyújtani a problémáidra?
      </p>
      <p>
        Ne feledd, nincs jó vagy rossz döntés azért mert minden döntéssel
        előrébb jutsz az életben, tehát csak döntés van. Bármit is lépsz hozd ki
        a legtöbbet a helyzetből mert minden rajtad múlik.
      </p>
      <span>
        Jelentkezni az alábbi email címen tudsz: hellomedlino@gmail.com
      </span>
    </section>
  );
};
