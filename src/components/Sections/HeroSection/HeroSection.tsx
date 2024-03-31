'use client';

import React, { useRef, useState } from 'react';

import { stripeCheckout } from '@/clientAPI/checkout';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getBreakpoints } from '@/styles/breakpoints';

import { Button } from '../../Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  const [showVolumeIcon, setShowVolumeIcon] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isSmallDevice = useMediaQuery(
    `only screen and ${getBreakpoints().maxSm}`
  );

  const volumeUp = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
      videoRef.current.muted = false;
    }
    setShowVolumeIcon(false);
  };

  return (
    <section className={styles.heroSection}>
      <h1>
        AZ ELME EREJE
        <br />
        Hogyan teremtsd meg saját sikered gondolataiddal és szokásaiddal?
      </h1>

      <div className={styles.videoWrapper}>
        {showVolumeIcon && !isSmallDevice && (
          <img
            src="/icons/volume-mute-fill.svg"
            alt="volume"
            onClick={volumeUp}
          />
        )}
        <video
          ref={videoRef}
          controls
          autoPlay
          muted
          playsInline
          width={isSmallDevice ? 254 : 316}
          height={isSmallDevice ? 450 : 560}
          style={{
            border: '1px white solid',
          }}
        >
          <source
            src="https://medlino-salonic.s3.eu-central-1.amazonaws.com/VSLJ%C3%93.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
