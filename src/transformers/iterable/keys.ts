import { Fn1 } from '@gmjs/generic-types';

export function keys<K, V>(): Fn1<Iterable<readonly [K, V]>, Iterable<K>> {
  return function* (input: Iterable<readonly [K, V]>): Iterable<K> {
    for (const inputItem of input) {
      yield inputItem[0];
    }
  };
}
