'use client';

import { Button } from '../../Button/Button';

import { useRouter } from 'next/navigation';

import styles from './AboutProgSection.module.scss';

const texts = [
  'a frusztrált, szorongással teli, lusta hétköznapokat szeretnéd produktív mindennapokká alakítani.',
  'szeretnéd, hogy a hangulat ingadozásaidat egy kiegyensúlyozott érzelmi állapot váltsa fel.',
  'szeretnél a fejedben össze-vissza cikázó, téged emésztő gondolatok fölé kerekedni, előnyt kovácsolni belőlük, és visszaszerezni a kontrollt.',
  'szeretnél a feletted eluralkodó negatív érzelmek helyett egy rendszeresebb emelkedett érzelmi állapotot teremteni.',
];

export const AboutProgSection = () => {
  const router = useRouter();

  return (
    <section id="neked-szolo-program" className={styles.aboutProgSection}>
      <h1>Neked szól a program ha:</h1>
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
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
