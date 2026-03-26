import type { Set } from "../../../../core/collections/sets/set";
import { StrategyBoundedSortedLinkedList } from "../../lists/strategy-bounded-sorted-linked-list/strategy-bounded-sorted-linked-list";
import { DuplicateElementError } from "../../../../core/errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../../core/errors/element-not-found-error";
import type { OrderComparator } from "../../../order-comparators/order-comparator";
import type { EqualityComparator } from "../../../equality-comparators/equality-comparator";
import { ComparatorInferenceError } from "../../../errors/comparator-inference-error";
import { inferOrderComparator } from "../../../order-comparators/order-comparator-inferrer";
import { inferEqualityComparator } from "../../../equality-comparators/equality-comparator-inferrer";

export class StrategyBoundedSortedLinkedSet<T> implements Set<T> {
  private readonly values: StrategyBoundedSortedLinkedList<T>;

  constructor(
    capacity: number,
    comparator: OrderComparator<T> | undefined = undefined,
    initialValues: T[] = [],
    equalityComparator: EqualityComparator<T> | undefined = undefined,
  ) {
    let resolvedComparator = comparator;
    let resolvedEqualityComparator = equalityComparator;

    if (resolvedComparator === undefined && initialValues.length === 0) {
      throw new ComparatorInferenceError(
        "Cannot create StrategyBoundedSortedLinkedSet without a comparator or initial elements",
      );
    }

    if (resolvedComparator === undefined && initialValues.length > 0) {
      resolvedComparator = inferOrderComparator(initialValues[0]);
    }

    if (resolvedEqualityComparator === undefined && initialValues.length > 0) {
      resolvedEqualityComparator = inferEqualityComparator(initialValues[0]);
    }

    this.values = new StrategyBoundedSortedLinkedList<T>(
      capacity,
      resolvedComparator,
      [],
      resolvedEqualityComparator,
    );

    for (const value of initialValues) {
      this.add(value);
    }
  }

  size(): number {
    return this.values.size();
  }

  isEmpty(): boolean {
    return this.values.isEmpty();
  }

  contains(value: T): boolean {
    return this.values.contains(value);
  }

  add(value: T): void {
    if (this.contains(value)) {
      throw new DuplicateElementError(
        `Element '${String(value)}' already exists in StrategyBoundedSortedLinkedSet`,
      );
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.values.remove(value)) {
      throw new ElementNotFoundError(
        `Element '${String(value)}' not found in StrategyBoundedSortedLinkedSet`,
      );
    }
  }

  clear(): void {
    this.values.clear();
  }

  toArray(): T[] {
    return this.values.toArray();
  }
}