export class KeyNotFoundError extends Error {
  constructor(message = "Key not found in map") {
    super(message);
    this.name = "KeyNotFoundError";
  }
}
