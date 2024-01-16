import { describe, expect, it } from '@jest/globals';
import { reverse } from './reverse';
import { getArrayResult } from '../_test';

describe('reverse', () => {
  describe('reverse()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: readonly number[];
    }

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
        expected: [5, 4, 3, 2, 1],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, reverse());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
