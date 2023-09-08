import { describe, expect, it } from '@jest/globals';
import { last } from './last';

describe('last', () => {
  describe('last()', () => {
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
          expected: 2,
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = last<number>()(example.input);
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
          const call = (): number => last<number>()(example.input);
          expect(call).toThrow();
        });
      }
    });
  });
});
