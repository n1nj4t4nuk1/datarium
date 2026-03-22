import type { Comparator } from "./comparator";

export const ReverseAlphabeticalStringComparator: Comparator<string> = (
  left: string,
  right: string,
): number => {
  return right.localeCompare(left);
};
