import { describe, expect, test } from "bun:test";
import { EmptyStackError } from "../../../src/core/errors/empty-stack-error";

describe("EmptyStackError", () => {
  test("should be an Error instance", () => {
    const error = new EmptyStackError();
    expect(error).toBeInstanceOf(Error);
  });

  test("should have correct name", () => {
    const error = new EmptyStackError();
    expect(error.name).toBe("EmptyStackError");
  });

  test("should use default message", () => {
    const error = new EmptyStackError();
    expect(error.message).toBe("Stack is empty");
  });

  test("should use custom message if provided", () => {
    const error = new EmptyStackError("Custom stack error");
    expect(error.message).toBe("Custom stack error");
  });

  test("should have correct prototype", () => {
    const error = new EmptyStackError();
    expect(error instanceof EmptyStackError).toBe(true);
  });

  test("should throw correctly", () => {
    expect(() => {
      throw new EmptyStackError();
    }).toThrow(EmptyStackError);
  });
});
