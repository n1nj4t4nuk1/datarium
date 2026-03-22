import type { Map } from "../map";

export class NativeMap<K extends PropertyKey, V> implements Map<K, V> {
  private storage: { [key: string]: V; [key: symbol]: V } = {};
  private keyOrder: K[] = [];

  size(): number {
    return this.keyOrder.length;
  }

  isEmpty(): boolean {
    return this.keyOrder.length === 0;
  }

  containsKey(key: K): boolean {
    const storageKey = this.toStorageKey(key);
    return Object.prototype.hasOwnProperty.call(this.storage, storageKey);
  }

  containsValue(value: V): boolean {
    for (const key of this.keyOrder) {
      if (this.readValue(key) === value) {
        return true;
      }
    }

    return false;
  }

  get(key: K): V | undefined {
    if (!this.containsKey(key)) {
      return undefined;
    }

    return this.readValue(key);
  }

  put(key: K, value: V): V | undefined {
    const previous = this.get(key);

    if (!this.containsKey(key)) {
      this.keyOrder.push(key);
    }

    const storageKey = this.toStorageKey(key);
    this.storage[storageKey] = value;

    return previous;
  }

  remove(key: K): V | undefined {
    if (!this.containsKey(key)) {
      return undefined;
    }

    const storageKey = this.toStorageKey(key);
    const removedValue = this.storage[storageKey] as V;
    delete this.storage[storageKey];

    this.keyOrder = this.keyOrder.filter((existingKey) => !this.sameStorageKey(existingKey, key));

    return removedValue;
  }

  clear(): void {
    this.storage = {};
    this.keyOrder = [];
  }

  keys(): K[] {
    return [...this.keyOrder];
  }

  values(): V[] {
    const values: V[] = [];

    for (const key of this.keyOrder) {
      values.push(this.readValue(key));
    }

    return values;
  }

  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];

    for (const key of this.keyOrder) {
      entries.push([key, this.readValue(key)]);
    }

    return entries;
  }

  private toStorageKey(key: K): string | symbol {
    return typeof key === "symbol" ? key : String(key);
  }

  private sameStorageKey(first: K, second: K): boolean {
    return this.toStorageKey(first) === this.toStorageKey(second);
  }

  private readValue(key: K): V {
    const storageKey = this.toStorageKey(key);
    return this.storage[storageKey] as V;
  }
}
