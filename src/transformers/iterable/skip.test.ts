import { describe, expect, it } from '@jest/globals';
import { skip } from './skip';
import { getArrayResult } from '../_test';

describe('skip', () => {
  describe('skip()', () => {
    interface Example {
      readonly input: {
        readonly array: readonly number[];
        readonly count: number;
      };
      readonly expected: readonly number[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          array: [],
          count: 0,
        },
        expected: [],
      },
      {
        input: {
          array: [],
          count: 1,
        },
        expected: [],
      },
      {
        input: {
          array: [0, 1, 2],
          count: 0,
        },
        expected: [0, 1, 2],
      },
      {
        input: {
          array: [0, 1, 2],
          count: 1,
        },
        expected: [1, 2],
      },
      {
        input: {
          array: [0, 1, 2],
          count: 2,
        },
        expected: [2],
      },
      {
        input: {
          array: [0, 1, 2],
          count: 3,
        },
        expected: [],
      },
      {
        input: {
          array: [0, 1, 2],
          count: 4,
        },
        expected: [],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          example.input.array,
          skip(example.input.count),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
