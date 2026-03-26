import type { Set } from "../set";
import { BoundedSortedArrayList } from "../../lists/bounded-sorted-array-list/bounded-sorted-array-list";
import { DuplicateElementError } from "../../../errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

export class BoundedArraySet<T> implements Set<T> {
  private readonly values: BoundedSortedArrayList<T>;

  constructor(capacity: number, initialValues: T[] = []) {
    this.values = new BoundedSortedArrayList<T>(capacity);

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
      throw new DuplicateElementError(`Element '${String(value)}' already exists in BoundedArraySet`);
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      throw new ElementNotFoundError(`Element '${String(value)}' not found in BoundedArraySet`);
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
