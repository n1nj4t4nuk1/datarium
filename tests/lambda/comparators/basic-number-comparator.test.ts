import { describe, expect, test } from "bun:test";
import { BasicNumberComparator } from "../../../src/lambda/comparators/basic-number-comparator";

describe("BasicNumberComparator", () => {
  test("returns zero for equal numbers", () => {
    expect(BasicNumberComparator(7, 7)).toBe(0);
  });

  test("returns negative when left is smaller", () => {
    expect(BasicNumberComparator(2, 5)).toBeLessThan(0);
  });

  test("returns positive when left is greater", () => {
    expect(BasicNumberComparator(9, 3)).toBeGreaterThan(0);
  });

  test("works with float values", () => {
    expect(BasicNumberComparator(2.5, 2.7)).toBeLessThan(0);
    expect(BasicNumberComparator(3.14, 2.71)).toBeGreaterThan(0);
  });
});
