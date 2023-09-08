import { Fn1 } from '@gmjs/generic-types';

export function last<T>(): Fn1<Iterable<T>, T> {
  return (input: Iterable<T>): T => {
    const iterator = input[Symbol.iterator]();
    let result = iterator.next();

    if (result.done) {
      throw new Error('Iterable is empty (no last item).');
    }

    let lastValue = result.value;
    while (!result.done) {
      lastValue = result.value;
      result = iterator.next();
    }

    return lastValue;
  };
}
