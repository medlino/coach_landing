'use client';

import { Button } from '../../Button';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <h1>MEDITÁCIÓS</h1>
      <h1>KURZUS</h1>
      <h5>4 hét alatt teljes átalakulás</h5>
      <img
        src="https://d1yei2z3i6k35z.cloudfront.net/5400183/653b798c80c3e_meditationmastery-5.png"
        width={325}
        height={325}
      />
      <Button text="JELENTKEZZ MOST" />
      <p>
        Készen állsz egy életre szóló útra a{' '}
        <b>szabadság, belső béke és átalakulás felé?</b>
      </p>
      <p>
        A meditáció több, mint egy gyakorlat. Ez egy út a személyes fejlődéshez,
        az elme újraprogramozásához és a <b>önvaló felfedezéséhez.</b>
      </p>
      <p>
        Ha valaha is elgondolkodtál azon, hogyan lehetne uralkodni a
        gondolataid, érzelmeid és cselekedeteid felett, és valóra váltani az
        álmaidat <b>- jó helyen jársz.</b>
      </p>
      <img
        src="https://d1yei2z3i6k35z.cloudfront.net/5400183/6536198de1939_meditationmastery800x500px-2.png"
        width={470}
        height={300}
      />
    </section>
  );
};
