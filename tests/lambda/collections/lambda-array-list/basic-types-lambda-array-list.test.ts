import { describe, expect, test } from "bun:test";
import { LambdaArrayList } from "../../../../src/lambda/collections/lambda-array-list/lambda-array-list";

describe("LambdaArrayList with basic types", () => {
  test("keeps numbers sorted ascending on add", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right);

    list.add(3);
    list.add(1);
    list.add(2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("sorts initial number values in constructor", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right, [5, 1, 4, 2]);

    expect(list.toArray()).toEqual([1, 2, 4, 5]);
  });

  test("keeps float values sorted", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right, [3.14, 2.71, 1.41]);

    list.add(2.5);

    expect(list.toArray()).toEqual([1.41, 2.5, 2.71, 3.14]);
  });

  test("keeps strings sorted alphabetically", () => {
    const list = new LambdaArrayList<string>((left, right) => left.localeCompare(right));

    list.add("zebra");
    list.add("apple");
    list.add("banana");

    expect(list.toArray()).toEqual(["apple", "banana", "zebra"]);
  });

  test("addAt keeps sorted order even with arbitrary index", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right, [10, 30]);

    list.addAt(0, 20);

    expect(list.toArray()).toEqual([10, 20, 30]);
  });

  test("set keeps sorted order after replacing element", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right, [1, 3, 5]);

    const previous = list.set(1, 4);

    expect(previous).toBe(3);
    expect(list.toArray()).toEqual([1, 4, 5]);
  });

  test("throws RangeError when set uses invalid index", () => {
    const list = new LambdaArrayList<number>((left, right) => left - right, [1]);

    expect(() => list.set(2, 10)).toThrow(RangeError);
  });
});
