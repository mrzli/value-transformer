import { Fn1 } from '@gmjs/generic-types';

export function sort<T>(
  compare: (item1: T, item2: T) => number,
): Fn1<Iterable<T>, Iterable<T>> {
  return (input: Iterable<T>) => {
    const array = [...input];
    array.sort(compare);
    return array;
  };
}
