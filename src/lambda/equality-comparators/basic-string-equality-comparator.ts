import type { EqualityComparator } from "./equality-comparator";

export const BasicStringEqualityComparator: EqualityComparator<string> = (
  left: string,
  right: string,
): boolean => {
  return left === right;
};
