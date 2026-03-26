import { StrategySortedLinkedSet } from "../../../../strategy/collections/sets/strategy-sorted-linked-set/strategy-sorted-linked-set";

type LambdaComparator<T> = (left: T, right: T) => number;

export class LambdaSortedLinkedSet<T> {
  private readonly delegate: StrategySortedLinkedSet<T>;

  constructor(comparator: LambdaComparator<T> | undefined = undefined, initialValues: T[] = []) {
    const orderComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): number => comparator(left, right);

    const equalityComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): boolean => comparator(left, right) === 0;

    this.delegate = new StrategySortedLinkedSet<T>(
      orderComparator,
      initialValues,
      equalityComparator,
    );
  }

  size(): number {
    return this.delegate.size();
  }

  isEmpty(): boolean {
    return this.delegate.isEmpty();
  }

  contains(value: T): boolean {
    return this.delegate.contains(value);
  }

  add(value: T): void {
    this.delegate.add(value);
  }

  remove(value: T): void {
    this.delegate.remove(value);
  }

  clear(): void {
    this.delegate.clear();
  }

  toArray(): T[] {
    return this.delegate.toArray();
  }
}
