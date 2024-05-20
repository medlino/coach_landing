'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '../../Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>
        AZ ELME EREJE
        <br />
        Hogyan teremtsd meg saját sikered gondolataiddal és szokásaiddal?
      </h1>
      <iframe
        className="video"
        title="Az Elme Ereje"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share”"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src="https://www.youtube.com/embed/4p_ASUChuz0?si=UTkKZaMYwIV_z2O_"
        style={{
          maxHeight: '500px',
          maxWidth: '800px',
          width: '100%',
          height: '100%',
          border: '4px white solid',
          borderRadius: '10px',
        }}
      ></iframe>
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
