import { compose } from '@gmjs/compose-function';
import { Fn1 } from '@gmjs/generic-types';
import { map } from './map';
import { flatten } from './flatten';

export function flatMap<T, U>(
  mapper: (item: T) => Iterable<U>,
): Fn1<Iterable<T>, Iterable<U>> {
  return compose(map(mapper), flatten());
}
