import { describe, it, expect } from "bun:test";
import { StringHashCalculator } from "../../../src/lambda/hash-calculators/string-hash-calculator";

describe("StringHashCalculator", () => {
  it("should return a number hash for strings", () => {
    const hash = StringHashCalculator("hello");
    expect(typeof hash).toBe("number");
  });

  it("should return a positive hash", () => {
    const hash = StringHashCalculator("test");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should return the same hash for the same string", () => {
    const hash1 = StringHashCalculator("datarium");
    const hash2 = StringHashCalculator("datarium");
    expect(hash1).toBe(hash2);
  });

  it("should return different hashes for different strings", () => {
    const hash1 = StringHashCalculator("apple");
    const hash2 = StringHashCalculator("banana");
    expect(hash1).not.toBe(hash2);
  });

  it("should handle empty string", () => {
    const hash = StringHashCalculator("");
    expect(typeof hash).toBe("number");
  });

  it("should handle strings with spaces", () => {
    const hash1 = StringHashCalculator("hello world");
    const hash2 = StringHashCalculator("hello world");
    expect(hash1).toBe(hash2);
  });

  it("should handle strings with special characters", () => {
    const hash = StringHashCalculator("@#$%^&*()");
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should be case-sensitive", () => {
    const hash1 = StringHashCalculator("Hello");
    const hash2 = StringHashCalculator("hello");
    expect(hash1).not.toBe(hash2);
  });
});
