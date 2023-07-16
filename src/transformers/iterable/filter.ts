import { Fn1 } from '@gmjs/generic-types';

export function filter<T>(
  predicate: (item: T, index: number) => boolean,
): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    let index = 0;
    for (const inputItem of input) {
      if (predicate(inputItem, index++)) {
        yield inputItem;
      }
    }
  };
}
