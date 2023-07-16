import { describe, expect, it } from '@jest/globals';
import { combineWithEachItem, conditionalConvert, tap } from './single';
import { getArrayResult } from './test-util';

describe('single', () => {
  describe('tap()', () => {
    interface Example {
      readonly input: number;
      readonly expected: {
        readonly sideEffectVar: string;
        readonly output: number;
      };
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 0,
        expected: {
          sideEffectVar: 'value0',
          output: 0,
        },
      },
      {
        input: 1,
        expected: {
          sideEffectVar: 'value1',
          output: 1,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        let sideEffectVar = 'value';
        const fn = tap((input) => {
          sideEffectVar += input;
        });
        const actual = fn(example.input);
        expect(actual).toEqual(example.expected.output);
        expect(sideEffectVar).toEqual(example.expected.sideEffectVar);
      });
    }
  });

  describe('conditionalConvert()', () => {
    interface Example {
      readonly input: {
        readonly input: string;
        readonly condition: ((input: string) => boolean) | boolean;
      };
      readonly expected: string;
    }

    const CONVERT_FN = (s: string): string => s + 'x';

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          input: 'a',
          condition: false,
        },
        expected: 'a',
      },
      {
        input: {
          input: 'a',
          condition: () => false,
        },
        expected: 'a',
      },
      {
        input: {
          input: 'a',
          condition: true,
        },
        expected: 'ax',
      },
      {
        input: {
          input: 'a',
          condition: () => true,
        },
        expected: 'ax',
      },
      {
        input: {
          input: 'a',
          condition: (input: string) => input === 'a',
        },
        expected: 'ax',
      },
      {
        input: {
          input: 'b',
          condition: (input: string) => input === 'a',
        },
        expected: 'b',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const fn = conditionalConvert(example.input.condition, CONVERT_FN);
        const actual = fn(example.input.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('combineWithEachItem()', () => {
    interface Example {
      readonly input: {
        readonly input: string;
        readonly array: readonly string[];
      };
      readonly expected: readonly string[];
    }

    const COMBINE_FN = (i1: string, i2: string): string => i1 + i2;

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          input: '',
          array: [],
        },
        expected: [],
      },
      {
        input: {
          input: '',
          array: [],
        },
        expected: [],
      },
      {
        input: {
          input: 'a',
          array: [],
        },
        expected: [],
      },
      {
        input: {
          input: '',
          array: ['1', '2', '3'],
        },
        expected: ['1', '2', '3'],
      },
      {
        input: {
          input: 'a',
          array: ['', '', ''],
        },
        expected: ['a', 'a', 'a'],
      },
      {
        input: {
          input: 'a',
          array: ['1', '2', '3'],
        },
        expected: ['a1', 'a2', 'a3'],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          example.input.input,
          combineWithEachItem(example.input.array, COMBINE_FN),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
