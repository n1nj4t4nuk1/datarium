import { describe, expect, test } from "bun:test";
import { IndexOutOfBoundsError } from "../../../../src/core/errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../src/core/errors/list-capacity-exceeded-error";
import { StrategyBoundedSortedArrayList } from "../../../../src/strategy/collections/strategy-bounded-sorted-array-list/strategy-bounded-sorted-array-list";
import { ComparatorInferenceError } from "../../../../src/strategy/errors/comparator-inference-error";

describe("StrategyBoundedSortedArrayList with basic types", () => {
  test("infers BasicNumberComparator from first element", () => {
    const list = new StrategyBoundedSortedArrayList<number>(4, undefined, [4, 1, 3, 2]);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("throws ComparatorInferenceError when no comparator and no initial elements", () => {
    expect(() => {
      new StrategyBoundedSortedArrayList<number>(3);
    }).toThrow(ComparatorInferenceError);
  });

  test("keeps numbers sorted ascending with explicit comparator", () => {
    const list = new StrategyBoundedSortedArrayList<number>(3, (left, right) => left - right);

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const list = new StrategyBoundedSortedArrayList<number>(2, (left, right) => left - right, [2, 1]);

    expect(() => list.add(3)).toThrow(ListCapacityExceededError);
    expect(() => list.addAt(0, 0)).toThrow(ListCapacityExceededError);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new StrategyBoundedSortedArrayList<number>(2, undefined, [3, 2, 1])).toThrow(
      ListCapacityExceededError,
    );
  });

  test("set keeps sorted order after replacing element", () => {
    const list = new StrategyBoundedSortedArrayList<number>(3, (left, right) => left - right, [1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("uses inferred equality comparator for contains/indexOf/remove", () => {
    const list = new StrategyBoundedSortedArrayList<number>(5, undefined, [3, 1, 2]);

    expect(list.contains(2)).toBe(true);
    expect(list.indexOf(2)).toBe(1);
    expect(list.remove(2)).toBe(true);
    expect(list.remove(9)).toBe(false);
    expect(list.indexOf(9)).toBe(-1);
    expect(list.toArray()).toEqual([1, 3]);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new StrategyBoundedSortedArrayList<number>(1, (left, right) => left - right, [1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.set(2, 10)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new StrategyBoundedSortedArrayList<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new StrategyBoundedSortedArrayList<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
