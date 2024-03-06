'use client';

import { Button } from '../../Button';
import styles from './AboutProgSection.module.scss';

const texts = [
  'Szeretnék elhagyni a régi énjüket.',
  'Megunták a mindenapi mókuskereket.',
  'Kíváncsiak mik a saját potenciáljuk maximuma.',
  'Kíváncsiak arra hogyan teremtesenek a gondolataikkal a vizualizáció és a manifesztáció eszközeivel.',
];

export const AboutProgSection = () => {
  return (
    <section className={styles.aboutProgSection}>
      <h1>Életre szóló program azoknak akik</h1>
      <div className={styles.textList}>
        {texts.map((text, index) => (
          <ul key={index}>
            <div>
              <img src="/check.svg" alt="check" />
              <li>{text}</li>
            </div>
          </ul>
        ))}
      </div>
      <Button text="CSATLAKOZOM" />
    </section>
  );
};
