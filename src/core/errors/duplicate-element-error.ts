export class DuplicateElementError extends Error {
  constructor(message = "Element already exists in collection") {
    super(message);
    this.name = "DuplicateElementError";
  }
}
