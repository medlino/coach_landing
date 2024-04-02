'use client';

import { Button } from '../../Button';

import { stripeCheckout } from '@/clientAPI/checkout';

import styles from './AboutProgSection.module.scss';

const texts = [
  'szeretnéd elhagyni a régi énedet és a vele járó szokásokat, amik egy bizonytalan élethez vezettek. ',
  'meguntad a mindennapi céltalan mókuskereket. ',
  'a saját kezedbe szeretnéd venni az életed irányítását.',
  'szeretnéd megvalósítani a benned rejlő potenciált.',
  'kiváncsi vagy arra, hogyan tudsz egy sikeres életet megteremteni a vizualizáció, a neurobiológia és a teremtés eszközeivel.',
];

export const AboutProgSection = () => {
  return (
    <section className={styles.aboutProgSection}>
      <h1>Életre szóló program Neked, amennyiben</h1>
      <div className={styles.textList}>
        {texts.map((text, index) => (
          <ul key={index}>
            <div>
              <img src="/icons/check.svg" alt="check" />
              <li>{text}</li>
            </div>
          </ul>
        ))}
      </div>
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
