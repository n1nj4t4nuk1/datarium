import type { Comparator } from "./comparator";

export const ReverseBasicNumberComparator: Comparator<number> = (left: number, right: number): number => {
  return right - left;
};
