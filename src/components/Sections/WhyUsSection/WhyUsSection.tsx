/* eslint-disable quotes */
'use client';

import { Button } from '../../Button';
import { CategoryItem } from './CategoryItem/CategoryItem';
import styles from './WhyUsSection.module.scss';

const categories = [
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538c81806a96_Untitleddesign-68.png',
    desc: 'Rendszeres élő beszélgetések, webinarok, ahol felteheted kérdéseidet, megoszthatod tapasztalataidat, végig kisérünk az úton, lépésről-lépésre.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/653a08ac3fc4d_Untitleddesign-77.png',
    desc: 'Csatlakozz egy támogató és összetartó közösséghez ahol hasonló gondolkodásmódú embereket ismerhetsz meg, akik együtt fejlődnek.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538ccb2ec5c9_Untitleddesign-70.png',
    desc: 'Tudományos és modern megközelítés: érthetően és átlátható kutatásokkal alátámasztva.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538ce9ccb4d7_Untitleddesign-71.png',
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
