import { describe, expect, test } from "bun:test";
import { StrategyBoundedSortedSet } from "../../../../../src/strategy/collections/sets/strategy-bounded-sorted-set/strategy-bounded-sorted-set";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";
import { ComparatorInferenceError } from "../../../../../src/strategy/errors/comparator-inference-error";

describe("StrategyBoundedSortedSet with basic types", () => {
  test("infers BasicNumberComparator from first element", () => {
    const set = new StrategyBoundedSortedSet<number>(4, undefined, [4, 1, 3, 2]);

    expect(set.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("throws ComparatorInferenceError when no comparator and no initial elements", () => {
    expect(() => {
      new StrategyBoundedSortedSet<number>(3);
    }).toThrow(ComparatorInferenceError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new StrategyBoundedSortedSet<number>(-1, (left, right) => left - right)).toThrow(
      InvalidCapacityError,
    );

    expect(() => new StrategyBoundedSortedSet<number>(1.5, (left, right) => left - right)).toThrow(
      InvalidCapacityError,
    );
  });

  test("ignores duplicate values when adding", () => {
    const set = new StrategyBoundedSortedSet<number>(4, (left, right) => left - right);

    set.add(3);
    set.add(1);
    set.add(1);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual([1, 3]);
  });

  test("ignores duplicate values during initialization", () => {
    const set = new StrategyBoundedSortedSet<number>(4, undefined, [3, 1, 2, 1]);

    expect(set.size()).toBe(3);
    expect(set.toArray()).toEqual([1, 2, 3]);
  });

  test("keeps numbers sorted ascending with explicit comparator", () => {
    const set = new StrategyBoundedSortedSet<number>(3, (left, right) => left - right);

    set.add(3);
    set.add(1);
    set.add(2);

    expect(set.toArray()).toEqual([1, 2, 3]);
    expect(set.size()).toBe(3);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const set = new StrategyBoundedSortedSet<number>(2, (left, right) => left - right, [2, 1]);

    expect(() => set.add(3)).toThrow(ListCapacityExceededError);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new StrategyBoundedSortedSet<number>(2, undefined, [3, 2, 1])).toThrow(
      ListCapacityExceededError,
    );
  });

  test("contains returns true for existing elements and false for missing", () => {
    const set = new StrategyBoundedSortedSet<number>(5, (left, right) => left - right, [1, 3, 5]);

    expect(set.contains(1)).toBe(true);
    expect(set.contains(3)).toBe(true);
    expect(set.contains(5)).toBe(true);
    expect(set.contains(2)).toBe(false);
    expect(set.contains(10)).toBe(false);
  });

  test("removes existing element and throws for missing", () => {
    const set = new StrategyBoundedSortedSet<number>(5, (left, right) => left - right, [1, 3, 5]);

    set.remove(3);

    expect(set.toArray()).toEqual([1, 5]);
    expect(set.size()).toBe(2);

    expect(() => set.remove(3)).toThrow(ElementNotFoundError);
  });

  test("isEmpty returns correct value", () => {
    const set = new StrategyBoundedSortedSet<number>(1, (left, right) => left - right);

    expect(set.isEmpty()).toBe(true);

    set.add(1);

    expect(set.isEmpty()).toBe(false);

    set.remove(1);

    expect(set.isEmpty()).toBe(true);
  });

  test("clear removes all elements", () => {
    const set = new StrategyBoundedSortedSet<number>(3, (left, right) => left - right, [1, 2, 3]);

    expect(set.size()).toBe(3);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("uses custom equality comparator when provided", () => {
    const set = new StrategyBoundedSortedSet<{ id: number; label: string }>(
      3,
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
});