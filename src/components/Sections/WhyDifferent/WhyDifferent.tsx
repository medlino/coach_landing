'use client';

import { Button } from '@/components/Button/Button';

import styles from './WhyDifferent.module.scss';

const texts = [
  'Hiszünk abban, hogy a tudomány és a spiritualitás kéz a kézben járnak egymást segítve és alátámasztva.',
  'Nincs elmélet gyakorlat nélkül, és ez fordítva is igaz. Fontos, hogy az elméletet egyből gyakorlatba ültessük mivel így lehet a legjobban hasznosítani a hétköznapi életünkben a tanultakat.',
  'A mai online világban kevés az élőben történő kapcsolódás, így az online tér mellet minél több élő találkozót szervezünk, mert igazán csak élőben lehet kapcsolódni.',
];

export const WhyDifferent = () => {
  const handleDownloadPdf = () => {
    const pdfPath = 'docs/ingyenes_tartalom.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'ElmeErejeTartalom.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="miben-mas" className={styles.whyDifferentSection}>
      <h1>Miben vagyunk mi mások? </h1>
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
      <Button text="INGYENES TARTALOM" onClick={handleDownloadPdf} />
    </section>
  );
};
