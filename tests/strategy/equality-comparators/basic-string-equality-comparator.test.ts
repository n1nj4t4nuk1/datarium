import { describe, expect, test } from "bun:test";
import { BasicStringEqualityComparator } from "../../../src/strategy/equality-comparators/basic-string-equality-comparator";

describe("BasicStringEqualityComparator", () => {
  test("returns true for identical strings", () => {
    expect(BasicStringEqualityComparator("hello", "hello")).toBe(true);
  });

  test("returns false for strings with different content", () => {
    expect(BasicStringEqualityComparator("hello", "world")).toBe(false);
  });

  test("returns false for strings with different casing", () => {
    expect(BasicStringEqualityComparator("Hello", "hello")).toBe(false);
  });

  test("returns true for two empty strings", () => {
    expect(BasicStringEqualityComparator("", "")).toBe(true);
  });
});
