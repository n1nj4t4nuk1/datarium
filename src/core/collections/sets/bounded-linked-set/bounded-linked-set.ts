import type { Set } from "../set";
import { BoundedSortedLinkedList } from "../../lists/bounded-sorted-linked-list/bounded-sorted-linked-list";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

export class BoundedLinkedSet<T> implements Set<T> {
  private readonly values: BoundedSortedLinkedList<T>;

  constructor(capacity: number, initialValues: T[] = []) {
    this.values = new BoundedSortedLinkedList<T>(capacity);

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

  add(value: T): void {
    if (this.contains(value)) {
      return;
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      throw new ElementNotFoundError(`Element '${String(value)}' not found in BoundedLinkedSet`);
    }

    this.values.remove(value);
  }

  clear(): void {
    this.values.clear();
  }

  toArray(): T[] {
    return this.values.toArray();
  }
}
