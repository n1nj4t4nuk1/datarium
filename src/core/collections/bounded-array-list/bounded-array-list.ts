import type { List } from "../list";
import { IndexOutOfBoundsError } from "../../errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../errors/list-capacity-exceeded-error";

export class BoundedArrayList<T> implements List<T> {
  private readonly capacity: number;
  private readonly elements: Array<T | null>;
  private count: number;

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new InvalidCapacityError(capacity);
    }

    this.capacity = capacity;
    this.elements = Array<T | null>(capacity).fill(null);
    this.count = 0;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  contains(element: T): boolean {
    return this.indexOf(element) !== -1;
  }

  get(index: number): T {
    this.checkElementIndex(index);
    return this.elements[index] as T;
  }

  set(index: number, element: T): T {
    this.checkElementIndex(index);
    const previous = this.elements[index] as T;
    this.elements[index] = element;
    return previous;
  }

  add(element: T): boolean {
    this.ensureCapacity();
    this.elements[this.count] = element;
    this.count += 1;
    return true;
  }

  addAt(index: number, element: T): void {
    this.checkPositionIndex(index);
    this.ensureCapacity();

    for (let position = this.count; position > index; position -= 1) {
      this.elements[position] = this.elements[position - 1] as T | null;
    }

    this.elements[index] = element;
    this.count += 1;
  }

  remove(element: T): boolean {
    const index = this.indexOf(element);
    if (index === -1) {
      return false;
    }

    this.removeAt(index);
    return true;
  }

  removeAt(index: number): T {
    this.checkElementIndex(index);

    const removed = this.elements[index] as T;

    for (let position = index; position < this.count - 1; position += 1) {
      this.elements[position] = this.elements[position + 1] as T | null;
    }

    this.count -= 1;
    this.elements[this.count] = null;

    return removed;
  }

  indexOf(element: T): number {
    for (let index = 0; index < this.count; index += 1) {
      if (this.elements[index] === element) {
        return index;
      }
    }

    return -1;
  }

  clear(): void {
    for (let index = 0; index < this.count; index += 1) {
      this.elements[index] = null;
    }

    this.count = 0;
  }

  toArray(): T[] {
    const copy: T[] = [];

    for (let index = 0; index < this.count; index += 1) {
      copy.push(this.elements[index] as T);
    }

    return copy;
  }

  private checkElementIndex(index: number): void {
    if (index < 0 || index >= this.count) {
      throw new IndexOutOfBoundsError(index, this.count);
    }
  }

  private checkPositionIndex(index: number): void {
    if (index < 0 || index > this.count) {
      throw new IndexOutOfBoundsError(index, this.count);
    }
  }

  private ensureCapacity(): void {
    if (this.count >= this.capacity) {
      throw new ListCapacityExceededError(this.capacity);
    }
  }
}
