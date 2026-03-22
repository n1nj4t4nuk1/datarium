export interface HashCalculator<T> {
  (value: T): number;
}
