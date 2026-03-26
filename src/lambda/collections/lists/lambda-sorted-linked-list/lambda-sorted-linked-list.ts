import { StrategySortedLinkedList } from "../../../../strategy/collections/lists/strategy-sorted-linked-list/strategy-sorted-linked-list";
import type { LambdaComparator } from "../../../lambda-comparator.ts";

export class LambdaSortedLinkedList<T> {
  private readonly delegate: StrategySortedLinkedList<T>;

  constructor(comparator: LambdaComparator<T> | undefined = undefined, initialElements: T[] = []) {
    const orderComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): number => comparator(left, right);

    const equalityComparator =
      comparator === undefined
        ? undefined
        : (left: T, right: T): boolean => comparator(left, right) === 0;

    this.delegate = new StrategySortedLinkedList<T>(
      orderComparator,
      initialElements,
      equalityComparator,
    );
  }

  size(): number {
    return this.delegate.size();
  }

  isEmpty(): boolean {
    return this.delegate.isEmpty();
  }

  contains(element: T): boolean {
    return this.delegate.contains(element);
  }

  get(index: number): T {
    return this.delegate.get(index);
  }

  set(index: number, element: T): T {
    return this.delegate.set(index, element);
  }

  add(element: T): boolean {
    return this.delegate.add(element);
  }

  addAt(index: number, element: T): void {
    this.delegate.addAt(index, element);
  }

  remove(element: T): boolean {
    return this.delegate.remove(element);
  }

  removeAt(index: number): T {
    return this.delegate.removeAt(index);
  }

  indexOf(element: T): number {
    return this.delegate.indexOf(element);
  }

  clear(): void {
    this.delegate.clear();
  }

  toArray(): T[] {
    return this.delegate.toArray();
  }
}
