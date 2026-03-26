import { LinkedList } from "../../lists/linked-list/linked-list";
import { EmptyQueueError } from "../../../errors/empty-queue-error";
import type { Queue } from "../queue";

export class LinkedQueue<T> implements Queue<T> {
  private readonly items: LinkedList<T>;

  constructor(initialElements: T[] = []) {
    this.items = new LinkedList<T>(initialElements);
  }

  size(): number {
    return this.items.size();
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  enqueue(element: T): void {
    this.items.add(element);
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new EmptyQueueError();
    }

    return this.items.removeAt(0);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new EmptyQueueError();
    }

    return this.items.get(0);
  }

  clear(): void {
    this.items.clear();
  }

  toArray(): T[] {
    return this.items.toArray();
  }
}
