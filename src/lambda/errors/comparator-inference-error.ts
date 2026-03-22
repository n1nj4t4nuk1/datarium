export class ComparatorInferenceError extends Error {
  constructor(message: string = "Cannot infer comparator: no comparator provided and no initial elements to infer from") {
    super(message);
    this.name = "ComparatorInferenceError";
    Object.setPrototypeOf(this, ComparatorInferenceError.prototype);
  }
}
