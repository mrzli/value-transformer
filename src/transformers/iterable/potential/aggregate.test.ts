import { describe, expect, it } from '@jest/globals';
import { aggregate } from './aggregate';
import { getArrayResult } from '../../_test';

describe('aggregate', () => {
  describe('aggregate()', () => {
    type ExampleInputItem = readonly [string, readonly number[]];
    type ExampleOutputItem = readonly [string, number];

    interface Example {
      readonly input: readonly ExampleInputItem[];
      readonly expected: readonly ExampleOutputItem[];
    }

    const AGGREGATE_FN = (input: Iterable<number>): number => {
      let total = 0;
      for (const item of input) {
        total += item;
      }
      return total;
    };

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [['k1', []]],
        expected: [['k1', 0]],
      },
      {
        input: [
          ['k1', []],
          ['k2', []],
        ],
        expected: [
          ['k1', 0],
          ['k2', 0],
        ],
      },
      {
        input: [
          ['k1', [0]],
          ['k2', [1]],
        ],
        expected: [
          ['k1', 0],
          ['k2', 1],
        ],
      },
      {
        input: [
          ['k1', [1, 2]],
          ['k2', [3, 4]],
        ],
        expected: [
          ['k1', 3],
          ['k2', 7],
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          new Map<string, readonly number[]>(example.input),
          aggregate(AGGREGATE_FN),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
