import { useEffect, useRef, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';

import { Button } from '../Button/Button';

import styles from './Header.module.scss';
import { throttle } from '@/utils/throttle';

export const Header = () => {
  const headerRef = useRef(null);
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');

    const handleScroll = throttle(() => {
      if (body) {
        if (body.scrollTop > 270 && !scrolled) {
          setScrolled(true);
        }
        if (scrolled && body.scrollTop <= 100) {
          setScrolled(false);
        }
      }
    }, 1000);

    if (body) {
      body.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (body) {
        body.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrolled]);

  return (
    <header
      ref={headerRef}
      className={clsx(styles.header, scrolled ? styles.scrolled : '')}
    >
      <nav>
        <div className={styles.logo}>
          <img src="/og-bg.png" alt="logo" />
          {/*         <a
          href="https://www.tiktok.com/@medlino2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/tiktok.svg" alt="tiktok" />
        </a>
        <a
          href="https://www.instagram.com/dokik__/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="icons/instagram.svg" alt="instagram" />
        </a> */}
        </div>
        <a>Közösség</a>
        <a>Tartalom</a>
        <a>Csomagok</a>
        <a>Garancia</a>
        <a>Testimoniálok</a>
      </nav>
      <div className={styles.actions}>
        {!session ? (
          <Button text="Bejelentkezés" onClick={() => signIn('discord')} />
        ) : (
          <>
            <p>Isten hozott, {session.user?.name}!</p>
            <Button text="Kijelentkezés" onClick={() => signOut()} />
          </>
        )}
      </div>
    </header>
  );
};
