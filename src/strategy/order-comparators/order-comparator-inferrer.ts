import type { OrderComparator } from "./order-comparator";
import { BasicNumberComparator } from "./basic-number-comparator";
import { AlphabeticalStringComparator } from "./alphabetical-string-comparator";

export function inferOrderComparator<T>(sample: T): OrderComparator<T> {
  const type = typeof sample;

  if (type === "number") {
    return BasicNumberComparator as OrderComparator<T>;
  } else if (type === "string") {
    return AlphabeticalStringComparator as OrderComparator<T>;
  }

  throw new Error(
    `No suitable OrderComparator found for type: ${type}. Supported types are: number, string`,
  );
}
