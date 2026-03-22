import { describe, expect, test } from "bun:test";
import { SortedArrayList } from "../../../../src/core/collections/sorted-array-list/sorted-array-list";
import { IndexOutOfBoundsError } from "../../../../src/core/errors/index-out-of-bounds-error";

describe("SortedArrayList", () => {
  test("creates an empty list by default", () => {
    const list = new SortedArrayList<number>();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("sorts numbers in constructor", () => {
    const list = new SortedArrayList<number>([4, 1, 3, 2]);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("keeps numbers sorted when adding", () => {
    const list = new SortedArrayList<number>();

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("keeps strings sorted alphabetically", () => {
    const list = new SortedArrayList<string>(["zebra", "apple", "banana"]);

    expect(list.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("set preserves sorting and returns previous value", () => {
    const list = new SortedArrayList<number>([1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("supports contains and indexOf in sorted list", () => {
    const list = new SortedArrayList<number>([5, 1, 3]);

    expect(list.contains(3)).toBe(true);
    expect(list.contains(9)).toBe(false);
    expect(list.indexOf(5)).toBe(2);
    expect(list.indexOf(9)).toBe(-1);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new SortedArrayList<number>([1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });
});
