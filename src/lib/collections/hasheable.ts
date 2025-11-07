
export interface Hashable {
  equals(other: this): boolean;
  hashCode(): string;
}
