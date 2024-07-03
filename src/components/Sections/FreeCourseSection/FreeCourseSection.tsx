'use client';

import { Button } from '@/components/Button/Button';

import styles from './FreeCoureSection.module.scss';

export const FreeCourseSection = () => {
  const handleDownloadPdf = () => {
    const pdfPath = 'docs/ingyenes_kurzus.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'elmeErejeKurzus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="kurzus" className={styles.courseSection}>
      <h1>Ingyenes kurzus</h1>
      <p className={styles.desc}>
        Ha kíváncsi vagy, hogy milyen tartalmakat kínál az Elme Ereje Közösség,
        akkor próbáld ki az ingyenes kurzusunkat!
      </p>
      <Button text="MEGNÉZEM A KURZUST" onClick={handleDownloadPdf} />
    </section>
  );
};
