import type { OrderComparator } from "./order-comparator";

export const ReverseAlphabeticalStringComparator: OrderComparator<string> = (
  left: string,
  right: string,
): number => {
  return right.localeCompare(left);
};
