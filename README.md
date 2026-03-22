# Datarium

A TypeScript library providing common data structures that are missing from JavaScript's standard library. Implemented in a Java-like style with strong typing and comprehensive test coverage.

## Features

- **Core Data Structures** (`src/core/collections/`)
  - `ArrayList<T>` - Dynamic array implementation
  - `LinkedList<T>` - Doubly-linked list implementation
  - `List<T>` - Common interface for list implementations

- **Strategy-based Variants** (`src/strategy/collections/`)
  - `StrategyArrayList<T>` - ArrayList variant
  - `StrategySortedArrayList<T>` - Self-ordering ArrayList with custom comparator

- **Shared Abstractions**
  - `Set<T>` - Set interface
  - `Hashable` - Interface for hashable objects

## Installation

```bash
bun install
```

## Running Tests

Run all tests across the project:

```bash
bun run test
```

## Usage Examples

### ArrayList

```typescript
import { ArrayList } from "./src/core/collections/array-list/array-list";

const list = new ArrayList<number>([1, 2, 3]);

list.add(4);
list.addAt(1, 10);     // insert at index 1
list.get(0);           // 1
list.set(0, 5);        // 5 (returns previous)
list.remove(2);
list.size();           // 4
list.toArray();        // [5, 10, 1, 3, 4]
```

### LinkedList

```typescript
import { LinkedList } from "./src/core/collections/linked-list/linked-list";

const list = new LinkedList<string>(["a", "b", "c"]);

list.add("d");
list.contains("b");    // true
list.indexOf("c");     // 2
list.removeAt(1);      // "b"
list.clear();
list.isEmpty();        // true
```

### StrategySortedArrayList

```typescript
import { StrategySortedArrayList } from "./src/strategy/collections/strategy-sorted-array-list/strategy-sorted-array-list";

// Numbers sorted in ascending order
const numbers = new StrategySortedArrayList<number>((a, b) => a - b, [3, 1, 2]);
numbers.add(0);        // Inserted at start automatically
numbers.toArray();     // [0, 1, 2, 3]

// Strings sorted alphabetically
const words = new StrategySortedArrayList<string>(
  (a, b) => a.localeCompare(b)
);
words.add("zebra");
words.add("apple");
words.add("banana");
words.toArray();       // ["apple", "banana", "zebra"]
```

## Project Structure

```
src/
  core/
    collections/
      list.ts                          # List<T> interface
      array-list/
        array-list.ts                  # ArrayList<T> implementation
      linked-list/
        linked-list.ts                 # LinkedList<T> implementation
      hasheable.ts                     # Hashable interface
      set.ts                           # Set<T> interface
  strategy/
    collections/
      strategy-array-list/
        strategy-array-list.ts         # StrategyArrayList<T> implementation
      strategy-sorted-array-list/
        strategy-sorted-array-list.ts  # StrategySortedArrayList<T> implementation

tests/
  core/collections/
    array-list/array-list.test.ts
    linked-list/linked-list.test.ts
  types/
    bun-test.d.ts                      # Bun test types shim
```

## Development

### Adding New Data Structures

1. **Core structures** go in `src/core/collections/{structure-name}/`
2. **Strategy-based variants** go in `src/strategy/collections/{structure-name}/`
3. Add corresponding tests in `tests/` with the same path structure
4. All implementations must follow their interface contract

### Running CI/CD

Tests automatically run on every push via GitHub Actions (configured for Bun 1.2.19 and 1.3.11 matrix).

## Comparison: List Implementations

| Operation | ArrayList | LinkedList | StrategySortedArrayList |
|-----------|-----------|-----------|----------|
| Access `get(i)` | O(1) | O(n) | O(n) |
| Insert at end | O(1) | O(1) | O(n) |
| Insert at index | O(n) | O(n) | O(n) with binary search |
| Remove | O(n) | O(n) | O(n) |
| Search | O(n) | O(n) | O(n) |

## License

See [LICENSE](LICENSE) file.
