export interface Map<K, V> {
  size(): number;
  isEmpty(): boolean;
  containsKey(key: K): boolean;
  containsValue(value: V): boolean;
  get(key: K): V | undefined;
  put(key: K, value: V): V | undefined;
  remove(key: K): V | undefined;
  clear(): void;
  keys(): K[];
  values(): V[];
  entries(): Array<[K, V]>;
}
