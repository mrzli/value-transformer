import { Fn1 } from '@gmjs/generic-types';

export function indexes<T>(): Fn1<Iterable<T>, Iterable<number>> {
  return function* (input: Iterable<T>): Iterable<number> {
    let index = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _inputItem of input) {
      yield index++;
    }
  };
}
