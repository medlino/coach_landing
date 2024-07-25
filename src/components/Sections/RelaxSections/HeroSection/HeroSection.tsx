'use client';

import React, { useEffect, useState } from 'react';
import { RotatingTriangles } from 'react-loader-spinner';

import styles from './HeroSection.module.scss';

export const RelaxHeroSection = () => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <section className={styles.relaxHeroSection}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.subTitle}>Elvonulás</h1>
      </div>
      {clientSide ? (
        <iframe
          className="video"
          title="Az Elme Ereje"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share”"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src="https://www.youtube.com/embed/Sa4ZIS6YcXg"
          style={{
            minHeight: '500px',
            maxWidth: '800px',
            width: '100%',
            height: '100%',
            border: '4px black solid',
            borderRadius: '10px',
          }}
        ></iframe>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '500px',
            maxWidth: '800px',
            width: '100%',
            height: '100%',
            border: '4px black solid',
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
    </section>
  );
};
