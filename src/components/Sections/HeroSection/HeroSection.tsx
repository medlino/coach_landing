'use client';

import { Button } from '../../Button';
import styles from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <h1>KURZUS</h1>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${'wPJeydzfheo'}?autoplay=0`}
        style={{
          height: '380px',
          width: '650px',
        }}
      ></iframe>
      <Button text="CSATLAKOZOM" />
    </section>
  );
};
