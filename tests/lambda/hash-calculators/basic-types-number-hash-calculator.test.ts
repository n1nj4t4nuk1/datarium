import { describe, it, expect } from "bun:test";
import { NumberHashCalculator } from "../../../src/lambda/hash-calculators/number-hash-calculator";

describe("NumberHashCalculator", () => {
  it("should return a number hash for positive integers", () => {
    const hash = NumberHashCalculator(42);
    expect(typeof hash).toBe("number");
  });

  it("should return a positive hash", () => {
    const hash = NumberHashCalculator(123);
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should return the same hash for the same number", () => {
    const hash1 = NumberHashCalculator(100);
    const hash2 = NumberHashCalculator(100);
    expect(hash1).toBe(hash2);
  });

  it("should return different hashes for different numbers", () => {
    const hash1 = NumberHashCalculator(1);
    const hash2 = NumberHashCalculator(2);
    expect(hash1).not.toBe(hash2);
  });

  it("should handle negative numbers", () => {
    const hash = NumberHashCalculator(-42);
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should handle zero", () => {
    const hash = NumberHashCalculator(0);
    expect(typeof hash).toBe("number");
  });

  it("should handle large numbers", () => {
    const hash = NumberHashCalculator(1000000);
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should handle decimal numbers", () => {
    const hash1 = NumberHashCalculator(3.14);
    const hash2 = NumberHashCalculator(3.14);
    expect(hash1).toBe(hash2);
  });
});
