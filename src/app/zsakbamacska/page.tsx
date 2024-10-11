'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { LuckyValidationForm } from '@/components/LuckyValidationForm/LuckyValidationForm';
import { LuckyBagForm } from '@/components/LuckyBagForm/LuckyBagForm';
import { Loading } from '@/components/Loading/Loading';

import styles from './page.module.scss';
import { isValidQRId } from '@/utils/validation';
import { getGift } from '@/clientAPI/getGift';

export default function ZsakbaMacska() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gift, setGift] = useState();
  const [validationResult, setValidationResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const qrId = searchParams.get('id');

  useEffect(() => {
    if (!isValidQRId(qrId)) {
      router.push('/');
      return;
    }

    if (qrId) {
      getGift(qrId)
        .then((result) => {
          if (!result.name) {
            setError('Nem található ilyen ajándék!');
          } else {
            setGift(result);
          }
        })
        .catch(() => {
          setError(
            'Hiba történt az ajándék ellenőrzése közben! Amennyiben úgy gondolod, hogy ez rendszerhiba kérlek írj egy emailt a hellomedlino@gmail.com-ra. Az emailben szerepeljen a rejtvény, a megoldás és a helyszínen lévő QR kódról egy kép!'
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [qrId]);

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {loading && (
            <div className={styles.loaderWrapper}>
              <Loading />
            </div>
          )}
          {error && (
            <div className={styles.loaderWrapper}>
              <span>{error}</span>
            </div>
          )}
          {!validationResult && isValidQRId(qrId) && !loading && !error && (
            <LuckyValidationForm setResult={setValidationResult} />
          )}
          {validationResult && isValidQRId(qrId) && !loading && !error && (
            <LuckyBagForm qrId={qrId} gift={gift!} />
          )}
        </div>
      </div>
    </main>
  );
}
