export class InvalidCapacityError extends Error {
  readonly capacity: number;

  constructor(capacity: number) {
    super(`Invalid capacity: ${capacity}. Capacity must be a non-negative integer.`);
    this.name = "InvalidCapacityError";
    this.capacity = capacity;
    Object.setPrototypeOf(this, InvalidCapacityError.prototype);
  }
}
