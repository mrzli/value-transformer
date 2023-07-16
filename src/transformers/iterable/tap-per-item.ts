import { Fn1 } from '@gmjs/generic-types';

export function tapPerItem<T>(
  action: (item: T, index: number) => void,
): Fn1<Iterable<T>, Iterable<T>> {
  return function* (input: Iterable<T>): Iterable<T> {
    let index = 0;
    for (const inputItem of input) {
      action(inputItem, index++);
      yield inputItem;
    }
  };
}
