import { Fn1 } from '@gmjs/generic-types';

export function first<T>(): Fn1<Iterable<T>, T> {
  return (input: Iterable<T>): T => {
    const iterator = input[Symbol.iterator]();
    const result = iterator.next();
    if (result.done) {
      throw new Error('Iterable is empty (no first item).');
    }

    return result.value;
  };
}
