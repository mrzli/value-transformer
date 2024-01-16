import { describe, expect, it } from '@jest/globals';
import { sort } from './sort';
import { getArrayResult } from '../_test';

describe('sort', () => {
  describe('sort()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: readonly number[];
    }

    const COMPARE_FN = (item1: number, item2: number): number => item1 - item2;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [1],
        expected: [1],
      },
      {
        input: [1, 2, 3, 4, 5],
        expected: [1, 2, 3, 4, 5],
      },
      {
        input: [5, 4, 3, 2, 1],
        expected: [1, 2, 3, 4, 5],
      },
      {
        input: [1, 4, 2, 5, 3],
        expected: [1, 2, 3, 4, 5],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, sort(COMPARE_FN));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
