import type { Set } from "../set";
import { SortedLinkedList } from "../sorted-linked-list/sorted-linked-list";

export class LinkedSet<T> implements Set<T> {
  private readonly values: SortedLinkedList<T>;

  constructor(initialValues: T[] = []) {
    this.values = new SortedLinkedList<T>();

    for (const value of initialValues) {
      this.add(value);
    }
  }

  size(): number {
    return this.values.size();
  }

  isEmpty(): boolean {
    return this.values.isEmpty();
  }

  contains(value: T): boolean {
    return this.values.contains(value);
  }

  add(value: T): boolean {
    if (this.contains(value)) {
      return false;
    }

    this.values.add(value);
    return true;
  }

  remove(value: T): boolean {
    return this.values.remove(value);
  }

  clear(): void {
    this.values.clear();
  }

  toArray(): T[] {
    return this.values.toArray();
  }
}
