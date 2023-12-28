import { Fn1 } from '@gmjs/generic-types';

export function filterWithGuard<T, U extends T = T>(
  predicate: (item: T, index: number) => item is U,
): Fn1<Iterable<T>, Iterable<U>> {
  return function* (input: Iterable<T>): Iterable<U> {
    let index = 0;
    for (const inputItem of input) {
      if (predicate(inputItem, index++)) {
        yield inputItem;
      }
    }
  };
}
