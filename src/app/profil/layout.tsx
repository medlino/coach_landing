'use client';
import React from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { SimpleToaster } from '@/components/SimpleToaster/SimpleToaster';

import styles from './layout.module.scss';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.profileLayout}>
      <Header className={styles.header} />
      {children}
      <Footer />
      <SimpleToaster />
    </div>
  );
}
