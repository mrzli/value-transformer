import { compose } from '@gmjs/compose-function';
import { Fn1 } from '@gmjs/generic-types';
import { map } from '../map';
import { toMap } from '../to-map';

export function aggregate<T, U, K>(
  aggregator: (input: Iterable<T>) => U,
): Fn1<ReadonlyMap<K, Iterable<T>>, ReadonlyMap<K, U>> {
  return compose(
    map(([k, v]) => [k, aggregator(v)] as const),
    toMap(),
  );
}
