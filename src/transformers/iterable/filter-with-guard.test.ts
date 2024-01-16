import { describe, expect, it } from '@jest/globals';
import { filterWithGuard } from './filter-with-guard';
import { getArrayResult } from '../_test';

describe('filter-with-guard', () => {
  describe('filterWithGuard()', () => {
    type Input = number | string;

    interface Example {
      readonly input: readonly Input[];
      readonly expected: readonly number[];
    }

    const PREDICATE = (item: Input): item is number =>
      typeof item === 'number' && item % 2 === 0;

    const EXAMPLES: readonly Example[] = [
      {
        input: [],
        expected: [],
      },
      {
        input: [1],
        expected: [],
      },
      {
        input: [1, 'v1'],
        expected: [],
      },
      {
        input: [1, 'v1', 2, 'v2'],
        expected: [2],
      },
      {
        input: [1, 2, 3, 4, 5],
        expected: [2, 4],
      },
      {
        input: [1, 'v1', 2, 'v2', 3, 'v3', 4, 'v4', 5, 'v5'],
        expected: [2, 4],
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getArrayResult(
          example.input,
          filterWithGuard(PREDICATE),
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
