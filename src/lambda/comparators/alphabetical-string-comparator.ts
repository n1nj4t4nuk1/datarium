import type { Comparator } from "./comparator";

export const AlphabeticalStringComparator: Comparator<string> = (left: string, right: string): number => {
  return left.localeCompare(right);
};
