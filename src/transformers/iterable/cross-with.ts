import { Fn1 } from '@gmjs/generic-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export function crossWith<T, I1>(
  iterable1: Iterable<I1>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1]>>;
export function crossWith<T, I1, I2>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2]>>;
export function crossWith<T, I1, I2, I3>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3]>>;
export function crossWith<T, I1, I2, I3, I4>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4]>>;
export function crossWith<T, I1, I2, I3, I4, I5>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5]>>;
export function crossWith<T, I1, I2, I3, I4, I5, I6>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6]>>;
export function crossWith<T, I1, I2, I3, I4, I5, I6, I7>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
  iterable7: Iterable<I7>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6, I7]>>;
export function crossWith<T, I1, I2, I3, I4, I5, I6, I7, I8>(
  iterable1: Iterable<I1>,
  iterable2: Iterable<I2>,
  iterable3: Iterable<I3>,
  iterable4: Iterable<I4>,
  iterable5: Iterable<I5>,
  iterable6: Iterable<I6>,
  iterable7: Iterable<I7>,
  iterable8: Iterable<I8>,
): Fn1<Iterable<T>, Iterable<readonly [T, I1, I2, I3, I4, I5, I6, I7, I8]>>;
export function crossWith<T>(
  ...otherIterables: readonly Iterable<Any>[]
): Fn1<Iterable<T>, Iterable<readonly Any[]>> {
  return function* (input: Iterable<T>): Iterable<readonly Any[]> {
    const iterables = [input, ...otherIterables];
    const iterators = iterables.map((iterable) => iterable[Symbol.iterator]());
    const arrays: readonly Any[] = iterables.map(() => []);
    const lengths: (number | undefined)[] = arrays.map(() => undefined);

    const items = iterators.map((iterator) => iterator.next());
    const someDone = items.some((item) => item.done);
    if (someDone) {
      return [];
    }

    for (const [i, item] of items.entries()) {
      arrays[i].push(item.value);
    }

    const indexes = arrays.map(() => 0);

    yield toTuple(arrays, indexes);

    while (true) {
      const result = getNextTuple(iterators, arrays, lengths, indexes);
      if (result.done) {
        break;
      } else {
        yield result.value;
      }
    }
  };
}

interface GetNextResultNotDone {
  readonly value: readonly Any[];
  readonly done: false;
}

interface GetNextResultDone {
  readonly value: undefined;
  readonly done: true;
}

type GetNextTupleResult = GetNextResultNotDone | GetNextResultDone;

function getNextTuple(
  iterators: readonly Iterator<Any, Any, undefined>[],
  arrays: readonly Any[][],
  lengths: (number | undefined)[],
  indexes: number[],
): GetNextTupleResult {
  const lastIterateIndex = iterators.length - 1;

  for (let i = lastIterateIndex; i >= 0; i--) {
    const iterator = iterators[i];
    const array = arrays[i];
    const length = lengths[i];

    if (length === undefined) {
      const item = iterator.next();
      if (item.done) {
        if (i === 0) {
          // break and (after loop) return done
          break;
        } else {
          lengths[i] = array.length;
          indexes[i] = 0;
          continue; // this is redundant, but explicit
        }
      } else {
        array.push(item.value);
        indexes[i] += 1;
        return { value: toTuple(arrays, indexes), done: false };
      }
    } else {
      indexes[i] += 1;
      if (indexes[i] < length) {
        return { value: toTuple(arrays, indexes), done: false };
      } else {
        if (i === 0) {
          // break and (after loop) return done
          break;
        } else {
          indexes[i] = 0;
          continue; // this is redundant, but explicit
        }
      }
    }
  }

  return { value: undefined, done: true };
}

function toTuple(arrays: readonly Any[][], indexes: number[]): readonly Any[] {
  return indexes.map((index, i) => arrays[i][index]);
}
