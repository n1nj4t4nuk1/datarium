import { describe, expect, test } from "bun:test";
import { AlphabeticalStringComparator } from "../../../src/strategy/order-comparators/alphabetical-string-comparator";

describe("AlphabeticalStringComparator", () => {
  test("returns zero for equal strings", () => {
    expect(AlphabeticalStringComparator("apple", "apple")).toBe(0);
  });

  test("returns negative when left comes first alphabetically", () => {
    expect(AlphabeticalStringComparator("apple", "banana")).toBeLessThan(0);
  });

  test("returns positive when left comes after alphabetically", () => {
    expect(AlphabeticalStringComparator("zebra", "banana")).toBeGreaterThan(0);
  });

  test("is case-sensitive according to localeCompare default behavior", () => {
    expect(AlphabeticalStringComparator("a", "A")).not.toBe(0);
  });
});
