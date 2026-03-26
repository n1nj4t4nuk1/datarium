import { describe, expect, test } from "bun:test";
import { ArraySet } from "../../../../../src/core/collections/sets/array-set/array-set";

describe("ArraySet", () => {
  test("creates an empty set by default", () => {
    const set = new ArraySet<number>();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("ignores duplicate initial values", () => {
    const set = new ArraySet<number>([3, 1, 2, 2, 1]);

    expect(set.size()).toBe(3);
    expect(set.toArray()).toEqual([1, 2, 3]);
  });

  test("add inserts new values and ignores duplicates", () => {
    const set = new ArraySet<number>();

    set.add(2);
    set.add(1);
    set.add(2);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual([1, 2]);
  });

  test("contains works correctly", () => {
    const set = new ArraySet<string>(["b", "a"]);

    expect(set.contains("a")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and ignores missing values", () => {
    const set = new ArraySet<number>([1, 2, 3]);

    set.remove(2);
    set.remove(2);
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
