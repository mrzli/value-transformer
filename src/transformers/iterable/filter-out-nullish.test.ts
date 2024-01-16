/* eslint-disable unicorn/no-null */
import { describe, expect, it } from '@jest/globals';
import { filterOutNullish } from './filter-out-nullish';
import { getArrayResult } from '../_test';

describe('filter-out-nullish', () => {
  describe('filterOutNullish()', () => {
    interface Example {
      readonly input: readonly (number | undefined | null)[];
      readonly expected: readonly number[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [0],
        expected: [0],
      },
      {
        input: [1],
        expected: [1],
      },
      {
        input: [1, 2],
        expected: [1, 2],
      },
      {
        input: [1, undefined, 2, null],
        expected: [1, 2],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, filterOutNullish());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
