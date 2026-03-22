import { describe, expect, test } from "bun:test";
import { ReverseBasicNumberComparator } from "../../../src/strategy/order-comparators/reverse-basic-number-comparator";

describe("ReverseBasicNumberComparator", () => {
  test("returns zero for equal numbers", () => {
    expect(ReverseBasicNumberComparator(7, 7)).toBe(0);
  });

  test("returns positive when left is smaller", () => {
    expect(ReverseBasicNumberComparator(2, 5)).toBeGreaterThan(0);
  });

  test("returns negative when left is greater", () => {
    expect(ReverseBasicNumberComparator(9, 3)).toBeLessThan(0);
  });

  test("works with float values", () => {
    expect(ReverseBasicNumberComparator(2.5, 2.7)).toBeGreaterThan(0);
    expect(ReverseBasicNumberComparator(3.14, 2.71)).toBeLessThan(0);
  });
});
