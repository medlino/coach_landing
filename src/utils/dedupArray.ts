export function dedupArr<T extends { [key: string]: any }, K extends keyof T>(
  data: T[],
  idKey: K
): T[] {
  const map = new Map<T[K], T>();

  data.forEach((item) => {
    if (!map.has(item[idKey])) {
      map.set(item[idKey], item);
    }
  });

  return Array.from(map.values());
}
