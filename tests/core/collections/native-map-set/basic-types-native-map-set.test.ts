import { describe, expect, test } from "bun:test";
import { NativeMapSet } from "../../../../src/core/collections/native-map-set/native-map-set";
import { DuplicateElementError } from "../../../../src/core/errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../../src/core/errors/element-not-found-error";

describe("NativeMapSet", () => {
  test("creates an empty set by default", () => {
    const set = new NativeMapSet<string>();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("throws DuplicateElementError when initial values contain duplicates", () => {
    expect(() => new NativeMapSet<string>(["b", "a", "b", "c", "a"])).toThrow(DuplicateElementError);
  });

  test("add inserts new values and throws for duplicates", () => {
    const set = new NativeMapSet<string>();

    set.add("one");
    set.add("two");
    expect(() => set.add("one")).toThrow(DuplicateElementError);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual(["one", "two"]);
  });

  test("contains works correctly", () => {
    const set = new NativeMapSet<string>(["x", "y"]);

    expect(set.contains("x")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and throws when absent", () => {
    const set = new NativeMapSet<string>(["a", "b", "c"]);

    set.remove("b");
    expect(() => set.remove("b")).toThrow(ElementNotFoundError);
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
