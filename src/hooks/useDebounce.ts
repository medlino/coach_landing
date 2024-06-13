import { useEffect, useRef, useCallback } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const latestCallback = useRef(callback);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => latestCallback.current(...args), delay);
    },
    [delay]
  );
}
