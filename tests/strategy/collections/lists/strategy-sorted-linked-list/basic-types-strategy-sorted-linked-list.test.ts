import { describe, expect, test } from "bun:test";
import { IndexOutOfBoundsError } from "../../../../../src/core/errors/index-out-of-bounds-error";
import { StrategySortedLinkedList } from "../../../../../src/strategy/collections/lists/strategy-sorted-linked-list/strategy-sorted-linked-list";
import { ComparatorInferenceError } from "../../../../../src/strategy/errors/comparator-inference-error";

describe("StrategySortedLinkedList with basic types", () => {
  test("infers BasicNumberComparator from first element", () => {
    const list = new StrategySortedLinkedList<number>(undefined, [4, 1, 3, 2]);

    expect(list.toArray()).toEqual([1, 2, 3, 4]);
  });

  test("throws ComparatorInferenceError when no comparator and no initial elements", () => {
    expect(() => {
      new StrategySortedLinkedList<number>();
    }).toThrow(ComparatorInferenceError);
  });

  test("keeps numbers sorted ascending with explicit comparator", () => {
    const list = new StrategySortedLinkedList<number>((left, right) => left - right);

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("sorts initial number values using inferred comparator", () => {
    const list = new StrategySortedLinkedList<number>(undefined, [5, 1, 4, 2]);

    expect(list.toArray()).toEqual([1, 2, 4, 5]);
  });

  test("keeps float values sorted with inferred comparator", () => {
    const list = new StrategySortedLinkedList<number>(undefined, [3.14, 2.71, 1.41, 2.5]);

    expect(list.toArray()).toEqual([1.41, 2.5, 2.71, 3.14]);
  });

  test("keeps strings sorted alphabetically with inferred comparator", () => {
    const list = new StrategySortedLinkedList<string>(undefined, ["zebra", "apple", "banana"]);

    expect(list.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("addAt keeps sorted order with inferred comparator", () => {
    const list = new StrategySortedLinkedList<number>(
      (left, right) => left - right,
      [10, 30],
    );

    list.addAt(0, 20);

    expect(list.toArray()).toEqual([10, 20, 30]);
  });

  test("set keeps sorted order after replacing element", () => {
    const list = new StrategySortedLinkedList<number>((left, right) => left - right, [1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("throws IndexOutOfBoundsError when set uses invalid index", () => {
    const list = new StrategySortedLinkedList<number>((left, right) => left - right, [1]);

    expect(() => list.set(2, 10)).toThrow(IndexOutOfBoundsError);
  });

  test("uses inferred equality comparator for number contains/indexOf/remove", () => {
    const list = new StrategySortedLinkedList<number>(undefined, [3, 1, 2]);

    expect(list.contains(2)).toBe(true);
    expect(list.indexOf(2)).toBe(1);
    expect(list.remove(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
  });

  test("uses inferred equality comparator for string contains/indexOf/remove", () => {
    const list = new StrategySortedLinkedList<string>(undefined, ["zebra", "apple", "banana"]);

    expect(list.contains("banana")).toBe(true);
    expect(list.indexOf("banana")).toBe(1);
    expect(list.remove("banana")).toBe(true);
    expect(list.toArray()).toEqual(["apple", "zebra"]);
  });

  test("uses custom equality comparator when provided", () => {
    const list = new StrategySortedLinkedList<{ id: number; label: string }>(
      (left, right) => left.id - right.id,
      [
        { id: 1, label: "one" },
        { id: 2, label: "two" },
      ],
      (left, right) => left.id === right.id,
    );

    expect(list.contains({ id: 2, label: "other" })).toBe(true);
    expect(list.indexOf({ id: 2, label: "changed" })).toBe(1);
    expect(list.remove({ id: 2, label: "ignored" })).toBe(true);
    expect(list.toArray()).toEqual([{ id: 1, label: "one" }]);
  });
});
