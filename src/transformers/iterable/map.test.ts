import { describe, expect, it } from '@jest/globals';
import { Fn1 } from '@gmjs/generic-types';
import { map } from './map';
import { getArrayResult } from '../_test';

describe('map', () => {
  describe('map()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: readonly string[];
    }

    const MAPPER: Fn1<number, string> = (item: number) => `${item * 2}x`;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [1],
        expected: ['2x'],
      },
      {
        input: [1, 2, 3],
        expected: ['2x', '4x', '6x'],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, map(MAPPER));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
