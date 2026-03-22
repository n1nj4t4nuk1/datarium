import { describe, expect, test } from "bun:test";
import { LinkedList } from "../../../../src/core/collections/linked-list/linked-list";
import { IndexOutOfBoundsError } from "../../../../src/core/errors/index-out-of-bounds-error";

describe("LinkedList", () => {
  test("creates an empty list by default", () => {
    const list = new LinkedList<number>();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("creates a list from initial elements", () => {
    const list = new LinkedList<number>([1, 2, 3]);

    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(1);
    expect(list.get(2)).toBe(3);
  });

  test("adds elements at the end", () => {
    const list = new LinkedList<number>();

    expect(list.add(10)).toBe(true);
    expect(list.add(20)).toBe(true);
    expect(list.toArray()).toEqual([10, 20]);
  });

  test("inserts elements at a specific position", () => {
    const list = new LinkedList<number>([1, 3]);

    list.addAt(1, 2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("replaces elements and returns previous value", () => {
    const list = new LinkedList<number>([5, 10]);

    const previous = list.set(1, 15);

    expect(previous).toBe(10);
    expect(list.toArray()).toEqual([5, 15]);
  });

  test("removes by value and by index", () => {
    const list = new LinkedList<number>([1, 2, 3, 2]);

    expect(list.remove(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3, 2]);

    const removed = list.removeAt(1);

    expect(removed).toBe(3);
    expect(list.toArray()).toEqual([1, 2]);
  });

  test("supports contains and indexOf", () => {
    const list = new LinkedList<string>(["a", "b", "c"]);

    expect(list.contains("b")).toBe(true);
    expect(list.contains("z")).toBe(false);
    expect(list.indexOf("c")).toBe(2);
    expect(list.indexOf("z")).toBe(-1);
  });

  test("clears all elements", () => {
    const list = new LinkedList<number>([1, 2, 3]);

    list.clear();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new LinkedList<number>([1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.addAt(2, 2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("toArray returns a shallow copy", () => {
    const list = new LinkedList<number>([1, 2, 3]);
    const snapshot = list.toArray();

    snapshot.push(4);

    expect(snapshot).toEqual([1, 2, 3, 4]);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });
});
