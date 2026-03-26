import type { Set } from "../set";
import { SortedLinkedList } from "../../lists/sorted-linked-list/sorted-linked-list";
import { DuplicateElementError } from "../../../errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

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

  add(value: T): void {
    if (this.contains(value)) {
      throw new DuplicateElementError(`Element '${String(value)}' already exists in LinkedSet`);
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      throw new ElementNotFoundError(`Element '${String(value)}' not found in LinkedSet`);
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
