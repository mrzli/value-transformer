import { describe, expect, it } from '@jest/globals';
import { keys } from './keys';
import { getArrayResult } from '../_test';

describe('keys', () => {
  describe('keys()', () => {
    describe('tuple', () => {
      interface Example {
        readonly input: Iterable<readonly [number, string]>;
        readonly expected: readonly number[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: [],
          expected: [],
        },
        {
          input: [[1, 'value-1']],
          expected: [1],
        },
        {
          input: [
            [1, 'value-1'],
            [1, 'value-1'],
          ],
          expected: [1, 1],
        },
        {
          input: [
            [1, 'value-1'],
            [2, 'value-2'],
          ],
          expected: [1, 2],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(example.input, keys());
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('map', () => {
      interface Example {
        readonly input: ReadonlyMap<number, string>;
        readonly expected: readonly number[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: new Map([
            [1, 'value-1'],
            [2, 'value-2'],
          ]),
          expected: [1, 2],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(example.input, keys());
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('object entries', () => {
      interface Example {
        readonly input: Iterable<readonly [string, string]>;
        readonly expected: readonly string[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: Object.entries({
            1: 'value-1',
            2: 'value-2',
          }),
          expected: ['1', '2'],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(example.input, keys());
          expect(actual).toEqual(example.expected);
        });
      }
    });
  });
});
