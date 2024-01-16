import { describe, expect, it } from '@jest/globals';
import { concat } from './concat';
import { getArrayResult } from '../_test';

describe('concat', () => {
  describe('concat()', () => {
    interface Example {
      readonly input: {
        readonly input: readonly number[];
        readonly other: readonly number[];
      };
      readonly expected: readonly number[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          input: [],
          other: [],
        },
        expected: [],
      },
      {
        input: {
          input: [],
          other: [0],
        },
        expected: [0],
      },
      {
        input: {
          input: [0],
          other: [],
        },
        expected: [0],
      },
      {
        input: {
          input: [0],
          other: [1],
        },
        expected: [0, 1],
      },
      {
        input: {
          input: [0, 1],
          other: [2, 3],
        },
        expected: [0, 1, 2, 3],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          example.input.input,
          concat(example.input.other),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
