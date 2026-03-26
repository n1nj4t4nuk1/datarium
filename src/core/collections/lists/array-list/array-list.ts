import type { List } from "../list";
import { IndexOutOfBoundsError } from "../../../errors/index-out-of-bounds-error";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

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
    return this.elements.includes(element);
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

  add(element: T): void {
    this.elements.push(element);
  }

  addAt(index: number, element: T): void {
    this.checkPositionIndex(index);
    this.elements.splice(index, 0, element);
  }

  remove(element: T): void {
    const index = this.elements.indexOf(element);
    if (index === -1) {
      throw new ElementNotFoundError(`Element '${String(element)}' not found in ArrayList`);
    }

    this.removeAt(index);
  }

  removeAt(index: number): T {
    this.checkElementIndex(index);
    const [removed] = this.elements.splice(index, 1);
    return removed as T;
  }

  indexOf(element: T): number {
    const index = this.elements.indexOf(element);

    if (index === -1) {
      throw new ElementNotFoundError(`Element '${String(element)}' not found in ArrayList`);
    }

    return index;
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
