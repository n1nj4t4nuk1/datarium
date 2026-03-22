import { describe, expect, test } from "bun:test";
import { BoundedSortedArrayList } from "../../../../src/core/collections/bounded-sorted-array-list/bounded-sorted-array-list";
import { ElementNotFoundError } from "../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../src/core/errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedSortedArrayList", () => {
  test("creates an empty list by default", () => {
    const list = new BoundedSortedArrayList<number>(3);

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("sorts numbers in constructor", () => {
    const list = new BoundedSortedArrayList<number>(4, [4, 1, 3, 2]);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("keeps numbers sorted when adding", () => {
    const list = new BoundedSortedArrayList<number>(3);

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("keeps strings sorted alphabetically", () => {
    const list = new BoundedSortedArrayList<string>(3, ["zebra", "apple", "banana"]);

    expect(list.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("set preserves sorting and returns previous value", () => {
    const list = new BoundedSortedArrayList<number>(3, [1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const list = new BoundedSortedArrayList<number>(2, [2, 1]);

    expect(() => list.add(3)).toThrow(ListCapacityExceededError);
    expect(() => list.addAt(0, 0)).toThrow(ListCapacityExceededError);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new BoundedSortedArrayList<number>(2, [3, 2, 1])).toThrow(
      ListCapacityExceededError,
    );
  });

  test("supports contains and indexOf in sorted list", () => {
    const list = new BoundedSortedArrayList<number>(5, [5, 1, 3]);

    expect(list.contains(3)).toBe(true);
    expect(list.contains(9)).toBe(false);
    expect(list.indexOf(5)).toBe(2);
    expect(() => list.indexOf(9)).toThrow(ElementNotFoundError);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new BoundedSortedArrayList<number>(1, [1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedSortedArrayList<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedSortedArrayList<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
