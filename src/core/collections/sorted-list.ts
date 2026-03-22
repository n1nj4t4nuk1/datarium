export interface SortedList<T> {
  size(): number;
  isEmpty(): boolean;
  contains(element: T): boolean;
  get(index: number): T;
  add(element: T): boolean;
  remove(element: T): boolean;
  removeAt(index: number): T;
  indexOf(element: T): number;
  clear(): void;
  toArray(): T[];
}
