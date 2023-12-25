import { describe, expect, it } from '@jest/globals';
import { Fn2 } from '@gmjs/generic-types';
import { count } from './count';

describe('count', () => {
  describe('count()', () => {
    type PredicateFn = Fn2<number, number, boolean>;

    interface Example {
      readonly input: {
        readonly array: readonly number[];
        readonly predicate: PredicateFn | undefined;
      };
      readonly expected: number;
    }

    const PREDICATE: PredicateFn = (item: number) => item % 2 === 0;

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          array: [],
          predicate: undefined,
        },
        expected: 0,
      },
      {
        input: {
          array: [1],
          predicate: undefined,
        },
        expected: 1,
      },
      {
        input: {
          array: [1, 2, 3, 4, 5],
          predicate: undefined,
        },
        expected: 5,
      },
      {
        input: {
          array: [],
          predicate: PREDICATE,
        },
        expected: 0,
      },
      {
        input: {
          array: [1],
          predicate: PREDICATE,
        },
        expected: 0,
      },
      {
        input: {
          array: [1, 2, 3, 4, 5],
          predicate: PREDICATE,
        },
        expected: 2,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = count(example.input.predicate)(example.input.array);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
