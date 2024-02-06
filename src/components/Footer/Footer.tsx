import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a>Terms & conditions</a>
      <span>|</span>
      <a>Privacy policy</a>
    </footer>
  );
};
