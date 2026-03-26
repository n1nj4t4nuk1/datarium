
export interface Set<T> {
    size(): number;
    isEmpty(): boolean;
    contains(value: T): boolean;
    add(value: T): void;
    remove(value: T): void;
    clear(): void;
    toArray(): T[];
}
