import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/docs/aszf_v1.pdf" download>
        Felhasználási feltételek
      </a>
      <span>|</span>
      <a href="/docs/adatvedelmi_nyilatkozat_v1.pdf" download>
        Adatvédelem és szabályzat
      </a>
    </footer>
  );
};
