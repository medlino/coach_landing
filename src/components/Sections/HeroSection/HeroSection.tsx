'use client';

import { stripeCheckout } from '@/clientAPI/checkout';

import { Button } from '../../Button';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
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
          height: '500px',
          width: '800px',
          border: '4px white solid',
          borderRadius: '10px',
        }}
      ></iframe>
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
