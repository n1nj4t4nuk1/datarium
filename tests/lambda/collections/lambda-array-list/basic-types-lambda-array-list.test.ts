import { describe, expect, test } from "bun:test";
import { LambdaArrayList } from "../../../../src/lambda/collections/lambda-array-list/lambda-array-list";
import { ElementNotFoundError } from "../../../../src/core/errors/element-not-found-error";
import { IndexOutOfBoundsError } from "../../../../src/core/errors/index-out-of-bounds-error";

describe("LambdaArrayList (unsorted)", () => {
  test("creates an empty list by default", () => {
    const list = new LambdaArrayList<number>();

    expect(list.size()).toBe(0);
    expect(list.isEmpty()).toBe(true);
    expect(list.toArray()).toEqual([]);
  });

  test("creates a list from initial elements preserving order", () => {
    const list = new LambdaArrayList<number>([3, 1, 2]);

    expect(list.toArray()).toEqual([3, 1, 2]);
  });

  test("add appends at the end and does not sort", () => {
    const list = new LambdaArrayList<number>([3, 1]);

    list.add(2);

    expect(list.toArray()).toEqual([3, 1, 2]);
  });

  test("addAt inserts at explicit index", () => {
    const list = new LambdaArrayList<number>([1, 3]);

    list.addAt(1, 2);

    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  test("set replaces element at index", () => {
    const list = new LambdaArrayList<number>([1, 2, 3]);

    const previous = list.set(1, 20);

    expect(previous).toBe(2);
    expect(list.toArray()).toEqual([1, 20, 3]);
  });

  test("contains/indexOf/remove use default equality behavior", () => {
    const list = new LambdaArrayList<string>(["a", "b", "c"]);

    expect(list.contains("b")).toBe(true);
    expect(list.indexOf("c")).toBe(2);
    list.remove("b");
    expect(list.toArray()).toEqual(["a", "c"]);
    expect(() => list.indexOf("z")).toThrow(ElementNotFoundError);
  });

  test("throws IndexOutOfBoundsError for invalid indexes", () => {
    const list = new LambdaArrayList<number>([1]);

    expect(() => list.get(-1)).toThrow(IndexOutOfBoundsError);
    expect(() => list.get(2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.addAt(2, 2)).toThrow(IndexOutOfBoundsError);
    expect(() => list.removeAt(5)).toThrow(IndexOutOfBoundsError);
  });
});
