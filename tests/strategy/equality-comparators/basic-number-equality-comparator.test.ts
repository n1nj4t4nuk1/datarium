import { describe, expect, test } from "bun:test";
import { BasicNumberEqualityComparator } from "../../../src/strategy/equality-comparators/basic-number-equality-comparator";

describe("BasicNumberEqualityComparator", () => {
  test("returns true for identical integer values", () => {
    expect(BasicNumberEqualityComparator(10, 10)).toBe(true);
  });

  test("returns true for identical float values", () => {
    expect(BasicNumberEqualityComparator(3.14, 3.14)).toBe(true);
  });

  test("returns false for different values", () => {
    expect(BasicNumberEqualityComparator(10, 11)).toBe(false);
  });

  test("uses strict equality behavior for NaN", () => {
    expect(BasicNumberEqualityComparator(Number.NaN, Number.NaN)).toBe(false);
  });
});
