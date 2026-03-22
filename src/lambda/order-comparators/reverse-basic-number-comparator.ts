import type { OrderComparator } from "./order-comparator";

export const ReverseBasicNumberComparator: OrderComparator<number> = (left: number, right: number): number => {
  return right - left;
};
