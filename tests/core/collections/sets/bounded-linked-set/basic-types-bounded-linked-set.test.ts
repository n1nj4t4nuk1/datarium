import { describe, expect, test } from "bun:test";
import { BoundedLinkedSet } from "../../../../../src/core/collections/sets/bounded-linked-set/bounded-linked-set";
import { DuplicateElementError } from "../../../../../src/core/errors/duplicate-element-error";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { InvalidCapacityError } from "../../../../../src/core/errors/invalid-capacity-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

describe("BoundedLinkedSet", () => {
  test("creates an empty set by default", () => {
    const set = new BoundedLinkedSet<number>(3);

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("throws DuplicateElementError when initial values contain duplicates", () => {
    expect(() => new BoundedLinkedSet<number>(3, [3, 1, 2, 2, 1])).toThrow(DuplicateElementError);
  });

  test("add inserts new values and throws for duplicates", () => {
    const set = new BoundedLinkedSet<number>(2);

    set.add(2);
    set.add(1);
    expect(() => set.add(2)).toThrow(DuplicateElementError);

    expect(set.size()).toBe(2);
    expect(set.toArray()).toEqual([1, 2]);
  });

  test("contains works correctly", () => {
    const set = new BoundedLinkedSet<string>(2, ["b", "a"]);

    expect(set.contains("a")).toBe(true);
    expect(set.contains("z")).toBe(false);
  });

  test("remove deletes existing value and throws when absent", () => {
    const set = new BoundedLinkedSet<number>(3, [1, 2, 3]);

    set.remove(2);
    expect(() => set.remove(2)).toThrow(ElementNotFoundError);
    expect(set.toArray()).toEqual([1, 3]);
  });

  test("clear removes all values", () => {
    const set = new BoundedLinkedSet<number>(3, [1, 2, 3]);

    set.clear();

    expect(set.size()).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.toArray()).toEqual([]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const set = new BoundedLinkedSet<number>(2, [1, 2]);

    expect(() => set.add(3)).toThrow(ListCapacityExceededError);
  });

  test("throws InvalidCapacityError for invalid capacity", () => {
    expect(() => new BoundedLinkedSet<number>(-1)).toThrow(InvalidCapacityError);
    expect(() => new BoundedLinkedSet<number>(1.5)).toThrow(InvalidCapacityError);
  });

  test("toArray returns a shallow copy", () => {
    const set = new BoundedLinkedSet<number>(2, [1, 2]);
    const snapshot = set.toArray();

    snapshot.push(3);

    expect(snapshot).toEqual([1, 2, 3]);
    expect(set.toArray()).toEqual([1, 2]);
  });
});
