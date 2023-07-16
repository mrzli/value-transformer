import { Fn1 } from '@gmjs/generic-types';

export function flatten<T>(): Fn1<Iterable<Iterable<T>>, Iterable<T>> {
  return function* (input: Iterable<Iterable<T>>): Iterable<T> {
    for (const inputItem of input) {
      for (const innerItem of inputItem) {
        yield innerItem;
      }
    }
  };
}
