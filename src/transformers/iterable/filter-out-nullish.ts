import { Fn1 } from '@gmjs/generic-types';

export function filterOutNullish<T>(): Fn1<
  Iterable<T>,
  Iterable<NonNullable<T>>
> {
  return function* (input: Iterable<T>): Iterable<NonNullable<T>> {
    for (const inputItem of input) {
      if (inputItem !== null && inputItem !== undefined) {
        yield inputItem;
      }
    }
  };
}
