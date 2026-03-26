import { describe, expect, test } from "bun:test";
import { SortedLinkedList } from "../../../../../src/core/collections/lists/sorted-linked-list/sorted-linked-list";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../../src/core/errors/index-out-of-bounds-error";

describe("SortedLinkedList", () => {
  test("creates an empty list by default", () => {
    const list = new SortedLinkedList<number>();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("sorts numbers in constructor", () => {
    const list = new SortedLinkedList<number>([4, 1, 3, 2]);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("keeps numbers sorted when adding", () => {
    const list = new SortedLinkedList<number>();

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("keeps strings sorted alphabetically", () => {
    const list = new SortedLinkedList<string>(["zebra", "apple", "banana"]);

    expect(list.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("set preserves sorting and returns previous value", () => {
    const list = new SortedLinkedList<number>([1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("supports contains and indexOf in sorted list", () => {
    const list = new SortedLinkedList<number>([5, 1, 3]);

    expect(list.contains(3)).toBe(true);
    expect(list.contains(9)).toBe(false);
    expect(list.indexOf(5)).toBe(2);
    expect(() => list.indexOf(9)).toThrow(ElementNotFoundError);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new SortedLinkedList<number>([1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });
});
