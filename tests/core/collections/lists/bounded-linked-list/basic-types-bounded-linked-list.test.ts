import { describe, expect, test } from "bun:test";
import { BoundedLinkedList } from "../../../../../src/core/collections/lists/bounded-linked-list/bounded-linked-list";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../../src/core/errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedLinkedList", () => {
  test("creates an empty list by default", () => {
    const list = new BoundedLinkedList<number>(3);

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("creates a list from initial elements", () => {
    const list = new BoundedLinkedList<number>(3, [1, 2, 3]);

    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(1);
    expect(list.get(2)).toBe(3);
  });

  test("adds elements at the end", () => {
    const list = new BoundedLinkedList<number>(2);

    list.add(10);
    list.add(20);
    expect(list.toArray()).toEqual([10, 20]);
  });

  test("inserts elements at a specific position", () => {
    const list = new BoundedLinkedList<number>(3, [1, 3]);

    list.addAt(1, 2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("replaces elements and returns previous value", () => {
    const list = new BoundedLinkedList<number>(2, [5, 10]);

    const previous = list.set(1, 15);

    expect(previous).toBe(10);
    expect(list.toArray()).toEqual([5, 15]);
  });

  test("removes by value and by index", () => {
    const list = new BoundedLinkedList<number>(4, [1, 2, 3, 2]);

    list.remove(2);
    expect(list.toArray()).toEqual([1, 3, 2]);

    const removed = list.removeAt(1);

    expect(removed).toBe(3);
    expect(list.toArray()).toEqual([1, 2]);
  });

  test("supports contains and indexOf", () => {
    const list = new BoundedLinkedList<string>(3, ["a", "b", "c"]);

    expect(list.contains("b")).toBe(true);
    expect(list.contains("z")).toBe(false);
    expect(list.indexOf("c")).toBe(2);
    expect(() => list.indexOf("z")).toThrow(ElementNotFoundError);
  });

  test("clears all elements", () => {
    const list = new BoundedLinkedList<number>(3, [1, 2, 3]);

    list.clear();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new BoundedLinkedList<number>(1, [1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.addAt(2, 2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("throws ListCapacityExceededError when capacity is exceeded", () => {
    const list = new BoundedLinkedList<number>(2, [1, 2]);

    expect(() => list.add(3)).toThrow(ListCapacityExceededError);
    expect(() => list.addAt(1, 9)).toThrow(ListCapacityExceededError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedLinkedList<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedLinkedList<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
