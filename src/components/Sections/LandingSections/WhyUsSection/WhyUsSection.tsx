/* eslint-disable quotes */
'use client';
import { useRouter } from 'next/navigation';

import { Button } from '../../../Button/Button';
import { CategoryItem } from './CategoryItem/CategoryItem';

import styles from './WhyUsSection.module.scss';

const categories = [
  {
    id: 'laptop',
    imgSrc: '/icons/laptop.png',
    desc: 'Rendszeres élő beszélgetések, webinarok, ahol felteheted kérdéseidet, megoszthatod tapasztalataidat. Végigkísérünk az úton, lépésről-lépésre.',
  },
  {
    id: 'atom',
    imgSrc: '/icons/atom.png',
    desc: 'Gyakorlatok a tudásod megerősítésére, amelyek elvégzésével valóban napról-napra érezheted a változást.',
  },
  {
    id: 'mind',
    imgSrc: '/icons/mind.png',
    desc: 'Tudományos és modern megközelítés érthetően, átlátható kutatásokkal alátámasztva.',
  },
  {
    id: 'monk',
    imgSrc: '/icons/monk.png',
    desc: 'Csatlakozhatsz egy támogató és összetartó közösséghez, ahol hasonló gondolkodásmódú embereket ismerhetsz meg, akikkel együtt fejlődhetsz.',
  },
];

export const WhyUsSection = () => {
  const router = useRouter();

  return (
    <section id="miert-csatlakozz" className={styles.whyUsSection}>
      <h1>Mit kínál számodra a program? </h1>
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </div>
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
