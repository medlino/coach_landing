/* eslint-disable quotes */
'use client';

import { Button } from '../../Button';
import { CategoryItem } from './CategoryItem/CategoryItem';
import styles from './WhyUsSection.module.scss';

const categories = [
  {
    imgSrc: '/laptop.png',
    desc: 'Rendszeres élő beszélgetések, webinarok, ahol felteheted kérdéseidet, megoszthatod tapasztalataidat, végig kisérünk az úton, lépésről-lépésre.',
  },
  {
    imgSrc: '/atom.png',
    desc: 'Tudományos és modern megközelítés: érthetően és átlátható kutatásokkal alátámasztva.',
  },
  {
    imgSrc: '/mind.png',
    desc: 'Csatlakozz egy támogató és összetartó közösséghez ahol hasonló gondolkodásmódú embereket ismerhetsz meg, akik együtt fejlődnek.',
  },
  {
    imgSrc: '/monk.png',
    desc: 'Gyakorlatok a tudásod megerősítésére, amelyek elvégzésével valóban napról-napra érezheted a változást.',
  },
];

export const WhyUsSection = () => {
  return (
    <section className={styles.whyUsSection}>
      <h1>Mit sajátíthatsz el a programban?</h1>
      <div className={styles.categoryList}>
        {categories.map((category, index) => (
          <CategoryItem key={index} {...category} />
        ))}
      </div>
      <Button text="CSATLAKOZOM" />
    </section>
  );
};
