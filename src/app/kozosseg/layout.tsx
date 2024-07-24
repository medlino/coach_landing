'use client';
import React from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import styles from './layout.module.scss';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.communityLayout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
