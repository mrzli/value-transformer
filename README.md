# Value transformers

This project implements value transformers, or more precisely, value transformer creators.

Value transformer is simply a function of one parameter (input), returning a value (output).

A value transformer creator is a function returning a value transformer. It can have zero, one or more parameters which can be used to define the resulting value transformer behavior.

For example, we can think of the following function as a value transformer:

```ts
function add2Transformer(v: number): number {
  return v + 2;
}
```

And we can think of the following function as a value transformer creator:

```ts
function addN(n: number): (v: number) => number {
  return (v: number) => v + n;
}
```

Value transformers can be - and often are - generator functions, which for example allow us to transform infinite sequences of values.

Each function callable in this project is actually transformer creator, meaning a function returning a value transformer.

These transformer creators are very similar to Observable operators. They are more straighforward to use - they just transform simple values (including infinite sequences), but they are not as powerful as Observables. You cannot use these transformers to handle asynchronous values or event streams.

## Installation

```bash
npm install --save @gmjs/value-transformers
```

## Usage

### Notes on Usage and Examples

Transformers that produce sequences of values almost always return iterables. You can use the spread operator to convert them to arrays, or you can use the `toArray()` transformer. This is the reason why you will see the `console.log([...output])` pattern in most examples below.

Instead of spread operator, you could use something like this:

```ts
import { applyFn } from '@gmjs/apply-function';
import { compose } from '@gmjs/compose-function';
import { map, toArray } from '@gmjs/value-transformers';

const input = [1, 2, 3];
const output = applyFn(
  input,
  compose(
    map((v: number) => v + 2),
    toArray(),
  ),
);
console.log(output); // no need for spread operator
// [3, 4, 5]
```

The above is obviously a contrived example (as are most in this document). In reality, for a simple mapping like above you would probably do something like this:

```ts
import { map } from '@gmjs/value-transformers';

const input = [1, 2, 3];
const output = input.map((v: number) => v + 2);
console.log(output); // this is a regular javascript `map` method, no need for a spread operator
// [3, 4, 5]
```

However, for more complicated transformations, it will be much easier to use transformers.

### Usage Examples

Transformers can be used directly, like this:

```ts
import { map } from '@gmjs/value-transformers';

const input = [1, 2, 3];
const output = map((v: number) => v + 2)(input);
// spread operator is used to convert iterable to array, you can also use toArray() transformer
console.log([...output]);
// [3, 4, 5]
```

Iterable transformers

You can store the created transformer in a variable and use it later:

```ts
import { map } from '@gmjs/value-transformers';

const add2 = map((v: number) => v + 2);
const input = [1, 2, 3];
const output = add2(input);
console.log([...output]);
// [3, 4, 5]
```

You may often want to use transformer with the `applyFn`, because it feels more natural, as if the input value flows through the transformer pipe:

```ts
import { applyFn } from '@gmjs/apply-function';
import { map } from '@gmjs/value-transformers';

const input = [1, 2, 3];
const output = applyFn(
  input,
  map((v: number) => v + 2),
);
console.log([...output]);
// [3, 4, 5]
```

You can also use the `applyFn` with the `compose` function, which allows you to compose multiple transformers:

```ts
import { applyFn } from '@gmjs/apply-function';
import { compose } from '@gmjs/compose-function';
import { map, filter } from '@gmjs/value-transformers';

const input = [1, 2, 3, 4, 5];
const output = applyFn(
  input,
  compose(
    map((v: number) => v + 2),
    filter((v: number) => v % 2 === 0),
  ),
);
console.log([...output]);
// [4, 6]
```

## API

I will use the expressions 'transformer creator' and 'transformer' interchangeably. The former is more precise, but the latter is shorter and more convenient. Most (or all) of API functions are actually transformer creators.

### Iterable

This section will describe the transformers which work with iterables. Anything that is an iterable can be used as an input for these transformers.

Multiple predefined types in JavaScript are iterables, for example arrays, maps, set and strings. You can also create your own iterables.

