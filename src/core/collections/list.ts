export interface List<T> {
  size(): number;
  isEmpty(): boolean;
  contains(element: T): boolean;
  get(index: number): T;
  set(index: number, element: T): T;
  add(element: T): boolean;
  addAt(index: number, element: T): void;
  remove(element: T): boolean;
  removeAt(index: number): T;
  indexOf(element: T): number;
  clear(): void;
  toArray(): T[];
}
