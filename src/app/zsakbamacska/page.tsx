'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { LuckyValidationForm } from '@/components/LuckyValidationForm/LuckyValidationForm';
import { LuckyBagForm } from '@/components/LuckyBagForm/LuckyBagForm';
import { Loading } from '@/components/Loading/Loading';

import styles from './page.module.scss';
import { isValidGiftId } from '@/utils/validation';

export default function ZsakbaMacska() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [validationResult, setValidationResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const giftId = searchParams.get('id');

  useEffect(() => {
    if (!isValidGiftId(giftId)) {
      router.push('/');
      return;
    }

    setLoading(false);
  }, [giftId]);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {loading && <Loading />}
          {!validationResult && isValidGiftId(giftId) && (
            <LuckyValidationForm setResult={setValidationResult} />
          )}
          {validationResult && isValidGiftId(giftId) && (
            <LuckyBagForm giftId={giftId!} />
          )}
        </div>
      </div>
    </main>
  );
}