You can also define your own iterables. They can be finite, but they can also be infinite sequences, like this:

```ts
const nonNegativeNumbers = function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
};

const input = nonNegativeNumbers();
const output = applyFn(
  input,
  compose(
    map((v: number) => v * v),
    filter((v: number) => v % 2 === 0),
    take(5),
  ),
);
console.log([...output]);
// [0, 4, 16, 36, 64]
```

Some transformers will need to evaluate the whole input iterable before they can produce the output, so they will not work with infinite sequences. Examples are `reverse` and `sort` transformers.

#### `concat`

Concatenates multiple iterables into one.

```ts
const input = [1, 2, 3];
const other = [4, 5, 6];
const output = applyFn(input, concat(other));
console.log([...output]);
// [1, 2, 3, 4, 5, 6]
```

#### `count`

Counts the number of items in the input iterable which satisfy the `predicate` parameter.

`predicate` parameter is optional. If it is not provided, the `count` transformer will simply return the total number of items in the input iterable.

```ts
const input = [1, 2, 3, 4, 5];
const output = applyFn(
  input,
  count((v: number) => v % 2 === 0),
);
console.log(output);
2;
```

#### `crossWith`

Creates a cross product (or a [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)) of the input iterable and one or more iterables passed to `crossWith` transformer.

The result is iterable of tuples, where tuple will have one element more than the number of iterables passed to `crossWith` transformer.

The first element of the tuple will be an item from the input iterable, and the rest of the elements will be items from the other iterables, in the order they were passed to `crossWith` transformer.

When building the result, the `crossWith` transformer will first try to exhaust the rightmost iterable passed to it, then the next one to the left, and so on, until it exhausts the input iterable.

```ts
const input = [1, 2];
const output = applyFn(input, crossWith(['a', 'b']));
console.log([...output]);
// [
//   [1, 'a'],
//   [1, 'b'],
//   [2, 'a'],
//   [2, 'b'],
// ]
```

```ts
const input = [1, 2];
const output = applyFn(input, zipWith(['a', 'b'], [true, false]));
console.log([...output]);
// [
//   [1, 'a', true],
//   [1, 'a', false],
//   [1, 'b', true],
//   [1, 'b', false],
//   [2, 'a', true],
//   [2, 'a', false],
//   [2, 'b', true],
//   [2, 'b', false],
// ]
```

If any iterable is empty, the resulting iterable will also be empty.

```ts
const input = [1, 2];
const output = applyFn(input, crossWith([]));
console.log([...output]);
// []
```

```ts
const input = [];
const output = applyFn(input, crossWith(['a', 'b']));
console.log([...output]);
// []
```

It is possible to pass in one or more infinite iterables into any position of the `crossWith` transformer, or have the input iterable be infinite. The resulting iterable would also be infinite, and can be later limited using for example `take` transformer.

Any iterable left of the rightmost infinite iterable will only ever use its first element since the infinite iterable will never be exhausted.

```ts
const infinite = function* (): Generator<number> {
  let i = 0;
  while (true) {
    yield i++;
  }
};

const input = [1, 2, 3];
const output = applyFn(input, crossWith(infinite(), ['a', 'b']), take(5));
console.log([...output]);
// [
//   [1, 0, 'a'],
//   [1, 0, 'b'],
//   [1, 1, 'a'],
//   [1, 1, 'b'],
//   [1, 2, 'a'],
// ]
```

#### `distinct`

Filters out duplicate values from the input iterable.

Works out of the box if iterable items are primitive values like numbers, strings or booleans.

```ts
const input = [1, 1, 3, 1, 2, 3];
const output = applyFn(input, distinct());
console.log([...output]);
// [1, 3, 2]
```

If the iterable items are reference types, like objects or array, they will by default be compared by reference. This is probably something you don't want in most cases.

