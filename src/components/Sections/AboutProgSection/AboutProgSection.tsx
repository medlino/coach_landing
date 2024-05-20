'use client';

import { Button } from '../../Button';

import { useRouter } from 'next/navigation';

import styles from './AboutProgSection.module.scss';

const texts = [
  'szeretnél egy szabadabb és biztonságosabb életet teremteni magadnak. ',
  'szeretnéd, hogy az életed a kiteljesedésedről és a megbecsülésről szóljon.',
  'a saját kezedbe szeretnéd venni az életed irányítását.',
  'szeretnéd megvalósítani a benned rejlő potenciált.',
  'kiváncsi vagy arra, hogy hogyan tudsz egy sikeres életet megteremteni a vizualizáció, a neurobiológia és a teremtés eszközeivel.',
];

export const AboutProgSection = () => {
  const router = useRouter();

  return (
    <section id="neked-szolo-program" className={styles.aboutProgSection}>
      <h1>Életre szóló program NEKED, ha</h1>
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
