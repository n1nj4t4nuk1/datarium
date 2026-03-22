export class EmptyStackError extends Error {
  constructor(message: string = "Stack is empty") {
    super(message);
    this.name = "EmptyStackError";
    Object.setPrototypeOf(this, EmptyStackError.prototype);
  }
}
