import { Fn1 } from '@gmjs/generic-types';

export function groupBy<T, K extends string | number | boolean>(
  keySelector: (item: T) => K,
): Fn1<Iterable<T>, ReadonlyMap<K, readonly T[]>> {
  return (input: Iterable<T>): ReadonlyMap<K, readonly T[]> => {
    const map = new Map<K, T[]>();
    for (const inputItem of input) {
      const key = keySelector(inputItem);
      const value = map.get(key) ?? [];
      value.push(inputItem);
      map.set(key, value);
    }
    return map;
  };
}
