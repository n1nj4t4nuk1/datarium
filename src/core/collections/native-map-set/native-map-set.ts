import type { Set } from "../set";
import { NativeMap } from "../native-map/native-map";
import { DuplicateElementError } from "../../errors/duplicate-element-error";
import { ElementNotFoundError } from "../../errors/element-not-found-error";

export class NativeMapSet<T extends PropertyKey> implements Set<T> {
  private readonly values: NativeMap<T, true>;

  constructor(initialValues: T[] = []) {
    this.values = new NativeMap<T, true>();

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
    return this.values.containsKey(value);
  }

  add(value: T): void {
    if (this.contains(value)) {
      throw new DuplicateElementError(`Element '${String(value)}' already exists in NativeMapSet`);
    }

    this.values.put(value, true);
  }

  remove(value: T): void {
    if (!this.contains(value)) {
      throw new ElementNotFoundError(`Element '${String(value)}' not found in NativeMapSet`);
    }

    this.values.remove(value);
  }

  clear(): void {
    this.values.clear();
  }

  toArray(): T[] {
    return this.values.keys();
  }
}
