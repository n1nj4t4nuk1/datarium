import { ArrayList } from "../../../core/collections/array-list/array-list";
import { BasicNumberComparator } from "../../comparators/basic-number-comparator";

export type Comparator<T> = (left: T, right: T) => number;

export class LambdaArrayList<T> extends ArrayList<T> {
  private readonly comparator: Comparator<T>;

  constructor(
    comparator: Comparator<T> = BasicNumberComparator as Comparator<T>,
    initialElements: T[] = [],
  ) {
    super();
    this.comparator = comparator;

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
