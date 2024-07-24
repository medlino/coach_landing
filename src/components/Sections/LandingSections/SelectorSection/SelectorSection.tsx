'use client';

import { Button } from '@/components/Button/Button';

import styles from './SelectorSection.module.scss';

export const SelectorSection = () => {
  const handleDownloadPdf = () => {};

  return (
    <section id="szelekcio" className={styles.contentSection}>
      <h1>Miből áll a program?</h1>
      <div className={styles.triangle}>
        <Button text="KÖZÖSSÉG" onClick={handleDownloadPdf} />
        <div>
          <Button text="ELVONULÁS" onClick={handleDownloadPdf} />
          <Button text="KÉPZÉS" onClick={handleDownloadPdf} />
        </div>
      </div>
    </section>
  );
};
