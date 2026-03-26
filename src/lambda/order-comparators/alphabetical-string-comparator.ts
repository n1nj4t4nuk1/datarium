import type { OrderComparator } from "./order-comparator";

export const AlphabeticalStringComparator: OrderComparator<string> = (left: string, right: string): number => {
  return left.localeCompare(right);
};
