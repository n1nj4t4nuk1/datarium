import { LinkedList } from "../../../core/collections/linked-list/linked-list";

export class StrategyLinkedList<T> extends LinkedList<T> {
  constructor(initialElements: T[] = []) {
    super(initialElements);
  }
}
