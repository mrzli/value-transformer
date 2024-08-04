import { compose } from '@gmjs/compose-function';
import { Fn1, ObjectKey } from '@gmjs/generic-types';
import { map } from './map';
import { toObject } from './to-object';

export function toObjectBy<
  T,
  K extends ObjectKey,
  O extends Readonly<Record<K, T>>,
>(keySelector: (item: T) => K): Fn1<Iterable<T>, O> {
  return compose(
    map((item) => [keySelector(item), item] as const),
    toObject(),
  );
}
