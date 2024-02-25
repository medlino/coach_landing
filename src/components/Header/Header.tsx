import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo3.svg" alt="logo" />
      </div>
      <div className={styles.social}>
        <a
          href="https://www.tiktok.com/@medlino2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/tiktok.svg" alt="tiktok" />
        </a>
        <a
          href="https://www.instagram.com/dokik__/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/instagram.svg" alt="instagram" />
        </a>
      </div>
    </header>
  );
};
