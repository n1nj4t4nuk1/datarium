import { describe, expect, test } from "bun:test";
import { BoundedArrayList } from "../../../../../src/core/collections/lists/bounded-array-list/bounded-array-list";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../../src/core/errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedArrayList", () => {
  test("creates an empty list with fixed capacity", () => {
    const list = new BoundedArrayList<number>(3);

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("adds elements until capacity is reached", () => {
    const list = new BoundedArrayList<number>(2);

    list.add(10);
    list.add(20);
    expect(list.toArray()).toEqual([10, 20]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const list = new BoundedArrayList<number>(2);

    list.add(1);
    list.add(2);

    expect(() => list.add(3)).toThrow(ListCapacityExceededError);
    expect(() => list.addAt(1, 9)).toThrow(ListCapacityExceededError);
  });

  test("inserts at specific position moving elements to the right", () => {
    const list = new BoundedArrayList<number>(4);
    list.add(1);
    list.add(3);
    list.add(4);

    list.addAt(1, 2);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("replaces elements and returns previous value", () => {
    const list = new BoundedArrayList<number>(2);
    list.add(5);
    list.add(10);

    const previous = list.set(1, 15);

    expect(previous).toBe(10);
    expect(list.toArray()).toEqual([5, 15]);
  });

  test("removes by value and by index shifting elements to the left", () => {
    const list = new BoundedArrayList<number>(5);
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(2);

    list.remove(2);
    expect(list.toArray()).toEqual([1, 3, 2]);

    const removed = list.removeAt(1);

    expect(removed).toBe(3);
    expect(list.toArray()).toEqual([1, 2]);
  });

  test("supports contains and indexOf", () => {
    const list = new BoundedArrayList<string>(3);
    list.add("a");
    list.add("b");
    list.add("c");

    expect(list.contains("b")).toBe(true);
    expect(list.contains("z")).toBe(false);
    expect(list.indexOf("c")).toBe(2);
    expect(() => list.indexOf("z")).toThrow(ElementNotFoundError);
  });

  test("clears all elements and allows reuse", () => {
    const list = new BoundedArrayList<number>(2);
    list.add(1);
    list.add(2);

    list.clear();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);

    list.add(9);
    expect(list.toArray()).toEqual([9]);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new BoundedArrayList<number>(2);
    list.add(1);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.addAt(2, 2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedArrayList<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedArrayList<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
