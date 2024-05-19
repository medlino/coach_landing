import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';

import { throttle } from '@/utils/throttle';

import { Button } from '../Button';

import styles from './MobileHeader.module.scss';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className }: MobileHeaderProps) => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header
        className={clsx(
          styles.mobileHeader,
          scrolled ? styles.scrolled : '',
          className
        )}
      >
        <div className={styles.logo}>
          <img src="/og-bg.png" alt="logo" />
        </div>
        {session && (
          <div>
            <p>Isten hozott, {session.user?.name}!</p>
          </div>
        )}
        <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>
      </header>
      {menuOpen && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.menuActions}>
            <div className={styles.logo}>
              <img src="/og-bg.png" alt="logo" />
            </div>
            <div className={styles.closeButton} onClick={toggleMenu}>
              ×
            </div>
          </div>

          <nav>
            <a href="#home" onClick={toggleMenu}>
              Közösség
            </a>
            <a href="#about" onClick={toggleMenu}>
              Tartalom
            </a>
            <a href="#contact" onClick={toggleMenu}>
              Csomagok
            </a>
            <a href="#contact" onClick={toggleMenu}>
              Garancia
            </a>
            <a href="#contact" onClick={toggleMenu}>
              Testimonálok
            </a>
          </nav>

          <div className={styles.actions}>
            {!session ? (
              <Button text="Bejelentkezés" onClick={() => signIn('discord')} />
            ) : (
              <Button text="Kijelentkezés" onClick={() => signOut()} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
