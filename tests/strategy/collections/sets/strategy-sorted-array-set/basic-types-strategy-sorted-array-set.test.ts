import { describe, expect, test } from "bun:test";
import { StrategySortedArraySet } from "../../../../../src/strategy/collections/sets/strategy-sorted-array-set/strategy-sorted-array-set";
import { ComparatorInferenceError } from "../../../../../src/strategy/errors/comparator-inference-error";

describe("StrategySortedArraySet with basic types", () => {
  test("infers BasicNumberComparator from first element", () => {
    const set = new StrategySortedArraySet<number>(undefined, [4, 1, 3, 2]);

    expect(set.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("throws ComparatorInferenceError when no comparator and no initial elements", () => {
    expect(() => {
      new StrategySortedArraySet<number>();
    }).toThrow(ComparatorInferenceError);
  });

  test("ignores duplicate values when adding", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right);

    set.add(3);
    set.add(1);
    set.add(1);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual([1, 3]);
  });

  test("ignores duplicate values during initialization", () => {
    const set = new StrategySortedArraySet<number>(undefined, [3, 1, 2, 1]);

    expect(set.size()).toBe(3);
    expect(set.toArray()).toEqual([1, 2, 3]);
  });

  test("keeps numbers sorted ascending with explicit comparator", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right);

    set.add(3);
    set.add(1);
    set.add(2);

    expect(set.toArray()).toEqual([1, 2, 3]);
    expect(set.size()).toBe(3);
  });

  test("keeps float values sorted with inferred comparator", () => {
    const set = new StrategySortedArraySet<number>(undefined, [3.14, 2.71, 1.41, 2.5]);

    expect(set.toArray()).toEqual([1.41, 2.5, 2.71, 3.14]);
  });

  test("keeps strings sorted alphabetically with inferred comparator", () => {
    const set = new StrategySortedArraySet<string>(undefined, ["zebra", "apple", "banana"]);

    expect(set.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("ignores duplicate string when adding", () => {
    const set = new StrategySortedArraySet<string>(undefined, ["apple", "banana"]);

    set.add("apple");

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual(["apple", "banana"]);
  });

  test("contains returns true for existing elements and false for missing", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right, [1, 3, 5]);

    expect(set.contains(1)).toBe(true);
    expect(set.contains(3)).toBe(true);
    expect(set.contains(5)).toBe(true);
    expect(set.contains(2)).toBe(false);
    expect(set.contains(10)).toBe(false);
  });

  test("removes existing element and ignores missing", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right, [1, 3, 5]);

    set.remove(3);
    set.remove(3);

    expect(set.toArray()).toEqual([1, 5]);
    expect(set.size()).toBe(2);
  });

  test("isEmpty returns correct value", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right);

    expect(set.isEmpty()).toBe(true);

    set.add(1);

    expect(set.isEmpty()).toBe(false);

    set.remove(1);

    expect(set.isEmpty()).toBe(true);
  });

  test("clear removes all elements", () => {
    const set = new StrategySortedArraySet<number>((left, right) => left - right, [1, 2, 3]);

    expect(set.size()).toBe(3);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("uses custom equality comparator when provided", () => {
    const set = new StrategySortedArraySet<{ id: number; label: string }>(
      (left, right) => left.id - right.id,
      [
        { id: 1, label: "one" },
        { id: 2, label: "two" },
        { id: 3, label: "three" },
      ],
      (left, right) => left.id === right.id,
    );

    expect(set.contains({ id: 2, label: "other" })).toBe(true);
    expect(set.contains({ id: 5, label: "five" })).toBe(false);

    set.add({ id: 2, label: "different" });

    expect(set.size()).toBe(3);
    expect(set.toArray().map((item) => item.id)).toEqual([1, 2, 3]);
  });

  test("removes element using custom equality comparator", () => {
    const set = new StrategySortedArraySet<{ id: number; label: string }>(
      (left, right) => left.id - right.id,
      [
        { id: 1, label: "one" },
        { id: 2, label: "two" },
        { id: 3, label: "three" },
      ],
      (left, right) => left.id === right.id,
    );

    set.remove({ id: 2, label: "ignored" });

    expect(set.size()).toBe(2);
    expect(set.contains({ id: 2, label: "anything" })).toBe(false);
  });
});
