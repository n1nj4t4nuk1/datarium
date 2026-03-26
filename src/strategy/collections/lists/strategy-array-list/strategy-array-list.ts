import { ArrayList } from "../../../../core/collections/lists/array-list/array-list";

export class StrategyArrayList<T> extends ArrayList<T> {
  constructor(initialElements: T[] = []) {
    super(initialElements);
  }
}
