import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo3.svg" alt="logo" />
      </div>
      <nav>
        <a>About</a>
        <a>Content</a>
        <a>Testimonals</a>
      </nav>
    </header>
  );
};
