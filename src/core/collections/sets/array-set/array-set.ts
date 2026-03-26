import type { Set } from "../set";
import { SortedArrayList } from "../../lists/sorted-array-list/sorted-array-list";
import { DuplicateElementError } from "../../../errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

export class ArraySet<T> implements Set<T> {
  private readonly values: SortedArrayList<T>;

  constructor(initialValues: T[] = []) {
    this.values = new SortedArrayList<T>();

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
      throw new DuplicateElementError(`Element '${String(value)}' already exists in ArraySet`);
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      throw new ElementNotFoundError(`Element '${String(value)}' not found in ArraySet`);
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
