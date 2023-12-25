import { Fn1 } from '@gmjs/generic-types';

export function count<T>(
  predicate?: (item: T, index: number) => boolean,
): Fn1<Iterable<T>, number> {
  return (input: Iterable<T>): number => {
    let index = 0;
    let count = 0;
    for (const inputItem of input) {
      if (!predicate || predicate(inputItem, index)) {
        count++;
      }
      index++;
    }

    return count;
  };
}
