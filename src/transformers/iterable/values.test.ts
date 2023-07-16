import { describe, expect, it } from '@jest/globals';
import { values } from './values';
import { getArrayResult } from '../test-util';

describe('values', () => {
  describe('values()', () => {
    interface Example {
      readonly input: Iterable<readonly [number, string]>;
      readonly expected: readonly string[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [[1, 'value-1']],
        expected: ['value-1'],
      },
      {
        input: [
          [1, 'value-1'],
          [1, 'value-1'],
        ],
        expected: ['value-1', 'value-1'],
      },
      {
        input: [
          [1, 'value-1'],
          [2, 'value-2'],
        ],
        expected: ['value-1', 'value-2'],
      },
      {
        input: new Map([
          [1, 'value-1'],
          [2, 'value-2'],
        ]),
        expected: ['value-1', 'value-2'],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, values());
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
