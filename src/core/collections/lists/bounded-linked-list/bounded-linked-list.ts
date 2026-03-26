import type { List } from "../list";
import { IndexOutOfBoundsError } from "../../../errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../errors/list-capacity-exceeded-error";
import { ElementNotFoundError } from "../../../errors/element-not-found-error";

class BoundedLinkedListNode<T> {
  value: T;
  next: BoundedLinkedListNode<T> | null;
  prev: BoundedLinkedListNode<T> | null;

  constructor(
    value: T,
    prev: BoundedLinkedListNode<T> | null = null,
    next: BoundedLinkedListNode<T> | null = null,
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class BoundedLinkedList<T> implements List<T> {
  private head: BoundedLinkedListNode<T> | null = null;
  private tail: BoundedLinkedListNode<T> | null = null;
  private length = 0;
  private readonly capacity: number;

  constructor(capacity: number, initialElements: T[] = []) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new InvalidCapacityError(capacity);
    }

    this.capacity = capacity;

    for (const element of initialElements) {
      this.add(element);
    }
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  contains(element: T): boolean {
    let current = this.head;

    while (current !== null) {
      if (current.value === element) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  get(index: number): T {
    this.checkElementIndex(index);
    return this.getNode(index).value;
  }

  set(index: number, element: T): T {
    this.checkElementIndex(index);
    const node = this.getNode(index);
    const previous = node.value;
    node.value = element;
    return previous;
  }

  add(element: T): void {
    this.ensureCapacity();
    this.linkLast(element);
  }

  addAt(index: number, element: T): void {
    this.checkPositionIndex(index);
    this.ensureCapacity();

    if (index === this.length) {
      this.linkLast(element);
      return;
    }

    this.linkBefore(element, this.getNode(index));
  }

  remove(element: T): void {
    let current = this.head;
    while (current !== null) {
      if (current.value === element) {
        this.unlink(current);
        return;
      }
      current = current.next;
    }

    throw new ElementNotFoundError(`Element '${String(element)}' not found in BoundedLinkedList`);
  }

  removeAt(index: number): T {
    this.checkElementIndex(index);
    return this.unlink(this.getNode(index));
  }

  indexOf(element: T): number {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.value === element) {
        return index;
      }
      current = current.next;
      index += 1;
    }

    throw new ElementNotFoundError(`Element '${String(element)}' not found in BoundedLinkedList`);
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  toArray(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current !== null) {
      items.push(current.value);
      current = current.next;
    }

    return items;
  }

  private getNode(index: number): BoundedLinkedListNode<T> {
    let current: BoundedLinkedListNode<T> | null;

    if (index < this.length / 2) {
      current = this.head;
      for (let i = 0; i < index; i += 1) {
        current = current?.next ?? null;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i -= 1) {
        current = current?.prev ?? null;
      }
    }

    if (current === null) {
      throw new IndexOutOfBoundsError(index, this.length);
    }

    return current;
  }

  private linkLast(element: T): void {
    const oldTail = this.tail;
    const newNode = new BoundedLinkedListNode(element, oldTail, null);
    this.tail = newNode;

    if (oldTail === null) {
      this.head = newNode;
    } else {
      oldTail.next = newNode;
    }

    this.length += 1;
  }

  private linkBefore(element: T, successor: BoundedLinkedListNode<T>): void {
    const predecessor = successor.prev;
    const newNode = new BoundedLinkedListNode(element, predecessor, successor);
    successor.prev = newNode;

    if (predecessor === null) {
      this.head = newNode;
    } else {
      predecessor.next = newNode;
    }

    this.length += 1;
  }

  private unlink(node: BoundedLinkedListNode<T>): T {
    const element = node.value;
    const next = node.next;
    const prev = node.prev;

    if (prev === null) {
      this.head = next;
    } else {
      prev.next = next;
    }

    if (next === null) {
      this.tail = prev;
    } else {
      next.prev = prev;
    }

    this.length -= 1;
    return element;
  }

  private checkElementIndex(index: number): void {
    if (index < 0 || index >= this.length) {
      throw new IndexOutOfBoundsError(index, this.length);
    }
  }

  private checkPositionIndex(index: number): void {
    if (index < 0 || index > this.length) {
      throw new IndexOutOfBoundsError(index, this.length);
    }
  }

  private ensureCapacity(): void {
    if (this.length >= this.capacity) {
      throw new ListCapacityExceededError(this.capacity);
    }
  }
}
