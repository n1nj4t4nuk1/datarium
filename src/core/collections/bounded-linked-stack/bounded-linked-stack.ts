import { BoundedLinkedList } from "../bounded-linked-list/bounded-linked-list";
import { EmptyStackError } from "../../errors/empty-stack-error";

export class BoundedLinkedStack<T> {
  private readonly items: BoundedLinkedList<T>;

  constructor(capacity: number, initialElements: T[] = []) {
    this.items = new BoundedLinkedList<T>(capacity);

    for (const element of initialElements) {
      this.push(element);
    }
  }

  size(): number {
    return this.items.size();
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  push(element: T): boolean {
    return this.items.add(element);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new EmptyStackError();
    }

    return this.items.removeAt(this.size() - 1);
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new EmptyStackError();
    }

    return this.items.get(this.size() - 1);
  }

  clear(): void {
    this.items.clear();
  }

  toArray(): T[] {
    return this.items.toArray();
  }
}
