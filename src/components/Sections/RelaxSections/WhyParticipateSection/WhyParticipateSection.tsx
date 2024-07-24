'use client';

import styles from './WhyParticipateSection.module.scss';

const listTexts = [
  'Megfejtsd mik azok a dolgok amik hátráltatnak téged abban, hogy fejlődj, változz.',
  'El tudj merülni a gondolataidban és  lekerüljenek a maszkok, gátlások, hogy teljesen önmagad lehess.',
  'Tisztán lásd azt, hogy ki is vagy valójában, mit szeretnél elérni, mi fontos neked, és mire vagy képes az elméd erejével.',
  'Helyreállítsd az energiaszinted és az élethez való hozzáállásod a MARADANDÓ fejlődés érdekében.',
];

export const WhyParticipateSection = () => {
  return (
    <section id="miert-vegyel-reszt" className={styles.whyParticipateSection}>
      <h1>Miért érdemes részt venni egy elvonuláson?</h1>
      <h2>
        Végre ki tudsz szakadni a hétköznapi mókuskerékből, és tudsz időt szánni
        arra hogy:
      </h2>
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
    </section>
  );
};
