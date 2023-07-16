import { describe, expect, it } from '@jest/globals';
import { indexes } from './indexes';
import { getArrayResult } from '../test-util';

describe('indexes', () => {
  describe('indexes()', () => {
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
        expected: [0],
      },
      {
        input: [1, 2, 3],
        expected: [0, 1, 2],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, indexes());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
