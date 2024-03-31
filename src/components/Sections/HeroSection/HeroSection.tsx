'use client';

import React, { useRef, useState } from 'react';

import { stripeCheckout } from '@/clientAPI/checkout';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getBreakpoints } from '@/styles/breakpoints';

import { Button } from '../../Button';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
<<<<<<< Updated upstream
=======
  const [showVolumeIcon, setShowVolumeIcon] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

>>>>>>> Stashed changes
  const isSmallDevice = useMediaQuery(
    `only screen and ${getBreakpoints().maxSm}`
  );

<<<<<<< Updated upstream
=======
  const volumeUp = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
      videoRef.current.muted = false;
    }
    setShowVolumeIcon(false);
  };

>>>>>>> Stashed changes
  return (
    <section className={styles.heroSection}>
      <h1>
        AZ ELME EREJE
        <br />
        Hogyan teremtsd meg saját sikered gondolataiddal és szokásaiddal?
      </h1>
<<<<<<< Updated upstream
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${'wPJeydzfheo'}?autoplay=0`}
        style={{
          height: '100%',
          width: '100%',
          maxHeight: isSmallDevice ? '98%' : '500px',
          maxWidth: isSmallDevice ? '98%' : '800px',
          border: '4px white solid',
          borderRadius: '10px',
        }}
      ></iframe>
=======

      <div className={styles.videoWrapper}>
        {showVolumeIcon && (
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
          width={isSmallDevice ? 296 : 316}
          height={isSmallDevice ? 525 : 560}
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

>>>>>>> Stashed changes
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
