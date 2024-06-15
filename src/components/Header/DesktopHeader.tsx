import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { throttle } from '@/utils/throttle';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';

import styles from './DesktopHeader.module.scss';

interface DesktopHeaderProps {
  className?: string;
}

export const DesktopHeader = ({ className }: DesktopHeaderProps) => {
  const router = useRouter();
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
        <Link href="/#segitseg">Segítség</Link>
      </nav>
      <div className={styles.actions}>
        {!session ? (
          <Button text="Bejelentkezés" onClick={() => signIn('discord')} />
        ) : (
          <Dropdown text={session.user.name!}>
            <button onClick={() => router.push('/profil')}>Profilom</button>
            <button onClick={() => router.push('/aktivalas')}>Aktiválás</button>
            <button onClick={() => signOut()}>Kijelentkezés</button>
          </Dropdown>
        )}
      </div>
    </header>
  );
};
