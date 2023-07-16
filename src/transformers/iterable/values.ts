import { Fn1 } from '@gmjs/generic-types';

export function values<K, V>(): Fn1<Iterable<readonly [K, V]>, Iterable<V>> {
  return function* (input: Iterable<readonly [K, V]>): Iterable<V> {
    for (const inputItem of input) {
      yield inputItem[1];
    }
  };
}
