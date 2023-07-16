import { Fn1 } from '@gmjs/generic-types';

export function toSet<T>(): Fn1<Iterable<T>, ReadonlySet<T>> {
  return (input: Iterable<T>) => {
    return new Set(input);
  };
}
