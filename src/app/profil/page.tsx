import { Suspense } from 'react';

import { ProfileForm } from '@/components/ProfileForm/ProfileForm';

import styles from './page.module.scss';

export default async function Profile() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <Suspense>
            <ProfileForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
