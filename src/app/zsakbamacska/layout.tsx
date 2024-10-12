'use client';
import React, { Suspense } from 'react';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { SimpleToaster } from '@/components/SimpleToaster/SimpleToaster';

import styles from './layout.module.scss';

export default function ZsakbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.zsakbaLayout}>
      <Header />
      <Suspense>{children}</Suspense>
      <Footer />
      <SimpleToaster />
    </div>
  );
}
