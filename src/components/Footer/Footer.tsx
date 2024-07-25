import clsx from 'clsx';

import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={clsx(className, styles.footer)}>
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
