import { describe, expect, test } from "bun:test";
import { EmptyQueueError } from "../../../src/core/errors/empty-queue-error";

describe("EmptyQueueError", () => {
  test("should be an Error instance", () => {
    const error = new EmptyQueueError();
    expect(error).toBeInstanceOf(Error);
  });

  test("should have correct name", () => {
    const error = new EmptyQueueError();
    expect(error.name).toBe("EmptyQueueError");
  });

  test("should use default message", () => {
    const error = new EmptyQueueError();
    expect(error.message).toBe("Queue is empty");
  });

  test("should use custom message if provided", () => {
    const error = new EmptyQueueError("Custom queue error");
    expect(error.message).toBe("Custom queue error");
  });

  test("should have correct prototype", () => {
    const error = new EmptyQueueError();
    expect(error instanceof EmptyQueueError).toBe(true);
  });

  test("should throw correctly", () => {
    expect(() => {
      throw new EmptyQueueError();
    }).toThrow(EmptyQueueError);
  });
});
