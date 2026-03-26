import { describe, expect, test } from "bun:test";
import { BoundedLinkedQueue } from "../../../../../src/core/collections/queues/bounded-linked-queue/bounded-linked-queue";
import { EmptyQueueError } from "../../../../../src/core/errors/empty-queue-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedLinkedQueue", () => {
  test("creates an empty bounded queue by default", () => {
    const queue = new BoundedLinkedQueue<number>(3);

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toArray()).toEqual([]);
  });

  test("creates a bounded queue from initial elements", () => {
    const queue = new BoundedLinkedQueue<number>(3, [1, 2, 3]);

    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(1);
    expect(queue.toArray()).toEqual([1, 2, 3]);
  });

  test("enqueue adds elements while capacity allows", () => {
    const queue = new BoundedLinkedQueue<number>(2);

    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.peek()).toBe(10);
    expect(queue.toArray()).toEqual([10, 20]);
  });

  test("throws ListCapacityExceededError when enqueueing beyond capacity", () => {
    const queue = new BoundedLinkedQueue<number>(2, [1, 2]);

    expect(() => queue.enqueue(3)).toThrow(ListCapacityExceededError);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new BoundedLinkedQueue<number>(2, [1, 2, 3])).toThrow(ListCapacityExceededError);
  });

  test("dequeue removes and returns front element in FIFO order", () => {
    const queue = new BoundedLinkedQueue<number>(3, [1, 2, 3]);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test("peek returns front element without removing it", () => {
    const queue = new BoundedLinkedQueue<number>(2, [5, 10]);

    expect(queue.peek()).toBe(5);
    expect(queue.size()).toBe(2);
    expect(queue.toArray()).toEqual([5, 10]);
  });

  test("throws EmptyQueueError when dequeue is called on empty queue", () => {
    const queue = new BoundedLinkedQueue<number>(2);

    expect(() => queue.dequeue()).toThrow(EmptyQueueError);
  });

  test("throws EmptyQueueError when peek is called on empty queue", () => {
    const queue = new BoundedLinkedQueue<number>(2);

    expect(() => queue.peek()).toThrow(EmptyQueueError);
  });

  test("clear removes all elements", () => {
    const queue = new BoundedLinkedQueue<number>(3, [1, 2, 3]);

    queue.clear();

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const queue = new BoundedLinkedQueue<number>(2, [1, 2]);
    const snapshot = queue.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(queue.toArray()).toEqual([1, 2]);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedLinkedQueue<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedLinkedQueue<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
