import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { useDebounce } from './useDebounce';

export function useSuccessToast(text: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = useMemo(() => searchParams.get('success'), [searchParams]);

  const toastSuccess = useDebounce(() => {
    toast.success(text);
  }, 100);

  useEffect(() => {
    if (success) {
      toastSuccess();
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('success');
      router.replace(currentUrl.href);
    }
  }, [success]);

  return () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('success', 'true');
    window.location.href = currentUrl.href;
  };
}
