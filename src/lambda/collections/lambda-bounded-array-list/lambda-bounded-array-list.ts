import { BoundedArrayList } from "../../../core/collections/bounded-array-list/bounded-array-list";

export class LambdaBoundedArrayList<T> extends BoundedArrayList<T> {
  constructor(capacity: number, initialElements: T[] = []) {
    super(capacity);

    for (const element of initialElements) {
      this.add(element);
    }
  }
}
