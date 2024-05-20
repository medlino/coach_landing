import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import clsx from 'clsx';

import { throttle } from '@/utils/throttle';

import { Button } from '../Button/Button';

import styles from './DesktopHeader.module.scss';

interface DesktopHeaderProps {
  className?: string;
}

export const DesktopHeader = ({ className }: DesktopHeaderProps) => {
  const { data: session } = useSession();
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

  return (
    <header
      className={clsx(
        styles.desktopHeader,
        scrolled ? styles.scrolled : '',
        className
      )}
    >
      <nav>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/og-bg.png" alt="logo" />
          </Link>
        </div>
        <a href={discordLink} target="_blank" rel="noopener noreferrer">
          Közösség
        </a>
        <Link href="/#tartalom">Tartalom</Link>
        <Link href="/#csomagok">Csomagok</Link>
        <Link href="/#garancia">Garancia</Link>
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
