import { describe, expect, test } from "bun:test";
import { BoundedArrayStack } from "../../../../../src/core/collections/stacks/bounded-array-stack/bounded-array-stack";
import { EmptyStackError } from "../../../../../src/core/errors/empty-stack-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedArrayStack", () => {
  test("creates an empty bounded stack by default", () => {
    const stack = new BoundedArrayStack<number>(3);

    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toArray()).toEqual([]);
  });

  test("creates a bounded stack from initial elements", () => {
    const stack = new BoundedArrayStack<number>(3, [1, 2, 3]);

    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe(3);
    expect(stack.toArray()).toEqual([1, 2, 3]);
  });

  test("push adds elements while capacity allows", () => {
    const stack = new BoundedArrayStack<number>(2);

    stack.push(10);
    stack.push(20);
    expect(stack.peek()).toBe(20);
    expect(stack.toArray()).toEqual([10, 20]);
  });

  test("throws ListCapacityExceededError when pushing beyond capacity", () => {
    const stack = new BoundedArrayStack<number>(2, [1, 2]);

    expect(() => stack.push(3)).toThrow(ListCapacityExceededError);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new BoundedArrayStack<number>(2, [1, 2, 3])).toThrow(ListCapacityExceededError);
  });

  test("pop removes and returns top element in LIFO order", () => {
    const stack = new BoundedArrayStack<number>(3, [1, 2, 3]);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
  });

  test("peek returns top element without removing it", () => {
    const stack = new BoundedArrayStack<number>(2, [5, 10]);

    expect(stack.peek()).toBe(10);
    expect(stack.size()).toBe(2);
    expect(stack.toArray()).toEqual([5, 10]);
  });

  test("throws EmptyStackError when pop is called on empty stack", () => {
    const stack = new BoundedArrayStack<number>(2);

    expect(() => stack.pop()).toThrow(EmptyStackError);
  });

  test("throws EmptyStackError when peek is called on empty stack", () => {
    const stack = new BoundedArrayStack<number>(2);

    expect(() => stack.peek()).toThrow(EmptyStackError);
  });

  test("clear removes all elements", () => {
    const stack = new BoundedArrayStack<number>(3, [1, 2, 3]);

    stack.clear();

    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const stack = new BoundedArrayStack<number>(2, [1, 2]);
    const snapshot = stack.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(stack.toArray()).toEqual([1, 2]);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedArrayStack<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedArrayStack<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
