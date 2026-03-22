import type { EqualityComparator } from "./equality-comparator";

export const BasicNumberEqualityComparator: EqualityComparator<number> = (
  left: number,
  right: number,
): boolean => {
  return left === right;
};
