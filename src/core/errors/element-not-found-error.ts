export class ElementNotFoundError extends Error {
  constructor(message = "Element not found in collection") {
    super(message);
    this.name = "ElementNotFoundError";
  }
}
