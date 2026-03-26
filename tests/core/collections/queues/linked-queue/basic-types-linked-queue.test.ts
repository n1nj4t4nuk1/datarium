import { describe, expect, test } from "bun:test";
import { LinkedQueue } from "../../../../../src/core/collections/queues/linked-queue/linked-queue";
import { EmptyQueueError } from "../../../../../src/core/errors/empty-queue-error";

describe("LinkedQueue", () => {
  test("creates an empty queue by default", () => {
    const queue = new LinkedQueue<number>();

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toArray()).toEqual([]);
  });

  test("creates a queue from initial elements", () => {
    const queue = new LinkedQueue<number>([1, 2, 3]);

    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(1);
    expect(queue.toArray()).toEqual([1, 2, 3]);
  });

  test("enqueue adds element at the end", () => {
    const queue = new LinkedQueue<number>();

    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.peek()).toBe(10);
    expect(queue.toArray()).toEqual([10, 20]);
  });

  test("dequeue removes and returns front element in FIFO order", () => {
    const queue = new LinkedQueue<number>([1, 2, 3]);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test("peek returns front element without removing it", () => {
    const queue = new LinkedQueue<number>([5, 10]);

    expect(queue.peek()).toBe(5);
    expect(queue.size()).toBe(2);
    expect(queue.toArray()).toEqual([5, 10]);
  });

  test("throws EmptyQueueError when dequeue is called on empty queue", () => {
    const queue = new LinkedQueue<number>();

    expect(() => queue.dequeue()).toThrow(EmptyQueueError);
  });

  test("throws EmptyQueueError when peek is called on empty queue", () => {
    const queue = new LinkedQueue<number>();

    expect(() => queue.peek()).toThrow(EmptyQueueError);
  });

  test("clear removes all elements", () => {
    const queue = new LinkedQueue<number>([1, 2, 3]);

    queue.clear();

    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const queue = new LinkedQueue<number>([1, 2]);
    const snapshot = queue.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(queue.toArray()).toEqual([1, 2]);
  });
});
