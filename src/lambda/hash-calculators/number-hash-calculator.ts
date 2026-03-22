import { createHash } from "crypto";
import type { HashCalculator } from "./hash-calculator";

export const NumberHashCalculator: HashCalculator<number> = (value: number): number => {
  const str = String(value);
  const hash = createHash("sha256").update(str).digest("hex");
  return parseInt(hash.substring(0, 8), 16);
};
