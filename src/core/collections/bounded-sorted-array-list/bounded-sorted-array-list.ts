import { BoundedArrayList } from "../bounded-array-list/bounded-array-list";

export class BoundedSortedArrayList<T> extends BoundedArrayList<T> {
  constructor(capacity: number, initialElements: T[] = []) {
    super(capacity);

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
      const comparison = this.compare(element, middleElement);

      if (comparison < 0) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }

  private compare(left: T, right: T): number {
    const leftValue = left as unknown as number | string | bigint;
    const rightValue = right as unknown as number | string | bigint;

    if (leftValue < rightValue) {
      return -1;
    }

    if (leftValue > rightValue) {
      return 1;
    }

    return 0;
  }
}
