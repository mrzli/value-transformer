import { Fn1 } from '@gmjs/generic-types';

export function map<T, U>(
  mapper: (item: T, index: number) => U,
): Fn1<Iterable<T>, Iterable<U>> {
  return function* (input: Iterable<T>): Iterable<U> {
    let index = 0;
    for (const inputItem of input) {
      yield mapper(inputItem, index++);
    }
  };
}
