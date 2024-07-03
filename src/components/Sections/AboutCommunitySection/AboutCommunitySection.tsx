'use client';

import { Button } from '../../Button/Button';

import { useRouter } from 'next/navigation';

import styles from './AboutCommunitySection.module.scss';

const texts = [
  'Szeretnéd végre megtalálni azokat a hasonló gondolkodású, azonos értékrendű embereket, akik építik és támogatják egymást.',
  'Szeretnél élőben is kapcsolódni a közösség tagjaival.',
  'Szeretnél egy valós közösséghez tartozni, ahol mérvadó a véleményed. ',
  'Szeretnéd lebontani azokat a korlátozó hiedelmeket, amelyeket a társadalom, média, és a múlt poros rendszerei építettek a tudatalattidba. ',
  'Szeretnél olyan tudáshoz hozzájutni, amely érthetően megfogalmazott és tudományosan alátámasztott. Ez a tudás ráébreszt, megtanít arra, mire képes a tested és elméd a természettel összehangolva.',
];

export const AboutCommunitySection = () => {
  const router = useRouter();

  return (
    <section id="neked-kozosseg" className={styles.aboutCommunitySection}>
      <h1>Neked szól ez a közösség, amennyiben</h1>
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
      {/* <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />{} */}
    </section>
  );
};
