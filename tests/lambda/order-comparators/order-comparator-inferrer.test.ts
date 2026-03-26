import { describe, it, expect } from "bun:test";
import { inferOrderComparator } from "../../../src/lambda/order-comparators/order-comparator-inferrer";
import { BasicNumberComparator } from "../../../src/lambda/order-comparators/basic-number-comparator";
import { AlphabeticalStringComparator } from "../../../src/lambda/order-comparators/alphabetical-string-comparator";

describe("OrderComparatorInferrer", () => {
  it("should infer BasicNumberComparator for number type", () => {
    const comparator = inferOrderComparator(42);
    expect(comparator).toBe(BasicNumberComparator);
  });

  it("should infer BasicNumberComparator for decimal numbers", () => {
    const comparator = inferOrderComparator(3.14);
    expect(comparator).toBe(BasicNumberComparator);
  });

  it("should infer BasicNumberComparator for negative numbers", () => {
    const comparator = inferOrderComparator(-100);
    expect(comparator).toBe(BasicNumberComparator);
  });

  it("should infer AlphabeticalStringComparator for string type", () => {
    const comparator = inferOrderComparator("hello");
    expect(comparator).toBe(AlphabeticalStringComparator);
  });

  it("should infer AlphabeticalStringComparator for empty string", () => {
    const comparator = inferOrderComparator("");
    expect(comparator).toBe(AlphabeticalStringComparator);
  });

  it("should infer AlphabeticalStringComparator for string with spaces", () => {
    const comparator = inferOrderComparator("hello world");
    expect(comparator).toBe(AlphabeticalStringComparator);
  });

  it("should throw error for boolean type", () => {
    expect(() => {
      inferOrderComparator(true);
    }).toThrow();
  });

  it("should throw error for object type", () => {
    expect(() => {
      inferOrderComparator({});
    }).toThrow();
  });

  it("should throw error for array type", () => {
    expect(() => {
      inferOrderComparator([]);
    }).toThrow();
  });

  it("should throw error for null", () => {
    expect(() => {
      inferOrderComparator(null);
    }).toThrow();
  });

  it("should throw error for undefined", () => {
    expect(() => {
      inferOrderComparator(undefined);
    }).toThrow();
  });

  it("should work with inferred comparator for numbers", () => {
    const comparator = inferOrderComparator(10);
    expect(comparator(5, 10)).toBeLessThan(0);
    expect(comparator(10, 5)).toBeGreaterThan(0);
    expect(comparator(10, 10)).toBe(0);
  });

  it("should work with inferred comparator for strings", () => {
    const comparator = inferOrderComparator("test");
    expect(comparator("apple", "zebra")).toBeLessThan(0);
    expect(comparator("zebra", "apple")).toBeGreaterThan(0);
    expect(comparator("test", "test")).toBe(0);
  });
});
