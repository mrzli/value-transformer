import { describe, expect, it } from '@jest/globals';
import { getArrayResult } from '../_test';
import { crossWith } from './cross-with';
import { compose } from '@gmjs/compose-function';
import { take } from './take';

describe('cross-with', () => {
  describe('crossWith()', () => {
    describe('2', () => {
      interface Example {
        readonly input: {
          readonly input: readonly number[];
          readonly other: readonly number[];
        };
        readonly expected: readonly (readonly [number, number])[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            input: [],
            other: [],
          },
          expected: [],
        },
        {
          input: {
            input: [],
            other: [11],
          },
          expected: [],
        },
        {
          input: {
            input: [1],
            other: [11],
          },
          expected: [[1, 11]],
        },
        {
          input: {
            input: [1, 2],
            other: [11],
          },
          expected: [
            [1, 11],
            [2, 11],
          ],
        },
        {
          input: {
            input: [1],
            other: [11, 12],
          },
          expected: [
            [1, 11],
            [1, 12],
          ],
        },
        {
          input: {
            input: [1, 2],
            other: [11, 12],
          },
          expected: [
            [1, 11],
            [1, 12],
            [2, 11],
            [2, 12],
          ],
        },
        {
          input: {
            input: [1, 2, 3],
            other: [11, 12],
          },
          expected: [
            [1, 11],
            [1, 12],
            [2, 11],
            [2, 12],
            [3, 11],
            [3, 12],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            crossWith(example.input.other),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('3', () => {
      interface Example {
        readonly input: {
          readonly input: readonly number[];
          readonly other1: readonly number[];
          readonly other2: readonly number[];
        };
        readonly expected: readonly (readonly [number, number, number])[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            input: [],
            other1: [],
            other2: [],
          },
          expected: [],
        },
        {
          input: {
            input: [],
            other1: [11],
            other2: [21],
          },
          expected: [],
        },
        {
          input: {
            input: [1],
            other1: [],
            other2: [21],
          },
          expected: [],
        },
        {
          input: {
            input: [1],
            other1: [11],
            other2: [],
          },
          expected: [],
        },
        {
          input: {
            input: [1],
            other1: [11],
            other2: [21],
          },
          expected: [[1, 11, 21]],
        },
        {
          input: {
            input: [1, 2],
            other1: [11],
            other2: [21],
          },
          expected: [
            [1, 11, 21],
            [2, 11, 21],
          ],
        },
        {
          input: {
            input: [1, 2],
            other1: [11, 12],
            other2: [21, 22],
          },
          expected: [
            [1, 11, 21],
            [1, 11, 22],
            [1, 12, 21],
            [1, 12, 22],
            [2, 11, 21],
            [2, 11, 22],
            [2, 12, 21],
            [2, 12, 22],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            crossWith(example.input.other1, example.input.other2),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('3 - different types', () => {
      interface Example {
        readonly input: {
          readonly input: readonly string[];
          readonly other1: readonly number[];
          readonly other2: readonly boolean[];
        };
        readonly expected: readonly (readonly [string, number, boolean])[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            input: ['a'],
            other1: [1],
            other2: [true],
          },
          expected: [['a', 1, true]],
        },
        {
          input: {
            input: ['a', 'b'],
            other1: [1, 2],
            other2: [true, false],
          },
          expected: [
            ['a', 1, true],
            ['a', 1, false],
            ['a', 2, true],
            ['a', 2, false],
            ['b', 1, true],
            ['b', 1, false],
            ['b', 2, true],
            ['b', 2, false],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            crossWith(example.input.other1, example.input.other2),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('infinite iterable', () => {
      const infinite = function* (start: number): Generator<number> {
        let i = start;
        while (true) {
          yield i++;
        }
      };

      interface Example {
        readonly description: string;
        readonly input: {
          readonly input: Iterable<number>;
          readonly other1: Iterable<number>;
          readonly other2: Iterable<number>;
        };
        readonly expected: readonly (readonly [number, number, number])[];
      }

      const EXAMPLES: readonly Example[] = [
        {
          description: 'infinite input',
          input: {
            input: infinite(1),
            other1: [11],
            other2: [21],
          },
          expected: [
            [1, 11, 21],
            [2, 11, 21],
            [3, 11, 21],
          ],
        },
        {
          description: "infinite first 'other' iterable",
          input: {
            input: [1],
            other1: infinite(11),
            other2: [21],
          },
          expected: [
            [1, 11, 21],
            [1, 12, 21],
            [1, 13, 21],
          ],
        },
        {
          description: "infinite second 'other' iterable",
          input: {
            input: [1],
            other1: [11],
            other2: infinite(21),
          },
          expected: [
            [1, 11, 21],
            [1, 11, 22],
            [1, 11, 23],
          ],
        },
        {
          description: 'infinite all iterables',
          input: {
            input: infinite(1),
            other1: infinite(11),
            other2: infinite(21),
          },
          expected: [
            [1, 11, 21],
            [1, 11, 22],
            [1, 11, 23],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(example.description, () => {
          const actual = getArrayResult(
            example.input.input,
            compose(
              crossWith(example.input.other1, example.input.other2),
              take(3),
            ),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });
  });
});
