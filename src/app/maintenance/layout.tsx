'use client';
import React from 'react';

import styles from './layout.module.scss';

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.maintenanceLayout}>{children}</div>;
}