To help with the above, you can use `distinctBy` parameter. It is a function that takes in an iterable item and returns a value that will be used for comparison. When an iterable item is an object, you may use `distinctBy` to return a value of a property that will uniquely identify the object, or to calculate some unique hash.

```ts
const input = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
];

// no distinctBy is used
const output = applyFn(input, distinct());
console.log([...output]);
// [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
//   { id: 1, name: 'John' },
//   { id: 3, name: 'Jack' },
//   { id: 2, name: 'Jane' },
// ]
```

```ts
const input = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
];

// distinctBy is used
const output = applyFn(
  input,
  distinct((v) => v.id),
);
console.log([...output]);
// [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
//   { id: 3, name: 'Jack' },
// ]
```

```ts
const input = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Doe' },
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jack', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Doe' },
];

// distinctBy is used
const output = applyFn(
  input,
  distinct((v) => `${v.firstName}#${v.lastName}`),
);
console.log([...output]);
// [
//   { firstName: 'John', lastName: 'Doe' },
//   { firstName: 'Jane', lastName: 'Doe' },
//   { firstName: 'Jack', lastName: 'Doe' },
// ]
```

You are not limited to the use described above. You can use `distinctBy` to return any value that will then be used to determine whether an item has already 'occurred' or not.

For example, you can use `distinctBy` to force the `distinct` transformer creator to treat all integers in [0, 9] range as the same value, all integers in [10, 19] range as the same value, and so on.

The above would cause the `distinct` transformer to take only one value from each range, the value that occurred first in the input iterable.

```ts
const input = [1, 2, 22, 3, 14, 12, 21, 23, 5, 13];
const output = applyFn(
  input,
  distinct((v) => Math.floor(v / 10)),
);
console.log([...output]);
// [1, 22, 14]
```

#### `duplicates`

Returns just the duplicate values from the input iterable.

```ts
const input = [1, 3, 3, 2, 1];
const output = applyFn(input, duplicates());
console.log([...output]);
// [3, 1]
```

If there are more than 2 items with the same value, the `duplicates` transformer will return more than one duplicate. To be exact, if `n` is the number of items with a specific value, the `duplicates` transformer will return `n - 1` values, all except the first occurence in the original iterable.

In other words, the resulting iterable of original iterable duplicates can itself still contain duplicates.

In yet other words, the resulting iterable will contain exacty one less occurence of any distinct value from the original iterable. If the original iterable contained 3 `1`s, 4 `2`s and 1 `3`, the resulting iterable will contain 2 `1`s, 3 `2`s and no `3`.

```ts
const input = [1, 2, 1, 3, 1, 3, 1];
const output = applyFn(input, duplicates());
console.log([...output]);
// [1, 1, 3, 1]
```

If you want to get rid of duplicates in the resulting iterable, you can use `distinct` transformer.

```ts
const input = [1, 2, 1, 3, 1, 3, 1];
const output = applyFn(input, duplicates(), distinct());
console.log([...output]);
// [1, 3]
```

`duplicates` transformer also accepts `distinctBy` parameter, which works exactly the same way as in `distinct` transformer.

```ts
const input = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
];

const output = applyFn(
  input,
  duplicates((v) => v.id),
);
console.log([...output]);
// [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
// ]
```

#### `filter`

Filters the input iterable using predicate function provided by `predicate` parameter.

```ts
const input = [1, 2, 3, 4, 5, 6];
const output = applyFn(
  input,
  filter((v: number) => v % 2 === 0),
);
console.log([...output]);
// [2, 4, 6]
```

#### `filterOutNullish`

Filters out nullish values from the input iterable.

```ts
const input: readonly (number | null | undefined)[] = [1, 2, null, 3, undefined, 4, 5];

