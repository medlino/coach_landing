'use client';

import styles from './AboutCourseSection.module.scss';

const listTexts = [
  'A frusztrált, szorongással teli lusta hétköznapokat szeretnéd,  produktív mindennapokká alakítani.',
  'Szeretnéd hogy a hangulat ingadozásaid egy kiegyensúlyozott érzelmi állapot váltsa fel.',
  'A fejedben össze-vissza cikázó, téged emésztő gondolatokat megtanuld kontrolálni és előny kovácsolni belőle.',
  'Szeretnél a feletted eluralkodó negatív érzelmek helyett egy rendszeresebb emelkedett érzelmi állapotot teremteni.',
];

export const AboutCourseSection = () => {
  return (
    <section id="kurzusrol" className={styles.aboutCourseSection}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.subTitle}>Képzés</h1>
      </div>
      <h2>Ajánljuk számodra a képzést ha:</h2>
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
