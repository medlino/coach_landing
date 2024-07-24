'use client';

import React, { useEffect, useState } from 'react';
import { RotatingTriangles } from 'react-loader-spinner';
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
      <div className={styles.titleWrapper}>
        <h1 className={styles.subTitle}>
          Teremts magadnak új életmódot a tudomány és spiritualitás
          egyensúlyával
        </h1>
      </div>
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
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
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
