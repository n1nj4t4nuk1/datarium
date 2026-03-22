import { createHash } from "crypto";
import type { HashCalculator } from "./hash-calculator";

export const StringHashCalculator: HashCalculator<string> = (value: string): number => {
  const hash = createHash("sha256").update(value).digest("hex");
  return parseInt(hash.substring(0, 8), 16);
};
