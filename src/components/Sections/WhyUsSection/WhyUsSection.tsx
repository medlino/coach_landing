/* eslint-disable quotes */
'use client';

import { Button } from '../../Button';
import { CategoryItem } from './CategoryItem';
import styles from './WhyUsSection.module.scss';

const categories = [
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538c81806a96_Untitleddesign-68.png',
    title: 'Tudományosan alátámasztott',
    desc: 'Ötvözöm a meditáció ősi bölcsességét a kortárs tudományos, neurológiai és pszichológiai szemlélettel.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538ccb2ec5c9_Untitleddesign-70.png',
    title: 'Modern megközelítés',
    desc: 'A meditációs technikák dogmával, ősi rituálékkal vagy spirituális hitrendszerekkel járnak - az én megközelítésem más, modern és mindenkinek szól.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/6538ce9ccb4d7_Untitleddesign-71.png',
    title: 'Élő meditációk',
    desc: 'Minden élő óra egy tanulásból és gyakorlásból álló keverék. Ott leszek veled, végigvezetlek a folyamaton és válaszolok a kérdéseidre.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/653a032899162_Untitleddesign-74.png',
    title: 'Házi feladatok és gyakorlatok',
    desc: 'Az utazásod nem ér véget egy óra végén. Házi feladatokat és tevékenységeket kapsz, amelyekkel minden héten foglalkozni fogsz.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/653a09c3df261_Untitleddesign-81.png',
    title: 'Bizonyított sikerek',
    desc: 'Ez a kurzus nem kísérlet. Számtalan ügyfelem sikerén és évekig tartó saját kutatásomon és gyakorlatomon alapul.',
  },
  {
    imgSrc:
      'https://d1yei2z3i6k35z.cloudfront.net/5400183/653a08ac3fc4d_Untitleddesign-77.png',
    title: 'Támogató közeg',
    desc: 'Jelentkezz be a kurzusra, és üdvözöllek a privát online közösségemben, ahol életre szóló támogatást és kapcsolatokat találsz.',
  },
];

export const WhyUsSection = () => {
  return (
    <section className={styles.whyUsSection}>
      <h1>Miért válaszd ezt a képzést?</h1>
      <p>
        A meditáció egy olyan szó, amelyet manapság gyakran emlegetnek, és
        <b>számos különböző meditációs technika létezik.</b>
      </p>
      <p>
        Tehát mi teszi ezt <b>kiemelkedővé?</b>
      </p>
      <div className={styles.categoryList}>
        {categories.map((category, index) => (
          <CategoryItem key={index} {...category} />
        ))}
      </div>
      <Button text="JELENTKEZZ MOST" />
    </section>
  );
};
