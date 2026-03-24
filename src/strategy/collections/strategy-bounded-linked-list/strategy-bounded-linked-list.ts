import { BoundedLinkedList } from "../../../core/collections/bounded-linked-list/bounded-linked-list";

export class StrategyBoundedLinkedList<T> extends BoundedLinkedList<T> {
  constructor(capacity: number, initialElements: T[] = []) {
    super(capacity);

    for (const element of initialElements) {
      this.add(element);
    }
  }
}
