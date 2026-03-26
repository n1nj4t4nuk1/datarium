import type { HashCalculator } from "./hash-calculator";
import { NumberHashCalculator } from "./number-hash-calculator";
import { StringHashCalculator } from "./string-hash-calculator";

export function inferHashCalculator<T>(sample: T): HashCalculator<T> {
  const type = typeof sample;

  if (type === "number") {
    return NumberHashCalculator as HashCalculator<T>;
  } else if (type === "string") {
    return StringHashCalculator as HashCalculator<T>;
  }

  throw new Error(
    `No suitable HashCalculator found for type: ${type}. Supported types are: number, string`,
  );
}
