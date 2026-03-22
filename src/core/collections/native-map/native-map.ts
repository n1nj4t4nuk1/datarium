import type { Map } from "../map";

export class NativeMap<K extends PropertyKey, V> implements Map<K, V> {
  private storage: { [key: string]: K; [key: symbol]: V } = {};

  size(): number {
    return this.getStorageKeys().length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  containsKey(key: K): boolean {
    const storageKey = this.toStorageKey(key);
    return Object.prototype.hasOwnProperty.call(this.storage, storageKey);
  }

  containsValue(value: V): boolean {
    for (const key of this.getStorageKeys()) {
      if (this.storage[key] === value) {
        return true;
      }
    }

    return false;
  }

  get(key: K): V | undefined {
    if (!this.containsKey(key)) {
      return undefined;
    }

    const storageKey = this.toStorageKey(key);
    return this.storage[storageKey] as V;
  }

  put(key: K, value: V): V | undefined {
    const previous = this.get(key);

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

    return removedValue;
  }

  clear(): void {
    this.storage = {};
  }

  keys(): K[] {
    return this.getStorageKeys() as K[];
  }

  values(): V[] {
    const values: V[] = [];

    for (const key of this.getStorageKeys()) {
      values.push(this.storage[key] as V);
    }

    return values;
  }

  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];

    for (const key of this.getStorageKeys()) {
      entries.push([key as K, this.storage[key] as V]);
    }

    return entries;
  }

  private toStorageKey(key: K): string | symbol {
    return typeof key === "symbol" ? key : String(key);
  }

  private getStorageKeys(): Array<string | symbol> {
    const stringKeys = Object.keys(this.storage);
    const symbolKeys = Object.getOwnPropertySymbols(this.storage);
    return [...stringKeys, ...symbolKeys];
  }
}
