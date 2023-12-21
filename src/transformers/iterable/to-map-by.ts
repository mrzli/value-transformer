import { compose } from '@gmjs/compose-function';
import { Fn1 } from '@gmjs/generic-types';
import { map } from './map';
import { toMap } from './to-map';

export function toMapBy<T, K extends string | number | boolean>(
  keySelector: (item: T) => K,
): Fn1<Iterable<T>, ReadonlyMap<K, T>> {
  return compose(
    map((item) => [keySelector(item), item] as const),
    toMap(),
  );
}
