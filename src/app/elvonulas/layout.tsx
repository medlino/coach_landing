'use client';
import React from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './layout.module.scss';

export default function RelaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.relaxLayout}>
      <Header />
      {children}
      <Footer className={styles.relaxFooter} />
    </div>
  );
}
