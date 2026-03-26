import { describe, expect, test } from "bun:test";
import { ArrayStack } from "../../../../../src/core/collections/stacks/array-stack/array-stack";
import { EmptyStackError } from "../../../../../src/core/errors/empty-stack-error";

describe("ArrayStack", () => {
  test("creates an empty stack by default", () => {
    const stack = new ArrayStack<number>();

    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toArray()).toEqual([]);
  });

  test("creates a stack from initial elements", () => {
    const stack = new ArrayStack<number>([1, 2, 3]);

    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe(3);
    expect(stack.toArray()).toEqual([1, 2, 3]);
  });

  test("push adds element at the top", () => {
    const stack = new ArrayStack<number>();

    stack.push(10);
    stack.push(20);
    expect(stack.peek()).toBe(20);
    expect(stack.toArray()).toEqual([10, 20]);
  });

  test("pop removes and returns top element in LIFO order", () => {
    const stack = new ArrayStack<number>([1, 2, 3]);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.isEmpty()).toBe(true);
  });

  test("peek returns top element without removing it", () => {
    const stack = new ArrayStack<number>([5, 10]);

    expect(stack.peek()).toBe(10);
    expect(stack.size()).toBe(2);
    expect(stack.toArray()).toEqual([5, 10]);
  });

  test("throws EmptyStackError when pop is called on empty stack", () => {
    const stack = new ArrayStack<number>();

    expect(() => stack.pop()).toThrow(EmptyStackError);
  });

  test("throws EmptyStackError when peek is called on empty stack", () => {
    const stack = new ArrayStack<number>();

    expect(() => stack.peek()).toThrow(EmptyStackError);
  });

  test("clear removes all elements", () => {
    const stack = new ArrayStack<number>([1, 2, 3]);

    stack.clear();

    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const stack = new ArrayStack<number>([1, 2]);
    const snapshot = stack.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(stack.toArray()).toEqual([1, 2]);
  });
});
