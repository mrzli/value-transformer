import { Fn1 } from '@gmjs/generic-types';

export function toArray<T>(): Fn1<Iterable<T>, readonly T[]> {
  return (input: Iterable<T>) => {
    return [...input];
  };
}
