import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import clsx from 'clsx';

import { throttle } from '@/utils/throttle';

import { Button } from '../Button/Button';

import styles from './MobileHeader.module.scss';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className }: MobileHeaderProps) => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const discordLink = process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK;

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
          <Link href="/">
            <img src="/og-bg.png" alt="logo" />
          </Link>
        </div>
        <div>
          <p>AZ ELME EREJE</p>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>
      </header>
      {menuOpen && (
        <div className={styles.fullscreenMenu}>
          <div className={styles.menuActions}>
            <Link href="/" className={styles.logo}>
              <img src="/og-bg.png" alt="logo" />
            </Link>
            <div className={styles.closeButton} onClick={toggleMenu}>
              ×
            </div>
          </div>

          <nav>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
            >
              Közösség
            </a>
            <Link href="/#tartalom" onClick={toggleMenu}>
              Tartalom
            </Link>
            <Link href="/#csomagok" onClick={toggleMenu}>
              Csomagok
            </Link>
            <Link href="/profil" onClick={toggleMenu}>
              Profilom
            </Link>
            <Link href="/aktivalas" onClick={toggleMenu}>
              Aktiválás
            </Link>
            <Link href="/#segitseg" onClick={toggleMenu}>
              Segítség
            </Link>
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
