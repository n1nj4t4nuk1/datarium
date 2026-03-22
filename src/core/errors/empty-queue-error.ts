export class EmptyQueueError extends Error {
  constructor(message: string = "Queue is empty") {
    super(message);
    this.name = "EmptyQueueError";
    Object.setPrototypeOf(this, EmptyQueueError.prototype);
  }
}
