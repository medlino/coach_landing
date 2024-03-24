'use client';

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
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
