import { Fn1, ObjectKey } from '@gmjs/generic-types';

export function toObject<
  K extends ObjectKey,
  V,
  O extends Readonly<Record<K, V>>,
>(): Fn1<Iterable<readonly [K, V]>, O> {
  return (input: Iterable<readonly [K, V]>) => {
    return Object.fromEntries(input) as O;
  };
}
