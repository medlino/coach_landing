'use client';

import { Button } from '../../Button';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <h1>KURZUS</h1>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${'wPJeydzfheo'}?autoplay=0`}
        style={{
          height: '380px',
          width: '650px',
        }}
      ></iframe>
      <Button text="CSATLAKOZOM" />
      <h1>Életre szóló program azoknak akik</h1>
      <p>- Szeretnék elhagyni a régi énjüket</p>
      <p>- Megunták a mindenapi mókuskereket</p>
      <p>- Kíváncsiak mik a saját potenciáljuk maximuma</p>
      <p>
        - Kíváncsiak arra hogyan teremtesenek a gondolataikkal a vizualizáció és
        a manifesztáció eszközeivel
      </p>
    </section>
  );
};
