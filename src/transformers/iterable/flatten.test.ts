import { describe, expect, it } from '@jest/globals';
import { flatten } from './flatten';
import { getArrayResult } from '../_test';

describe('flatten', () => {
  describe('flatten()', () => {
    interface Example {
      readonly input: readonly (readonly number[])[];
      readonly expected: readonly number[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [[]],
        expected: [],
      },
      {
        input: [[], []],
        expected: [],
      },
      {
        input: [[1]],
        expected: [1],
      },
      {
        input: [[1], [2]],
        expected: [1, 2],
      },
      {
        input: [[1, 2]],
        expected: [1, 2],
      },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: [1, 2, 3, 4],
      },
      {
        input: [[1, 2], []],
        expected: [1, 2],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, flatten());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
