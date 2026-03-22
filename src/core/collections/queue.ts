export interface Queue<T> {
  size(): number;
  isEmpty(): boolean;
  enqueue(element: T): boolean;
  dequeue(): T;
  peek(): T;
  clear(): void;
  toArray(): T[];
}
