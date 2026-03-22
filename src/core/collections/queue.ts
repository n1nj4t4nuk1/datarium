export interface Queue<T> {
  size(): number;
  isEmpty(): boolean;
  enqueue(element: T): void;
  dequeue(): T;
  peek(): T;
  clear(): void;
  toArray(): T[];
}
