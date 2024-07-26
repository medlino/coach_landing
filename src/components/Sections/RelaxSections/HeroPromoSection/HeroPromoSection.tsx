'use client';

import styles from './HeroPromoSection.module.scss';

const listTexts = [
  'Ezernyi inger vesz körül minket, nap mint nap: munka, család, párkapcsolat, anyagi tényezők.',
  'Egész nap 10.000-es fordulaton pörgünk, hogy ezekkel a körülményekkel felvegyük a tempót.',
  'Emellett próbáluk odafigyelni az egészséges életmódra, táplálkozásra, mozgásra és a testli-lelki-szellemi egyensúlyra.',
];

export const HeroPromoSection = () => {
  return (
    <section id="hero-promo" className={styles.heroPromoSection}>
      <div className={styles.textList}>
        {listTexts.map((text, index) => (
          <ul key={index}>
            <div>
              <li>{text}</li>
            </div>
          </ul>
        ))}
      </div>
      <img
        className={styles.arrowDown}
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={120}
        height={120}
      />
      <h2>
        Rengeteg mindenre fókuszálunk egyszerre csak éppen magunkra nem,
        mindemellett szeretnénk fejlődni, változni, életmódot váltani.
      </h2>
    </section>
  );
};
