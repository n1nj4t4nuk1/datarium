import { describe, expect, test } from "bun:test";
import { NativeMap } from "../../../../src/core/collections/native-map/native-map";

describe("NativeMap", () => {
  test("creates an empty map by default", () => {
    const map = new NativeMap<string, number>();

    expect(map.size()).toBe(0);
    expect(map.isEmpty()).toBe(true);
    expect(map.keys()).toEqual([]);
    expect(map.values()).toEqual([]);
    expect(map.entries()).toEqual([]);
  });

  test("put adds a new key-value pair", () => {
    const map = new NativeMap<string, number>();

    expect(map.put("one", 1)).toBeUndefined();
    expect(map.size()).toBe(1);
    expect(map.get("one")).toBe(1);
    expect(map.containsKey("one")).toBe(true);
    expect(map.containsValue(1)).toBe(true);
  });

  test("put on existing key replaces value and returns previous one", () => {
    const map = new NativeMap<string, number>();

    map.put("one", 1);

    expect(map.put("one", 11)).toBe(1);
    expect(map.size()).toBe(1);
    expect(map.get("one")).toBe(11);
  });

  test("get returns undefined for missing keys", () => {
    const map = new NativeMap<string, number>();

    expect(map.get("missing")).toBeUndefined();
  });

  test("remove deletes key and returns previous value", () => {
    const map = new NativeMap<string, number>();

    map.put("one", 1);
    map.put("two", 2);

    expect(map.remove("one")).toBe(1);
    expect(map.remove("one")).toBeUndefined();
    expect(map.size()).toBe(1);
    expect(map.containsKey("one")).toBe(false);
    expect(map.keys()).toEqual(["two"]);
  });

  test("clear removes all pairs", () => {
    const map = new NativeMap<string, number>();

    map.put("one", 1);
    map.put("two", 2);

    map.clear();

    expect(map.size()).toBe(0);
    expect(map.isEmpty()).toBe(true);
    expect(map.entries()).toEqual([]);
  });

  test("keys, values and entries preserve insertion order", () => {
    const map = new NativeMap<string, number>();

    map.put("a", 1);
    map.put("b", 2);
    map.put("c", 3);

    expect(map.keys()).toEqual(["a", "b", "c"]);
    expect(map.values()).toEqual([1, 2, 3]);
    expect(map.entries()).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  test("supports numeric keys", () => {
    const map = new NativeMap<number, string>();

    map.put(1, "one");
    map.put(2, "two");

    expect(map.get(1)).toBe("one");
    expect(map.get(2)).toBe("two");
    expect(map.keys()).toEqual([1, 2]);
  });
});
