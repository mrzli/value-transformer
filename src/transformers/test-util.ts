import { Fn1 } from '@gmjs/generic-types';
import { compose } from '@gmjs/compose-function';
import { toArray } from './iterable/to-array';

export function getArrayResult<T, U>(
  input: T,
  transformer: Fn1<T, Iterable<U>>,
): readonly U[] {
  const composed = compose(transformer, toArray());
  return composed(input);
}
