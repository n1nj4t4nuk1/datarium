import { describe, it, expect } from "bun:test";
import { inferHashCalculator } from "../../../src/lambda/hash-calculators/hash-calculator-inferrer";
import { NumberHashCalculator } from "../../../src/lambda/hash-calculators/number-hash-calculator";
import { StringHashCalculator } from "../../../src/lambda/hash-calculators/string-hash-calculator";

describe("HashCalculatorInferrer", () => {
  it("should infer NumberHashCalculator for number type", () => {
    const calculator = inferHashCalculator(42);
    expect(calculator).toBe(NumberHashCalculator);
  });

  it("should infer NumberHashCalculator for decimal numbers", () => {
    const calculator = inferHashCalculator(3.14);
    expect(calculator).toBe(NumberHashCalculator);
  });

  it("should infer NumberHashCalculator for negative numbers", () => {
    const calculator = inferHashCalculator(-100);
    expect(calculator).toBe(NumberHashCalculator);
  });

  it("should infer StringHashCalculator for string type", () => {
    const calculator = inferHashCalculator("hello");
    expect(calculator).toBe(StringHashCalculator);
  });

  it("should infer StringHashCalculator for empty string", () => {
    const calculator = inferHashCalculator("");
    expect(calculator).toBe(StringHashCalculator);
  });

  it("should infer StringHashCalculator for string with spaces", () => {
    const calculator = inferHashCalculator("hello world");
    expect(calculator).toBe(StringHashCalculator);
  });

  it("should throw error for boolean type", () => {
    expect(() => {
      inferHashCalculator(true);
    }).toThrow();
  });

  it("should throw error for object type", () => {
    expect(() => {
      inferHashCalculator({});
    }).toThrow();
  });

  it("should throw error for array type", () => {
    expect(() => {
      inferHashCalculator([]);
    }).toThrow();
  });

  it("should throw error for null", () => {
    expect(() => {
      inferHashCalculator(null);
    }).toThrow();
  });

  it("should throw error for undefined", () => {
    expect(() => {
      inferHashCalculator(undefined);
    }).toThrow();
  });

  it("should work with inferred calculator for number hash", () => {
    const calculator = inferHashCalculator(10);
    const hash = calculator(10);
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });

  it("should work with inferred calculator for string hash", () => {
    const calculator = inferHashCalculator("test");
    const hash = calculator("test");
    expect(typeof hash).toBe("number");
    expect(hash).toBeGreaterThanOrEqual(0);
  });
});
