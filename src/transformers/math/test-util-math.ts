import { Fn1 } from '@gmjs/generic-types';
import { expect, it } from '@jest/globals';
import { getArrayResult } from '../test-util';

export interface MathExampleItem {
  readonly value: number;
}

export type MathItemType = number | MathExampleItem;

export interface MathExampleBase<T extends MathItemType> {
  readonly input: readonly T[];
}

export interface MathExampleSimple<T extends MathItemType>
  extends MathExampleBase<T> {
  readonly expected: number;
}

export interface MathExampleCum<T extends MathItemType>
  extends MathExampleBase<T> {
  readonly expected: readonly number[];
}

export const VALUE_SELECTOR = (item: MathExampleItem): number => item.value;

export function toObjectExamplesSimple(
  examples: readonly MathExampleSimple<number>[],
): readonly MathExampleSimple<MathExampleItem>[] {
  return examples.map((example) => ({
    input: example.input.map((item) => ({ value: item })),
    expected: example.expected,
  }));
}

export function toObjectExamplesCum(
  examples: readonly MathExampleCum<number>[],
): readonly MathExampleCum<MathExampleItem>[] {
  return examples.map((example) => ({
    input: example.input.map((item) => ({ value: item })),
    expected: example.expected,
  }));
}

export function testSimpleExamples<T extends MathItemType>(
  examples: readonly MathExampleSimple<T>[],
  transformer: Fn1<Iterable<T>, number>,
): void {
  for (const example of examples) {
    it(JSON.stringify(example), () => {
      const actual = transformer(example.input);
      expect(actual).toEqual(example.expected);
    });
  }
}

export function testCumExamples<T extends MathItemType>(
  examples: readonly MathExampleCum<T>[],
  transformer: Fn1<Iterable<T>, Iterable<number>>,
): void {
  for (const example of examples) {
    it(JSON.stringify(example), () => {
      const actual = getArrayResult(example.input, transformer);
      expect(actual).toEqual(example.expected);
    });
  }
}
