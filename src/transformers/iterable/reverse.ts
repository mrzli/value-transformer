import { Fn1 } from '@gmjs/generic-types';

export function reverse<T>(): Fn1<Iterable<T>, Iterable<T>> {
  return (input: Iterable<T>) => {
    const array = [...input];
    array.reverse();
    return array;
  };
}
