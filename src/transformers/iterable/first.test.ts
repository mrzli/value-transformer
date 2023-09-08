import { describe, expect, it } from '@jest/globals';
import { first } from './first';

describe('first', () => {
  describe('first()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: readonly number[];
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: [1],
          expected: 1,
        },
        {
          input: [1, 2],
          expected: 1,
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = first<number>()(example.input);
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('throws', () => {
      interface Example {
        readonly input: readonly number[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: [],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const call = (): number => first<number>()(example.input);
          expect(call).toThrow();
        });
      }
    });
  });
});
