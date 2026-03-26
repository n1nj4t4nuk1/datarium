import { describe, expect, test } from "bun:test";
import { NativeMapSet } from "../../../../../src/core/collections/sets/native-map-set/native-map-set";

describe("NativeMapSet", () => {
  test("creates an empty set by default", () => {
    const set = new NativeMapSet<string>();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("ignores duplicate initial values", () => {
    const set = new NativeMapSet<string>(["b", "a", "b", "c", "a"]);

    expect(set.size()).toBe(3);
    expect(set.toArray()).toEqual(["b", "a", "c"]);
  });

  test("add inserts new values and ignores duplicates", () => {
    const set = new NativeMapSet<string>();

    set.add("one");
    set.add("two");
    set.add("one");

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual(["one", "two"]);
  });

  test("contains works correctly", () => {
    const set = new NativeMapSet<string>(["x", "y"]);

    expect(set.contains("x")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and ignores missing values", () => {
    const set = new NativeMapSet<string>(["a", "b", "c"]);

    set.remove("b");
    set.remove("b");
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

    set.add(first);
    set.add(second);
    expect(set.contains(first)).toBe(true);
    expect(set.contains(second)).toBe(true);
    expect(set.size()).toBe(2);
  });
});
