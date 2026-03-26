import type { EqualityComparator } from "./equality-comparator";
import { BasicNumberEqualityComparator } from "./basic-number-equality-comparator";
import { BasicStringEqualityComparator } from "./basic-string-equality-comparator";

export function inferEqualityComparator<T>(sample: T): EqualityComparator<T> {
  const type = typeof sample;

  if (type === "number") {
    return BasicNumberEqualityComparator as EqualityComparator<T>;
  } else if (type === "string") {
    return BasicStringEqualityComparator as EqualityComparator<T>;
  }

  throw new Error(
    `No suitable EqualityComparator found for type: ${type}. Supported types are: number, string`,
  );
}
