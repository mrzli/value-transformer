import { describe, expect, it } from '@jest/globals';
import { Fn1 } from '@gmjs/generic-types';
import { filter } from './filter';
import { getArrayResult } from '../_test';

describe('filter', () => {
  describe('filter()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: readonly number[];
    }

    const PREDICATE: Fn1<number, boolean> = (item: number) => item % 2 === 0;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [1],
        expected: [],
      },
      {
        input: [1, 2, 3, 4, 5],
        expected: [2, 4],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, filter(PREDICATE));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
