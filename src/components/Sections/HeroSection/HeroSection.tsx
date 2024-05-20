'use client';

import React, { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

import { Button } from '../../Button/Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const router = useRouter();
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>
        AZ ELME EREJE
        <br />
        Hogyan teremtsd meg saját sikered gondolataiddal és szokásaiddal?
      </h1>
      {clientSide ? (
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
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '500px',
            maxWidth: '800px',
            width: '100%',
            height: '100%',
            border: '4px white solid',
            borderRadius: '10px',
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="black"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <Button text="CSATLAKOZOM" onClick={() => router.push('/#csomagok')} />
    </section>
  );
};
