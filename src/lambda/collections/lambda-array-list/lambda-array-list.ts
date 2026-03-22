import { ArrayList } from "../../../core/collections/array-list/array-list";
import { ComparatorInferenceError } from "../../errors/comparator-inference-error";
import { inferOrderComparator } from "../../order-comparators/order-comparator-inferrer";
import type { OrderComparator } from "../../order-comparators/order-comparator";

export class LambdaArrayList<T> extends ArrayList<T> {
  private readonly comparator: OrderComparator<T>;

  constructor(
    comparator: OrderComparator<T> | undefined = undefined,
    initialElements: T[] = [],
  ) {
    super();

    // If comparator is undefined, infer it from the first element
    if (comparator === undefined) {
      if (initialElements.length === 0) {
        throw new ComparatorInferenceError();
      }
      this.comparator = inferOrderComparator(initialElements[0]);
    } else {
      this.comparator = comparator;
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

  private findInsertionIndex(element: T): number {
    let low = 0;
    let high = this.size();

    while (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      const middleElement = this.get(mid);
      const comparison = this.comparator(element, middleElement);

      if (comparison < 0) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }
}
