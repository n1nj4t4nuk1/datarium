import type { Set } from "../../../core/collections/set";
import { StrategySortedArrayList } from "../strategy-sorted-array-list/strategy-sorted-array-list";
import { DuplicateElementError } from "../../../core/errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../core/errors/element-not-found-error";
import type { OrderComparator } from "../../order-comparators/order-comparator";
import type { EqualityComparator } from "../../equality-comparators/equality-comparator";
import { ComparatorInferenceError } from "../../errors/comparator-inference-error";
import { inferOrderComparator } from "../../order-comparators/order-comparator-inferrer";
import { inferEqualityComparator } from "../../equality-comparators/equality-comparator-inferrer";

export class StrategySortedArraySet<T> implements Set<T> {
  private readonly values: StrategySortedArrayList<T>;

  constructor(
    comparator: OrderComparator<T> | undefined = undefined,
    initialValues: T[] = [],
    equalityComparator: EqualityComparator<T> | undefined = undefined,
  ) {
    // If comparator is undefined, infer it from the first element
    let resolvedComparator = comparator;
    let resolvedEqualityComparator = equalityComparator;

    if (resolvedComparator === undefined && initialValues.length === 0) {
      throw new ComparatorInferenceError(
        "Cannot create StrategySortedArraySet without a comparator or initial elements",
      );
    }

    if (resolvedComparator === undefined && initialValues.length > 0) {
      resolvedComparator = inferOrderComparator(initialValues[0]);
    }

    if (resolvedEqualityComparator === undefined && initialValues.length > 0) {
      resolvedEqualityComparator = inferEqualityComparator(initialValues[0]);
    }

    this.values = new StrategySortedArrayList<T>(
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
        `Element '${String(value)}' already exists in StrategySortedArraySet`,
      );
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.values.remove(value)) {
      throw new ElementNotFoundError(
        `Element '${String(value)}' not found in StrategySortedArraySet`,
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
