import { LinkedList } from "../linked-list/linked-list";
import { EmptyStackError } from "../../errors/empty-stack-error";

export class LinkedStack<T> {
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

  push(element: T): void {
    this.items.add(element);
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
