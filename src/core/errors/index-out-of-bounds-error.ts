export class IndexOutOfBoundsError extends Error {
  readonly index: number;
  readonly size: number;

  constructor(index: number, size: number) {
    super(`Index out of bounds: ${index}, Size: ${size}`);
    this.name = "IndexOutOfBoundsError";
    this.index = index;
    this.size = size;
    Object.setPrototypeOf(this, IndexOutOfBoundsError.prototype);
  }
}
