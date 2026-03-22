import { describe, expect, test } from "bun:test";
import { ReverseAlphabeticalStringComparator } from "../../../src/strategy/order-comparators/reverse-alphabetical-string-comparator";

describe("ReverseAlphabeticalStringComparator", () => {
  test("returns zero for equal strings", () => {
    expect(ReverseAlphabeticalStringComparator("apple", "apple")).toBe(0);
  });

  test("returns positive when left comes first alphabetically", () => {
    expect(ReverseAlphabeticalStringComparator("apple", "banana")).toBeGreaterThan(0);
  });

  test("returns negative when left comes after alphabetically", () => {
    expect(ReverseAlphabeticalStringComparator("zebra", "banana")).toBeLessThan(0);
  });

  test("is case-sensitive according to localeCompare default behavior", () => {
    expect(ReverseAlphabeticalStringComparator("a", "A")).not.toBe(0);
  });
});
