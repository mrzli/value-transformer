import { describe, expect, it } from '@jest/globals';
import { tapPerItem } from './tap-per-item';
import { getArrayResult } from '../test-util';

describe('tap-per-item', () => {
  describe('tapPerItem()', () => {
    interface Example {
      readonly input: readonly number[];
      readonly expected: {
        readonly sideEffectVar: string;
        readonly output: readonly number[];
      };
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [0],
        expected: {
          sideEffectVar: 'value0',
          output: [0],
        },
      },
      {
        input: [1, 2, 3],
        expected: {
          sideEffectVar: 'value123',
          output: [1, 2, 3],
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        let sideEffectVar = 'value';
        const actual = getArrayResult(
          example.input,
          tapPerItem((input) => {
            sideEffectVar += input;
          }),
        );
        expect(actual).toEqual(example.expected.output);
        expect(sideEffectVar).toEqual(example.expected.sideEffectVar);
      });
    }
  });
});