const output = applyFn(input, filterOutNullish());
console.log([...output]);
// [1, 2, 3, 4, 5]
// type of 'output' is readonly number[]
```

#### `filterWithGuard`

Filters the input iterable using predicate function provided by `predicate` parameter.

Works exactly the same way as filter, but expect a guard function as a predicate, and will narrow the type of the resulting iterable.

```ts
const input: readonly (number | string)[] = [1, 'v1', 2, 'v2', 3, 'v3', 4, 'v4', 5, 'v5', 6, 'v6'];
const output = applyFn(
  input,
  filterWithGuard((item): item is number => typeof item === 'number' && item % 2 === 0),
);
console.log([...output]);
// [2, 4, 6]
// type of 'output' is readonly number[]
```

Naturally, for readability, you can extract the predicate function to a variable or use a function declaration. Here is an example with predicate being stored in a variable:

```ts
const input: readonly (number | string)[] = [1, 'v1', 2, 'v2', 3, 'v3', 4, 'v4', 5, 'v5', 6, 'v6'];

const predicate = (item: number | string): item is number => typeof item === 'number' && item % 2 === 0;

const output = applyFn(input, filterWithGuard(predicate));
console.log([...output]);
// [2, 4, 6]
// type of 'output' is readonly number[]
```

#### `first`

Gets the first item of the input iterable. If the input iterable is empty, an error will be thrown.

```ts
const input = [1, 2, 3];
const output = applyFn(input, first());
console.log(output);
// 1
```

#### `flatMap`

Maps each value of the input iterable using mapper function provided by `mapper` parameter, and then flattens the result.

Result of the `mapper` function must be iterable.

```ts
const input = [1, 2, 3];
const output = applyFn(
  input,
  flatMap((v: number) => [`${v}a`, `${v}b`]),
);
console.log([...output]);
// ['1a', '1b', '2a', '2b', '3a', '3b']
```

#### `flatten`

Flattens the input iterable. The input iterable must be iterable of iterables.

```ts
const input = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const output = applyFn(input, flatten());
console.log([...output]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### `groupBy`

Groups the input iterable items into map entries, using the `keySelector` function to determine the key of each item. Under each key, items are collected into an array.

```ts
const input = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'Jack' },
  { id: 3, name: 'Jill' },
  { id: 2, name: 'Joe' },
];
const output = applyFn(
  input,
  groupBy((v) => v.id),
);
console.log([...output]);
// Map(3) {
//   1, [ { id: 1, name: 'John' }, { id: 1, name: 'Jack' } ],
//   2, [ { id: 2, name: 'Jane' }, { id: 2, name: 'Joe' } ],
//   3, [ { id: 3, name: 'Jill' } ]
// }
```

#### `indexes`

Transformer that returns just the indexes of the input iterable.

```ts
const input = [1, 2, 3];
const output = applyFn(input, indexes());
console.log([...output]);
// [0, 1, 2]
```

#### `keys`

Returns keys of iterable items. Input iterable items must be in the form of a key-value tuple, e.g. `[key, value]`.

This will work with plain tuples, `Map` and `Object.entries()`.

```ts
const input = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const output = applyFn(input, keys());
console.log([...output]);
// ['a', 'b', 'c']
```

```ts
const input = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const output = applyFn(input, keys());
console.log([...output]);
// ['a', 'b', 'c']
```

```ts
const input = {
  a: 1,
  b: 2,
  c: 3,
};
const output = applyFn(Object.entries(input), keys());
console.log([...output]);
// ['a', 'b', 'c']
```

#### `last`

Gets the last item of the input iterable. If the input iterable is empty, an error will be thrown.

```ts
const input = [1, 2, 3];
const output = applyFn(input, last());
console.log(output);
// 3
```

#### `map`

A simple mapping function. Transforms each value of the input iterable using mapper function provided by `mapper` parameter.

```ts
const input = [1, 2, 3];
const output = applyFn(
  input,
  map((v: number) => v * v),
);
console.log([...output]);
// [1, 4, 9]
```

#### `reverse`

Reverses the input iterable.

```ts
const input = [1, 2, 3, 4, 5];
const output = applyFn(input, reverse());
console.log([...output]);
// [5, 4, 3, 2, 1]
```

#### `skip`

Skips first `count` values from the input iterable.

```ts
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const output = applyFn(input, skip(5));
console.log([...output]);
// [6, 7, 8, 9, 10]
```

#### `sort`

Sorts the input iterable using comparator function provided by `compare` parameter.

```ts
const input = [3, 1, 2, 5, 4];
const output = applyFn(
  input,
  sort((a: number, b: number) => a - b),
);
console.log([...output]);
// [1, 2, 3, 4, 5]
```

#### `take`

Takes first `count` values from the input iterable.

```ts
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const output = applyFn(input, take(5));
console.log([...output]);
// [1, 2, 3, 4, 5]
```

#### `tapPerItem`

Runs the function specified by `action` parameter for each item of the input iterable, and then returns the input iterable unchanged.

This can be used for logging iterable items for example, or performing any other side effects.

```ts
const input = [1, 2, 3, 4, 5];
const output = applyFn(
  input,
  tapPerItem((v: number) => {
    console.log(`Value: ${v}`);
  }),
);
// Value 1
// Value 2
// Value 3
// Value 4
// Value 5
console.log([...output]);
// [1, 2, 3, 4, 5]
```

#### `toArray`

Simply spreads the input iterable into an array.

```ts
const generator = function* (): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
};

const output = applyFn(generator(), toArray());
console.log(output);
// [1, 2, 3]
```

#### `toMap`

Converts an iterable of key-value tuples into a `Map`.

```ts
const input = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const output = applyFn(input, toMap());
console.log(output);
// Map(3) {
//   'a': 1,
//   'b': 2,
//   'c': 3
// }
```

#### `toMapBy`

Converts an iterable to a map, where `keySelector` function to determine the key of each item, and the item itself is the value.

Similar to `groupBy` transformer, but the resulting map will contain only one item per key, not an array of items.

If there are multiple items with the same key, the last item will overwrite the previous ones, and will be the one present in the resulting map.

```ts
const input = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'Jack' },
  { id: 3, name: 'Jill' },
  { id: 2, name: 'Joe' },
];
const output = applyFn(
  input,
  toMapBy((v) => v.id),
);
console.log(output);
// Map(3) {
//   1, { id: 1, name: 'Jack' },
//   2, { id: 2, name: 'Joe' },
//   3, { id: 3, name: 'Jill' }
// }
```

#### `toSet`

Converts an iterable into a `Set`.

```ts
const input = [1, 2, 3];
const output = applyFn(input, toSet());
console.log(output);
// Set(3) { 1, 2, 3 }
```

#### `values`

Returns values of iterable items. Input iterable items must be in the form of a key-value tuple, e.g. `[key, value]`.

This will work with plain tuples, `Map` and `Object.entries()`.

```ts
const input = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const output = applyFn(input, values());
console.log([...output]);
// [1, 2, 3]
```

#### `zipWith`

Zips the input iterable with one or more other iterables. The result is iterable of tuples, where tuple will have one element more than the number of iterables passed to `zipWith` transformer.

The first element of the tuple will be an item from the input iterable, and the rest of the elements will be items from the other iterables, in the order they were passed to `zipWith` transformer.

Tuple types are inferred from the type of item of the input iterable and the types of items of the other iterables.

```ts
const input = [1, 2, 3];
const output = applyFn(input, zipWith(['a', 'b', 'c']));
console.log([...output]);
// [
//   [1, 'a'],
//   [2, 'b'],
//   [3, 'c'],
// ]
```

```ts
const input = [1, 2, 3];
const output = applyFn(input, zipWith(['a', 'b', 'c'], [true, false, true]));
console.log([...output]);
// [
//   [1, 'a', true],
//   [2, 'b', false],
//   [3, 'c', true],
// ]
```

Iterable must be exhaused at the same time (or not at all). If one of the iterables is exhausted before the others, an error will be thrown.

In simpler terms, if we assume all iterables are arrays, all arrays must have the same length. All arrays passed to `zipWith` transformer must have the same length, and that length must be the same as the length of the input array.

```ts
const input = [1, 2, 3];
// the following will throw an error
const output = applyFn(input, zipWith(['a', 'b']));
```

### Single

This section will describe transformers used for transforming single (i.e. non-iterable) values.

#### `tap`

Runs the function specified by `action` parameter for the input value, and then returns the input value unchanged.

This can be used for logging the input value for example, or performing any other side effects.

```ts
const input = 1;
const output = applyFn(
  input,
  tap((v: number) => {
    console.log(`Value: ${v}`);
  }),
);
// Value 1
console.log(output);
// 1
```

### Math

This section will describe transformers used for performing mathematical or statistical operations on iterables.

#### `sum`

Calculates the sum of all items of the numeric input iterable.

```ts
const input = [1, 2, 3, 4, 5];
const output = applyFn(input, sum());
console.log(output);
// 15
```

#### `sumBy`

Calculates the sum of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
const output = applyFn(
  input,
  sumBy((v: { value: number }) => v.value),
);
console.log(output);
// 15
```

#### `cumSum`

Calculates the cumulative sum list of all items of the numeric input iterable.

```ts
const input = [1, 2, 3, 4, 5];
const output = applyFn(input, cumSum());
console.log([...output]);
// [1, 3, 6, 10, 15]
```

#### `cumSumBy`

Calculates the cumulative sum list of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
const output = applyFn(
  input,
  cumSumBy((v: { value: number }) => v.value),
);
console.log([...output]);
// [1, 3, 6, 10, 15]
```

#### `min`

Calculates the minimum value of all items of the numeric input iterable.

```ts
const input = [2, 3, 1, 5, 4];
const output = applyFn(input, min());
console.log(output);
// 1
```

#### `minBy`

Calculates the minimum value of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 5 }, { value: 4 }];
const output = applyFn(
  input,
  minBy((v: { value: number }) => v.value),
);
console.log(output);
// 1
```

#### `cumMin`

Calculates the cumulative minimum list of all items of the numeric input iterable.

```ts
const input = [2, 3, 1, 5, 4];
const output = applyFn(input, cumMin());
console.log([...output]);
// [2, 2, 1, 1, 1]
```

#### `cumMinBy`

Calculates the cumulative minimum list of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 5 }, { value: 4 }];
const output = applyFn(
  input,
  cumMinBy((v: { value: number }) => v.value),
);
console.log([...output]);
// [2, 2, 1, 1, 1]
```

