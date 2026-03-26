import { BoundedArrayList } from "../../../../core/collections/lists/bounded-array-list/bounded-array-list";

export class StrategyBoundedArrayList<T> extends BoundedArrayList<T> {
  constructor(capacity: number, initialElements: T[] = []) {
    super(capacity);

    for (const element of initialElements) {
      this.add(element);
    }
  }
}
