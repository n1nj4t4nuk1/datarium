
export interface Set<T> {
    add(value: T): void;
    delete(value: T): boolean;
    has(value: T): boolean;
    clear(): void;
    size(): number;
}
