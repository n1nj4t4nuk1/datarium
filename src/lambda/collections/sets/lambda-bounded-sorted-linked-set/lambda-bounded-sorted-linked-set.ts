import { StrategyBoundedSortedLinkedSet } from "../../../../strategy/collections/sets/strategy-bounded-sorted-linked-set/strategy-bounded-sorted-linked-set";
import type { LambdaComparator } from "../../../lambda-comparator.ts";

export class LambdaBoundedSortedLinkedSet<T> {
  private readonly delegate: StrategyBoundedSortedLinkedSet<T>;

  constructor(
    capacity: number,
    comparator: LambdaComparator<T> | undefined = undefined,
    initialValues: T[] = [],
  ) {
    const orderComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): number => comparator(left, right);

    const equalityComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): boolean => comparator(left, right) === 0;

    this.delegate = new StrategyBoundedSortedLinkedSet<T>(
      capacity,
      orderComparator,
      initialValues,
      equalityComparator,
    );
  }

  size(): number {
    return this.delegate.size();
  }

  isEmpty(): boolean {
    return this.delegate.isEmpty();
  }

  contains(value: T): boolean {
    return this.delegate.contains(value);
  }

  add(value: T): void {
    this.delegate.add(value);
  }

  remove(value: T): void {
    this.delegate.remove(value);
  }

  clear(): void {
    this.delegate.clear();
  }

  toArray(): T[] {
    return this.delegate.toArray();
  }
}
