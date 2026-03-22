import { ArrayList } from "../../../core/collections/array-list/array-list";

export class StrategyArrayList<T> extends ArrayList<T> {
  constructor(initialElements: T[] = []) {
    super(initialElements);
  }
}
