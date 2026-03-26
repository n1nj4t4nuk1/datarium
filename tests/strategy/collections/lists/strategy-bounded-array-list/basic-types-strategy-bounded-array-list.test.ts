import { describe, expect, test } from "bun:test";
import { StrategyBoundedArrayList } from "../../../../../src/strategy/collections/lists/strategy-bounded-array-list/strategy-bounded-array-list";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../../src/core/errors/index-out-of-bounds-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("StrategyBoundedArrayList (unsorted)", () => {
  test("creates an empty list with fixed capacity", () => {
    const list = new StrategyBoundedArrayList<number>(3);

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("creates a list from initial elements preserving order", () => {
    const list = new StrategyBoundedArrayList<number>(3, [3, 1, 2]);

    expect(list.toArray()).toEqual([3, 1, 2]);
  });

  test("throws ListCapacityExceededError when initial elements exceed capacity", () => {
    expect(() => new StrategyBoundedArrayList<number>(2, [1, 2, 3])).toThrow(
      ListCapacityExceededError,
    );
  });

  test("add appends at the end while there is capacity", () => {
    const list = new StrategyBoundedArrayList<number>(3, [3, 1]);

    list.add(2);

    expect(list.toArray()).toEqual([3, 1, 2]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const list = new StrategyBoundedArrayList<number>(2, [1, 2]);

    expect(() => list.add(3)).toThrow(ListCapacityExceededError);
  });

  test("addAt inserts at explicit index", () => {
    const list = new StrategyBoundedArrayList<number>(3, [1, 3]);

    list.addAt(1, 2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("set replaces element at index", () => {
    const list = new StrategyBoundedArrayList<number>(3, [1, 2, 3]);

    const previous = list.set(1, 20);

    expect(previous).toBe(2);
    expect(list.toArray()).toEqual([1, 20, 3]);
  });

  test("contains/indexOf/remove use default equality behavior", () => {
    const list = new StrategyBoundedArrayList<string>(3, ["a", "b", "c"]);

    expect(list.contains("b")).toBe(true);
    expect(list.indexOf("c")).toBe(2);
    list.remove("b");
    expect(list.toArray()).toEqual(["a", "c"]);
    expect(() => list.indexOf("z")).toThrow(ElementNotFoundError);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new StrategyBoundedArrayList<number>(1, [1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.addAt(2, 2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new StrategyBoundedArrayList<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new StrategyBoundedArrayList<number>(1.5)).toThrow(InvalidCapacityError);
  });
});