#### `max`

Calculates the maximum value of all items of the numeric input iterable.

```ts
const input = [2, 3, 1, 5, 4];
const output = applyFn(input, max());
console.log(output);
// 5
```

#### `maxBy`

Calculates the maximum value of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 5 }, { value: 4 }];
const output = applyFn(
  input,
  maxBy((v: { value: number }) => v.value),
);
console.log(output);
// 5
```

#### `cumMax`

Calculates the cumulative maximum list of all items of the numeric input iterable.

```ts
const input = [2, 3, 1, 5, 4];
const output = applyFn(input, cumMax());
console.log(output);
// [2, 3, 3, 5, 5]
```

#### `cumMaxBy`

Calculates the cumulative maximum list of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 5 }, { value: 4 }];
const output = applyFn(
  input,
  cumMaxBy((v: { value: number }) => v.value),
);
console.log([...output]);
// [2, 3, 3, 5, 5]
```

#### `mean`

Calculates the mean value of all items of the numeric input iterable.

```ts
const input = [2, 3, 1, 5, 4];
const output = applyFn(input, mean());
console.log(output);
// 3
```

#### `meanBy`

Calculates the mean value of all items of the input iterable, using the function specified by `selector` parameter to extract the numeric value from each item.

```ts
const input = [{ value: 2 }, { value: 3 }, { value: 1 }, { value: 5 }, { value: 4 }];
const output = applyFn(
  input,
  meanBy((v: { value: number }) => v.value),
);
console.log(output);
// 3
```
