import { BoundedLinkedList } from "../bounded-linked-list/bounded-linked-list";
import { EmptyQueueError } from "../../errors/empty-queue-error";
import type { Queue } from "../queue";

export class BoundedLinkedQueue<T> implements Queue<T> {
  private readonly items: BoundedLinkedList<T>;

  constructor(capacity: number, initialElements: T[] = []) {
    this.items = new BoundedLinkedList<T>(capacity);

    for (const element of initialElements) {
      this.enqueue(element);
    }
  }

  size(): number {
    return this.items.size();
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  enqueue(element: T): boolean {
    return this.items.add(element);
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
