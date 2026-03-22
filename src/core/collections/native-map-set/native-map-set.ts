import type { Set } from "../set";
import { NativeMap } from "../native-map/native-map";

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

  add(value: T): boolean {
    if (this.contains(value)) {
      return false;
    }

    this.values.put(value, true);
    return true;
  }

  remove(value: T): boolean {
    if (!this.contains(value)) {
      return false;
    }

    this.values.remove(value);
    return true;
  }

  clear(): void {
    this.values.clear();
  }

  toArray(): T[] {
    return this.values.keys();
  }
}
