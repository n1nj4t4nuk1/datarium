import { describe, it, expect } from "bun:test";
import { IndexOutOfBoundsError } from "../../../src/core/errors/index-out-of-bounds-error";

describe("IndexOutOfBoundsError", () => {
  it("should be an Error instance", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error).toBeInstanceOf(Error);
  });

  it("should have correct name", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error.name).toBe("IndexOutOfBoundsError");
  });

  it("should contain index and size in message", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error.message).toContain("5");
    expect(error.message).toContain("2");
  });

  it("should store index property", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error.index).toBe(5);
  });

  it("should store size property", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error.size).toBe(2);
  });

  it("should have correct prototype", () => {
    const error = new IndexOutOfBoundsError(5, 2);
    expect(error instanceof IndexOutOfBoundsError).toBe(true);
  });

  it("should throw correctly", () => {
    expect(() => {
      throw new IndexOutOfBoundsError(10, 5);
    }).toThrow(IndexOutOfBoundsError);
  });

  it("should work with negative index", () => {
    const error = new IndexOutOfBoundsError(-1, 5);
    expect(error.index).toBe(-1);
    expect(error.size).toBe(5);
  });
});
