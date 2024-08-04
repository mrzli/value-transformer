import { describe, expect, it } from '@jest/globals';
import { toObject } from './to-object';

describe('to-object', () => {
  describe('toObject()', () => {
    type ExampleItem = readonly [string, number];

    interface Example {
      readonly input: readonly ExampleItem[];
      readonly expected: Readonly<Record<string, number>>;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: {},
      },
      {
        input: [['0', 0]],
        expected: { '0': 0 },
      },
      {
        input: [['1', 1]],
        expected: { '1': 1 },
      },
      {
        input: [
          ['1', 1],
          ['2', 2],
        ],
        expected: {
          '1': 1,
          '2': 2,
        },
      },
      {
        input: [
          ['1', 1],
          ['2', 2],
          ['1', 1],
          ['3', 3],
        ],
        expected: {
          '1': 1,
          '2': 2,
          '3': 3,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = toObject()(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
