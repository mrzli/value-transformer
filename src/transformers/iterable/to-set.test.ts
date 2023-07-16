import { describe, expect, it } from '@jest/globals';
import { toSet } from './to-set';
import { getArrayResult } from '../test-util';

describe('to-set', () => {
  describe('toSet()', () => {
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
        input: [1, 2, 1, 3],
        expected: [1, 2, 3],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, toSet());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
