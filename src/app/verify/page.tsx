import { VerificationForm } from '@/components/VerificationForm/VerificationForm';

import styles from './page.module.scss';

export default async function Verify() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <VerificationForm />
        </div>
      </div>
    </main>
  );
}
