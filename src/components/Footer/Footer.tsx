import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a>Felhasználási feltételek</a>
      <span>|</span>
      <a>Adatvédelem és szabályzat</a>
    </footer>
  );
};
