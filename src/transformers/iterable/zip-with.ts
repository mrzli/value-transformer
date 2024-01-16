import { Fn1 } from '@gmjs/generic-types';

export function zipWith<T, I1>(
  iterable1: Iterable<I1>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1]>>;
export function zipWith<T, I1, I2>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2]>>;
export function zipWith<T, I1, I2, I3>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3]>>;
export function zipWith<T, I1, I2, I3, I4>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4]>>;
export function zipWith<T, I1, I2, I3, I4, I5>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5]>>;
export function zipWith<T, I1, I2, I3, I4, I5, I6>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6]>>;
export function zipWith<T, I1, I2, I3, I4, I5, I6, I7>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
  iterable7: Iterable<I7>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6, I7]>>;
export function zipWith<T, I1, I2, I3, I4, I5, I6, I7, I8>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
  iterable7: Iterable<I7>,
  iterable8: Iterable<I8>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6, I7, I8]>>;
export function zipWith<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...otherIterables: readonly Iterable<any>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Fn1<Iterable<T>, Iterable<readonly any[]>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function* (input: Iterable<T>): Iterable<readonly any[]> {
    const iterables = [input, ...otherIterables];
    const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());

    while (true) {
      const items = iterators.map((iterator) => iterator.next());

      const someDone = items.some((item) => item.done);
      if (someDone) {
        const allDone = items.every((item) => item.done);
        if (!allDone) {
          throw new Error(`All iterables must be exhausted at the same time.`);
        }
        break;
      }

      const values = items.map((item) => item.value);

      yield values;
    }
  };
}
