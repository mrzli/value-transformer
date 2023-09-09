import { Fn1 } from '@gmjs/generic-types';

export function skip<T>(count: number): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    let index = 0;
    for (const value of input) {
      if (index++ < count) {
        continue;
      }
      yield value;
    }
  };
}
