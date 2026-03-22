import type { List } from "../list";
import { IndexOutOfBoundsError } from "../../errors/index-out-of-bounds-error";

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(value: T, prev: LinkedListNode<T> | null = null, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class LinkedList<T> implements List<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;
  private length = 0;

  constructor(initialElements: T[] = []) {
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
    return this.indexOf(element) !== -1;
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

  add(element: T): boolean {
    this.linkLast(element);
    return true;
  }

  addAt(index: number, element: T): void {
    this.checkPositionIndex(index);
    if (index === this.length) {
      this.linkLast(element);
      return;
    }

    this.linkBefore(element, this.getNode(index));
  }

  remove(element: T): boolean {
    let current = this.head;
    while (current !== null) {
      if (current.value === element) {
        this.unlink(current);
        return true;
      }
      current = current.next;
    }

    return false;
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

    return -1;
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

  private getNode(index: number): LinkedListNode<T> {
    let current: LinkedListNode<T> | null;

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
    const newNode = new LinkedListNode(element, oldTail, null);
    this.tail = newNode;

    if (oldTail === null) {
      this.head = newNode;
    } else {
      oldTail.next = newNode;
    }

    this.length += 1;
  }

  private linkBefore(element: T, successor: LinkedListNode<T>): void {
    const predecessor = successor.prev;
    const newNode = new LinkedListNode(element, predecessor, successor);
    successor.prev = newNode;

    if (predecessor === null) {
      this.head = newNode;
    } else {
      predecessor.next = newNode;
    }

    this.length += 1;
  }

  private unlink(node: LinkedListNode<T>): T {
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
}
