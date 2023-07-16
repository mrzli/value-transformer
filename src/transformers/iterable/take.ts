import { Fn1 } from '@gmjs/generic-types';

export function take(count: number): Fn1<Iterable<number>, Iterable<number>> {
  return function* (input: Iterable<number>): Iterable<number> {
    let index = 0;
    for (const value of input) {
      if (index++ >= count) {
        break;
      }
      yield value;
    }
  };
}
