import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/docs/aszf.pdf" download>
        Felhasználási feltételek
      </a>
      <span>|</span>
      <a href="/docs/adatvedelmi_nyilatkozat.pdf" download>
        Adatvédelem és szabályzat
      </a>
    </footer>
  );
};
