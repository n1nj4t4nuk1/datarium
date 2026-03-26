import type { Set } from "../set";
import { SortedArrayList } from "../../lists/sorted-array-list/sorted-array-list";

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
      return;
    }

    this.values.add(value);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      return;
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
