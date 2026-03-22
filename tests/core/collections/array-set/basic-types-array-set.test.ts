import { describe, expect, test } from "bun:test";
import { ArraySet } from "../../../../src/core/collections/array-set/array-set";
import { DuplicateElementError } from "../../../../src/core/errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../../src/core/errors/element-not-found-error";

describe("ArraySet", () => {
  test("creates an empty set by default", () => {
    const set = new ArraySet<number>();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("throws DuplicateElementError when initial values contain duplicates", () => {
    expect(() => new ArraySet<number>([3, 1, 2, 2, 1])).toThrow(DuplicateElementError);
  });

  test("add inserts new values and throws for duplicates", () => {
    const set = new ArraySet<number>();

    set.add(2);
    set.add(1);
    expect(() => set.add(2)).toThrow(DuplicateElementError);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual([1, 2]);
  });

  test("contains works correctly", () => {
    const set = new ArraySet<string>(["b", "a"]);

    expect(set.contains("a")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and throws when absent", () => {
    const set = new ArraySet<number>([1, 2, 3]);

    set.remove(2);
    expect(() => set.remove(2)).toThrow(ElementNotFoundError);
    expect(set.toArray()).toEqual([1, 3]);
  });

  test("clear removes all values", () => {
    const set = new ArraySet<number>([1, 2, 3]);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const set = new ArraySet<number>([1, 2]);
    const snapshot = set.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(set.toArray()).toEqual([1, 2]);
  });
});
