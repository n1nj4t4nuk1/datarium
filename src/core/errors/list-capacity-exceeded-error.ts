export class ListCapacityExceededError extends Error {
  readonly capacity: number;

  constructor(capacity: number) {
    super(`List capacity exceeded: ${capacity}`);
    this.name = "ListCapacityExceededError";
    this.capacity = capacity;
    Object.setPrototypeOf(this, ListCapacityExceededError.prototype);
  }
}
