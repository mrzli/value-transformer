import { describe, expect, it } from '@jest/globals';
import { Fn1 } from '@gmjs/generic-types';
import { flatMap } from './flat-map';
import { getArrayResult } from '../_test';

describe('flat-map', () => {
  describe('flatMap()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: readonly string[];
    }

    const MAPPER: Fn1<number, readonly string[]> = (item: number) => [
      `${item * 2}x`,
      `${item * 3}y`,
    ];

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [1],
        expected: ['2x', '3y'],
      },
      {
        input: [1, 2, 3],
        expected: ['2x', '3y', '4x', '6y', '6x', '9y'],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, flatMap(MAPPER));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
