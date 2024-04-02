'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import { stripeCheckout } from '@/clientAPI/checkout';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getBreakpoints } from '@/styles/breakpoints';

import { Button } from '../../Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const isSmallDevice = useMediaQuery(
    `only screen and ${getBreakpoints().maxSm}`
  );

  return (
    <section className={styles.heroSection}>
      <h1>
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
        src={`https://youtube.com/embed/${'USt73BzZiX4'}?autoplay=0`}
        style={{
          maxHeight: '500px',
          maxWidth: '800px',
          width: '100%',
          height: '100%',
          border: '4px white solid',
          borderRadius: '10px',
        }}
      ></iframe>
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
