'use client';
import React from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './layout.module.scss';

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.verifyLayout}>
      <Header className={styles.header} />
      {children}
      <Footer />
    </div>
  );
}
