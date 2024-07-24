'use client';

import styles from './HeroPromoSection.module.scss';

const listTexts = [
  'Ezernyi inger vesz körül minket, nap mint nap: munka, család, párkapcsolat, anyagi tényezők.',
  'Egész nap 10.000-es fordulaton pörgünk, hogy ezekkel a körülményekkel felvegyük a tempót.',
  'Emellett próbáluk odafigyelni az egészséges életmódra, táplálkozásra, mozgásra és a testli-lelki-szellemi egyensúlyra.',
];

const followupTexts = [
  'Mindemellett szeretnénk fejlődni, változni, életmódot váltani.',
  'Rengeteg mindenre fókuszálunk egyszerre csak éppen magunkra nem, amiből minden más következik.',
];

export const HeroPromoSection = () => {
  return (
    <section id="hero-promo" className={styles.heroPromoSection}>
      <h1>Neked szól ez a közösség, amennyiben</h1>
      <div className={styles.textList}>
        {listTexts.map((text, index) => (
          <ul key={index}>
            <div>
              <img src="/icons/check.svg" alt="check" />
              <li>{text}</li>
            </div>
          </ul>
        ))}
      </div>
      <img
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={350}
        height={350}
      />
      {followupTexts.map((text, index) => (
        <h2 key={index}>{text}</h2>
      ))}
    </section>
  );
};
