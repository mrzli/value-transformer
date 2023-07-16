import { describe, expect, it } from '@jest/globals';
import { toArray } from './to-array';

describe('to-array', () => {
  describe('toArray()', () => {
    interface Example {
      readonly input: Iterable<number>;
      readonly expected: readonly number[];
    }

    const generator = function* (): Generator<number> {
      yield 1;
      yield 2;
      yield 3;
    };

    const EXAMPLES: readonly Example[] = [
      {
        input: generator(),
        expected: [1, 2, 3],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = toArray<number>()(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
