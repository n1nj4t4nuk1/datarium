import { ArrayList } from "../../../core/collections/array-list/array-list";

export class LambdaArrayList<T> extends ArrayList<T> {
  constructor(initialElements: T[] = []) {
    super(initialElements);
  }
}
