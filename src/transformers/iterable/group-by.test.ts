import { describe, expect, it } from '@jest/globals';
import { groupBy } from './group-by';
import { getArrayResult } from '../test-util';

describe('group-by', () => {
  describe('groupBy()', () => {
    interface ExampleItem {
      readonly key: string;
      readonly value: readonly number[];
    }

    interface Example {
      readonly input: readonly ExampleItem[];
      readonly expected: readonly [string, readonly ExampleItem[]][];
    }

    const KEY_SELECTOR = (item: ExampleItem): string => item.key;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [{ key: 'k1', value: [] }],
        expected: [['k1', [{ key: 'k1', value: [] }]]],
      },
      {
        input: [
          { key: 'k1', value: [] },
          { key: 'k2', value: [] },
        ],
        expected: [
          ['k1', [{ key: 'k1', value: [] }]],
          ['k2', [{ key: 'k2', value: [] }]],
        ],
      },
      {
        input: [
          { key: 'k1', value: [0] },
          { key: 'k2', value: [1] },
        ],
        expected: [
          ['k1', [{ key: 'k1', value: [0] }]],
          ['k2', [{ key: 'k2', value: [1] }]],
        ],
      },
      {
        input: [
          { key: 'k1', value: [] },
          { key: 'k2', value: [] },
          { key: 'k1', value: [] },
        ],
        expected: [
          [
            'k1',
            [
              { key: 'k1', value: [] },
              { key: 'k1', value: [] },
            ],
          ],
          ['k2', [{ key: 'k2', value: [] }]],
        ],
      },
      {
        input: [
          { key: 'k1', value: [1] },
          { key: 'k2', value: [2] },
          { key: 'k1', value: [3] },
          { key: 'k2', value: [4] },
        ],
        expected: [
          [
            'k1',
            [
              { key: 'k1', value: [1] },
              { key: 'k1', value: [3] },
            ],
          ],
          [
            'k2',
            [
              { key: 'k2', value: [2] },
              { key: 'k2', value: [4] },
            ],
          ],
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(example.input, groupBy(KEY_SELECTOR));
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
