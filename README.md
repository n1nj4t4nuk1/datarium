# Datarium

A TypeScript library providing common data structures that are missing from JavaScript's standard library. Implemented in a Java-like style with strong typing and comprehensive test coverage.

## Features

- **Core Lists** (`src/core/collections/`)
  - `ArrayList<T>`, `LinkedList<T>`
  - `BoundedArrayList<T>`, `BoundedLinkedList<T>`
  - `SortedArrayList<T>`, `SortedLinkedList<T>`
  - `BoundedSortedArrayList<T>`, `BoundedSortedLinkedList<T>`

- **Core Stacks**
  - `ArrayStack<T>`, `LinkedStack<T>`
  - `BoundedArrayStack<T>`, `BoundedLinkedStack<T>`

- **Core Queues**
  - `ArrayQueue<T>`, `LinkedQueue<T>`
  - `BoundedArrayQueue<T>`, `BoundedLinkedQueue<T>`

- **Core Sets**
  - `ArraySet<T>`, `LinkedSet<T>`
  - `BoundedArraySet<T>`, `BoundedLinkedSet<T>`
  - `NativeMapSet<T extends PropertyKey>`

- **Core Maps**
  - `Map<K, V>` interface
  - `NativeMap<K extends PropertyKey, V>` backed by native object storage `{}`

- **Lambda Variants** (`src/lambda/collections/`)
  - `LambdaSortedArrayList<T>`, `LambdaSortedLinkedList<T>`
  - `LambdaBoundedSortedArrayList<T>`, `LambdaBoundedSortedLinkedList<T>`
  - `LambdaSortedArraySet<T>`, `LambdaSortedLinkedSet<T>`
  - `LambdaBoundedSortedSet<T>`, `LambdaBoundedSortedLinkedSet<T>`

- **Error-first API (core)**
  - Mutations/searches that cannot be resolved throw descriptive custom errors instead of returning sentinel values (`false`, `-1`, `undefined`, `null`).

## Installation

```bash
bun install
```

## Running Tests

Run all tests across the project:

```bash
bun test
```

## Usage Examples

### ArrayList

```typescript
import { ArrayList } from "./src/core/collections/lists/array-list/array-list";

const list = new ArrayList<number>([1, 2, 3]);

list.add(4);
list.addAt(1, 10);     // insert at index 1
list.get(0);           // 1
list.set(0, 5);        // 5 (returns previous)
list.remove(2);
list.size();
list.toArray();
```

### NativeMap backed by {}

```typescript
import { NativeMap } from "./src/core/collections/maps/native-map/native-map";

const map = new NativeMap<number, string>();

map.put(1, "one");
map.put(2, "two");

map.get(1);             // "one"
map.keys();             // ["1", "2"] (numeric keys are coerced to string in object storage)

// Throws KeyNotFoundError
// map.get(999);
```

### LambdaSortedArrayList

```typescript
import { LambdaSortedArrayList } from "./src/lambda/collections/lists/lambda-sorted-array-list/lambda-sorted-array-list";

// Numbers sorted in ascending order
const numbers = new LambdaSortedArrayList<number>((a, b) => a - b, [3, 1, 2]);
numbers.add(0);        // Inserted at start automatically
numbers.toArray();     // [0, 1, 2, 3]

// Strings sorted alphabetically
const words = new LambdaSortedArrayList<string>(
  (a, b) => a.localeCompare(b)
);
words.add("zebra");
words.add("apple");
words.add("banana");
words.toArray();       // ["apple", "banana", "zebra"]
```

### Custom Error Semantics (core)

Common custom errors in `src/core/errors/`:

- `IndexOutOfBoundsError`
- `ListCapacityExceededError`
- `InvalidCapacityError`
- `ElementNotFoundError`
- `DuplicateElementError`
- `KeyNotFoundError`
- `EmptyStackError`
- `EmptyQueueError`

## Project Structure

```
src/
  core/
    collections/
      # lists
      array-list/
      linked-list/
      bounded-array-list/
      bounded-linked-list/
      sorted-array-list/
      sorted-linked-list/
      bounded-sorted-array-list/
      bounded-sorted-linked-list/

      # stacks
      array-stack/
      linked-stack/
      bounded-array-stack/
      bounded-linked-stack/

      # queues
      array-queue/
      linked-queue/
      bounded-array-queue/
      bounded-linked-queue/

      # sets and map
      array-set/
      linked-set/
      bounded-array-set/
      bounded-linked-set/
      native-map/
      native-map-set/

      list.ts
      sorted-list.ts
      set.ts
      queue.ts
      map.ts
    errors/
      *.ts                             # custom domain errors

  lambda/
    collections/
      lists/
      sets/
    order-comparators/
    equality-comparators/
    hash-calculators/
    errors/

tests/
  core/
  lambda/
  types/
    bun-test.d.ts
```

## Development

### Adding New Data Structures

1. **Core structures** go in `src/core/collections/{structure-name}/`
2. **Lambda-based variants** go in `src/lambda/collections/{structure-name}/`
3. Add corresponding tests in `tests/` with the same path structure
4. For **core**, prefer exception-driven failure behavior over sentinel return values

### Running CI/CD

Tests automatically run on every push via GitHub Actions (configured for Bun 1.2.19 and 1.3.11 matrix).

## License

See [LICENSE](LICENSE) file.
