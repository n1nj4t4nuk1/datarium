import type { List } from "../list";
import { IndexOutOfBoundsError } from "../../errors/index-out-of-bounds-error";

export class ArrayList<T> implements List<T> {
  private elements: T[];

  constructor(initialElements: T[] = []) {
    this.elements = [...initialElements];
  }

  size(): number {
    return this.elements.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
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
    this.elements.push(element);
    return true;
  }

  addAt(index: number, element: T): void {
    this.checkPositionIndex(index);
    this.elements.splice(index, 0, element);
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
    const [removed] = this.elements.splice(index, 1);
    return removed as T;
  }

  indexOf(element: T): number {
    return this.elements.indexOf(element);
  }

  clear(): void {
    this.elements = [];
  }

  toArray(): T[] {
    return [...this.elements];
  }

  private checkElementIndex(index: number): void {
    if (index < 0 || index >= this.size()) {
      throw new IndexOutOfBoundsError(index, this.size());
    }
  }

  private checkPositionIndex(index: number): void {
    if (index < 0 || index > this.size()) {
      throw new IndexOutOfBoundsError(index, this.size());
    }
  }
}
