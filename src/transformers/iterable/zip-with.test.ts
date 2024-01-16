import { describe, expect, it } from '@jest/globals';
import { zipWith } from './zip-with';
import { getArrayResult } from '../_test';

describe('zip-with', () => {
  describe('zipWith()', () => {
    describe('valid - 2', () => {
      interface Example {
        readonly input: {
          readonly input: readonly string[];
          readonly other: readonly string[];
        };
        readonly expected: readonly (readonly [string, string])[];
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
            input: ['a'],
            other: [''],
          },
          expected: [['a', '']],
        },
        {
          input: {
            input: [''],
            other: ['1'],
          },
          expected: [['', '1']],
        },
        {
          input: {
            input: ['a'],
            other: ['1'],
          },
          expected: [['a', '1']],
        },
        {
          input: {
            input: ['', ''],
            other: ['', ''],
          },
          expected: [
            ['', ''],
            ['', ''],
          ],
        },
        {
          input: {
            input: ['a', 'b'],
            other: ['1', '2'],
          },
          expected: [
            ['a', '1'],
            ['b', '2'],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            zipWith(example.input.other),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('valid - 3', () => {
      interface Example {
        readonly input: {
          readonly input: readonly string[];
          readonly other1: readonly string[];
          readonly other2: readonly string[];
        };
        readonly expected: readonly (readonly [string, string, string])[];
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
            input: ['a'],
            other1: [''],
            other2: [''],
          },
          expected: [['a', '', '']],
        },
        {
          input: {
            input: [''],
            other1: ['1'],
            other2: ['x'],
          },
          expected: [['', '1', 'x']],
        },
        {
          input: {
            input: ['a'],
            other1: ['1'],
            other2: ['x'],
          },
          expected: [['a', '1', 'x']],
        },
        {
          input: {
            input: ['', ''],
            other1: ['', ''],
            other2: ['', ''],
          },
          expected: [
            ['', '', ''],
            ['', '', ''],
          ],
        },
        {
          input: {
            input: ['a', 'b'],
            other1: ['1', '2'],
            other2: ['x', 'y'],
          },
          expected: [
            ['a', '1', 'x'],
            ['b', '2', 'y'],
          ],
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            zipWith(example.input.other1, example.input.other2),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('valid - 3 - different types', () => {
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
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = getArrayResult(
            example.input.input,
            zipWith(example.input.other1, example.input.other2),
          );
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('throws - 2', () => {
      interface Example {
        readonly input: {
          readonly input: readonly string[];
          readonly other: readonly string[];
        };
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            input: ['a'],
            other: [],
          },
        },
        {
          input: {
            input: [],
            other: ['1'],
          },
        },
        {
          input: {
            input: ['a'],
            other: ['1', '2'],
          },
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const call = (): readonly (readonly [string, string])[] =>
            getArrayResult(example.input.input, zipWith(example.input.other));
          expect(call).toThrow();
        });
      }
    });

    describe('throws - 3', () => {
      interface Example {
        readonly input: {
          readonly input: readonly string[];
          readonly other1: readonly string[];
          readonly other2: readonly string[];
        };
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: {
            input: ['a'],
            other1: [],
            other2: [],
          },
        },
        {
          input: {
            input: [],
            other1: [],
            other2: ['x'],
          },
        },
        {
          input: {
            input: ['a'],
            other1: ['1', '2'],
            other2: ['x', 'y'],
          },
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const call = (): readonly (readonly [string, string, string])[] =>
            getArrayResult(
              example.input.input,
              zipWith(example.input.other1, example.input.other2),
            );
          expect(call).toThrow();
        });
      }
    });
  });
});
