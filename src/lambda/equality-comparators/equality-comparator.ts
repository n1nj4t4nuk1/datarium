export interface EqualityComparator<T> {
	(left: T, right: T): boolean;
}
