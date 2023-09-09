import { Fn1 } from '@gmjs/generic-types';

export function take<T>(count: number): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    let index = 0;
    for (const value of input) {
      if (index++ >= count) {
        break;
      }
      yield value;
    }
  };
}
