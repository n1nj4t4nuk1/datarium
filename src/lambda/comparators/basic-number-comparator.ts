import type { Comparator } from "./comparator";

export const BasicNumberComparator: Comparator<number> = (left: number, right: number): number => {
  return left - right;
};
