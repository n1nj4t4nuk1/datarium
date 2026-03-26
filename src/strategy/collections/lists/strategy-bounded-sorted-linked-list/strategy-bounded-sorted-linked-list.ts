import { BoundedLinkedList } from "../../../../core/collections/lists/bounded-linked-list/bounded-linked-list";
import { ComparatorInferenceError } from "../../../errors/comparator-inference-error";
import { inferEqualityComparator } from "../../../equality-comparators/equality-comparator-inferrer";
import type { EqualityComparator } from "../../../equality-comparators/equality-comparator";
import { inferOrderComparator } from "../../../order-comparators/order-comparator-inferrer";
import type { OrderComparator } from "../../../order-comparators/order-comparator";

export class StrategyBoundedSortedLinkedList<T> extends BoundedLinkedList<T> {
  private readonly comparator: OrderComparator<T>;
  private equalityComparator: EqualityComparator<T> | undefined;

  constructor(
    capacity: number,
    comparator: OrderComparator<T> | undefined = undefined,
    initialElements: T[] = [],
    equalityComparator: EqualityComparator<T> | undefined = undefined,
  ) {
    super(capacity);

    if (comparator === undefined) {
      if (initialElements.length === 0) {
        throw new ComparatorInferenceError();
      }
      this.comparator = inferOrderComparator(initialElements[0]);
    } else {
      this.comparator = comparator;
    }

    if (equalityComparator !== undefined) {
      this.equalityComparator = equalityComparator;
    } else if (initialElements.length > 0) {
      this.equalityComparator = inferEqualityComparator(initialElements[0]);
    }

    for (const element of initialElements) {
      this.add(element);
    }
  }

  override add(element: T): boolean {
    const insertionIndex = this.findInsertionIndex(element);
    super.addAt(insertionIndex, element);
    return true;
  }

  override addAt(_index: number, element: T): void {
    this.add(element);
  }

  override set(index: number, element: T): T {
    const previous = super.removeAt(index);
    this.add(element);
    return previous;
  }

  override contains(element: T): boolean {
    return this.indexOf(element) !== -1;
  }

  override indexOf(element: T): number {
    const equalityComparator = this.getEqualityComparator(element);

    for (let index = 0; index < this.size(); index += 1) {
      if (equalityComparator(this.get(index), element)) {
        return index;
      }
    }

    return -1;
  }

  override remove(element: T): boolean {
    const index = this.indexOf(element);
    if (index === -1) {
      return false;
    }

    super.removeAt(index);
    return true;
  }

  private findInsertionIndex(element: T): number {
    let index = 0;

    while (index < this.size()) {
      const current = this.get(index);
      const comparison = this.comparator(element, current);

      if (comparison < 0) {
        break;
      }

      index += 1;
    }

    return index;
  }

  private getEqualityComparator(sample: T): EqualityComparator<T> {
    if (this.equalityComparator === undefined) {
      this.equalityComparator = inferEqualityComparator(sample);
    }

    return this.equalityComparator;
  }
}
