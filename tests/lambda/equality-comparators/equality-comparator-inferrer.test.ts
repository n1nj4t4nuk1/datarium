import { describe, it, expect } from "bun:test";
import { inferEqualityComparator } from "../../../src/lambda/equality-comparators/equality-comparator-inferrer";
import { BasicNumberEqualityComparator } from "../../../src/lambda/equality-comparators/basic-number-equality-comparator";
import { BasicStringEqualityComparator } from "../../../src/lambda/equality-comparators/basic-string-equality-comparator";

describe("EqualityComparatorInferrer", () => {
  it("should infer BasicNumberEqualityComparator for number type", () => {
    const comparator = inferEqualityComparator(42);
    expect(comparator).toBe(BasicNumberEqualityComparator);
  });

  it("should infer BasicNumberEqualityComparator for decimal numbers", () => {
    const comparator = inferEqualityComparator(3.14);
    expect(comparator).toBe(BasicNumberEqualityComparator);
  });

  it("should infer BasicNumberEqualityComparator for negative numbers", () => {
    const comparator = inferEqualityComparator(-100);
    expect(comparator).toBe(BasicNumberEqualityComparator);
  });

  it("should infer BasicStringEqualityComparator for string type", () => {
    const comparator = inferEqualityComparator("hello");
    expect(comparator).toBe(BasicStringEqualityComparator);
  });

  it("should infer BasicStringEqualityComparator for empty string", () => {
    const comparator = inferEqualityComparator("");
    expect(comparator).toBe(BasicStringEqualityComparator);
  });

  it("should infer BasicStringEqualityComparator for string with spaces", () => {
    const comparator = inferEqualityComparator("hello world");
    expect(comparator).toBe(BasicStringEqualityComparator);
  });

  it("should throw error for boolean type", () => {
    expect(() => {
      inferEqualityComparator(true);
    }).toThrow();
  });

  it("should throw error for object type", () => {
    expect(() => {
      inferEqualityComparator({});
    }).toThrow();
  });

  it("should throw error for array type", () => {
    expect(() => {
      inferEqualityComparator([]);
    }).toThrow();
  });

  it("should throw error for null", () => {
    expect(() => {
      inferEqualityComparator(null);
    }).toThrow();
  });

  it("should throw error for undefined", () => {
    expect(() => {
      inferEqualityComparator(undefined);
    }).toThrow();
  });

  it("should work with inferred comparator for number equality", () => {
    const comparator = inferEqualityComparator(10);
    expect(comparator(10, 10)).toBe(true);
    expect(comparator(10, 20)).toBe(false);
  });

  it("should work with inferred comparator for string equality", () => {
    const comparator = inferEqualityComparator("test");
    expect(comparator("test", "test")).toBe(true);
    expect(comparator("test", "other")).toBe(false);
  });
});
