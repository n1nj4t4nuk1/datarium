export interface OrderComparator<T> {
  (left: T, right: T): number;
}