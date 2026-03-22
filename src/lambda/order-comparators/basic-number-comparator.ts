import type { OrderComparator } from "./order-comparator";

export const BasicNumberComparator: OrderComparator<number> = (left: number, right: number): number => {
  return left - right;
};
