import { describe, expect, test } from "bun:test";
import { NativeMapSet } from "../../../../src/core/collections/native-map-set/native-map-set";

describe("NativeMapSet", () => {
  test("creates an empty set by default", () => {
    const set = new NativeMapSet<string>();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("creates a set from initial values without duplicates", () => {
    const set = new NativeMapSet<string>(["b", "a", "b", "c", "a"]);

    expect(set.size()).toBe(3);
    expect(set.toArray()).toEqual(["b", "a", "c"]);
  });

  test("add returns true for new values and false for duplicates", () => {
    const set = new NativeMapSet<string>();

    expect(set.add("one")).toBe(true);
    expect(set.add("two")).toBe(true);
    expect(set.add("one")).toBe(false);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual(["one", "two"]);
  });

  test("contains works correctly", () => {
    const set = new NativeMapSet<string>(["x", "y"]);

    expect(set.contains("x")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and returns false when absent", () => {
    const set = new NativeMapSet<string>(["a", "b", "c"]);

    expect(set.remove("b")).toBe(true);
    expect(set.remove("b")).toBe(false);
    expect(set.toArray()).toEqual(["a", "c"]);
  });

  test("clear removes all values", () => {
    const set = new NativeMapSet<string>(["a", "b"]);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("toArray returns a shallow copy", () => {
    const set = new NativeMapSet<string>(["a", "b"]);
    const snapshot = set.toArray();

    snapshot.push("c");

    expect(snapshot).toEqual(["a", "b", "c"]);
    expect(set.toArray()).toEqual(["a", "b"]);
  });

  test("supports symbol values", () => {
    const first = Symbol("first");
    const second = Symbol("second");
    const set = new NativeMapSet<symbol>();

    expect(set.add(first)).toBe(true);
    expect(set.add(second)).toBe(true);
    expect(set.contains(first)).toBe(true);
    expect(set.contains(second)).toBe(true);
    expect(set.size()).toBe(2);
  });
});
