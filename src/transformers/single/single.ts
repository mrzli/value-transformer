import { NotIterable, Fn1 } from '@gmjs/generic-types';

export function tap<T>(
  action: (input: NotIterable<T>) => void,
): Fn1<NotIterable<T>, NotIterable<T>> {
  return (input: NotIterable<T>): NotIterable<T> => {
    action(input);
    return input;
  };
}

export function conditionalConvert<T>(
  condition: ((input: T) => boolean) | boolean,
  convert: (input: T) => T,
): Fn1<T, T> {
  return (input: T): T => {
    const conditionValue =
      condition instanceof Function ? condition(input) : condition;
    return conditionValue ? convert(input) : input;
  };
}
