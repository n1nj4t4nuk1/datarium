
export interface Set<T> {
    size(): number;
    isEmpty(): boolean;
    contains(value: T): boolean;
    add(value: T): boolean;
    remove(value: T): boolean;
    clear(): void;
    toArray(): T[];
}
