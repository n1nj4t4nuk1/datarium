import { describe, it, expect } from "bun:test";
import { ComparatorInferenceError } from "../../../src/lambda/errors/comparator-inference-error";

describe("ComparatorInferenceError", () => {
  it("should be an Error instance", () => {
    const error = new ComparatorInferenceError();
    expect(error).toBeInstanceOf(Error);
  });

  it("should have correct name", () => {
    const error = new ComparatorInferenceError();
    expect(error.name).toBe("ComparatorInferenceError");
  });

  it("should use default message", () => {
    const error = new ComparatorInferenceError();
    expect(error.message).toContain("Cannot infer comparator");
  });

  it("should use custom message if provided", () => {
    const customMessage = "Custom error message";
    const error = new ComparatorInferenceError(customMessage);
    expect(error.message).toBe(customMessage);
  });

  it("should have correct prototype", () => {
    const error = new ComparatorInferenceError();
    expect(error instanceof ComparatorInferenceError).toBe(true);
  });

  it("should throw correctly", () => {
    expect(() => {
      throw new ComparatorInferenceError();
    }).toThrow(ComparatorInferenceError);
  });

  it("should throw with custom message", () => {
    expect(() => {
      throw new ComparatorInferenceError("Test message");
    }).toThrow("Test message");
  });
});
