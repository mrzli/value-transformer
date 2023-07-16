import { Fn1 } from '@gmjs/generic-types';

export function toMap<K, V>(): Fn1<
  Iterable<readonly [K, V]>,
  ReadonlyMap<K, V>
> {
  return (input: Iterable<readonly [K, V]>) => {
    return new Map(input);
  };
}
