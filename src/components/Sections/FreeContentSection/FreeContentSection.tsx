'use client';

import { Button } from '@/components/Button/Button';

import styles from './FreeContentSection.module.scss';

export const FreeContentSection = () => {
  const handleDownloadPdf = () => {
    const pdfPath = 'docs/ingyenes_tartalom.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'ElmeErejeTartalom.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="ingyenes-tartalom" className={styles.contentSection}>
      <h1>Ingyenes tartalom</h1>
      <p className={styles.desc}>
        Ha kíváncsi vagy, hogy milyen kurzusokat kínál az Elme Ereje Közösség,
        akkor próbáld ki az ingyenes tartalmunkat!
      </p>
      <Button text="MEGNÉZEM A TARTALMAT" onClick={handleDownloadPdf} />
    </section>
  );
};
