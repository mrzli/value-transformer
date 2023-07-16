import { Fn1 } from '@gmjs/generic-types';

export function concat<T>(other: Iterable<T>): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    for (const inputItem of input) {
      yield inputItem;
    }
    for (const inputItem of other) {
      yield inputItem;
    }
  };
}
