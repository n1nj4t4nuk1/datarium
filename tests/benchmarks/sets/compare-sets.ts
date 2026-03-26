import { runSuite } from "../_runner";
import { ArraySet } from "../../../src/core/collections/sets/array-set/array-set";
import { LinkedSet } from "../../../src/core/collections/sets/linked-set/linked-set";
import { BoundedArraySet } from "../../../src/core/collections/sets/bounded-array-set/bounded-array-set";
import { BoundedLinkedSet } from "../../../src/core/collections/sets/bounded-linked-set/bounded-linked-set";
import { NativeMapSet } from "../../../src/core/collections/sets/native-map-set/native-map-set";

const SIZE = 8_000;
const PROBES = 2_000;
const REMOVALS = 2_000;
const CAPACITY = SIZE + 100;

const data = Array.from({ length: SIZE }, (_, index) => index);
const probes = Array.from({ length: PROBES }, (_, index) => (index * 97) % SIZE);

type SetLike = {
  add(value: number): void;
  contains(value: number): boolean;
  remove(value: number): void;
  size(): number;
};

const factories: Record<string, (initial: number[]) => SetLike> = {
  ArraySet: (initial) => new ArraySet<number>(initial),
  LinkedSet: (initial) => new LinkedSet<number>(initial),
  BoundedArraySet: (initial) => new BoundedArraySet<number>(CAPACITY, initial),
  BoundedLinkedSet: (initial) => new BoundedLinkedSet<number>(CAPACITY, initial),
  NativeMapSet: (initial) => new NativeMapSet<number>(initial),
};

await runSuite("Sets: add unique x8k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const set = make([]);
      for (const value of data) {
        set.add(value);
      }
    });
  }
});

await runSuite("Sets: contains x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const set = make(data);
      for (const value of probes) {
        set.contains(value);
      }
    });
  }
});

await runSuite("Sets: remove x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const set = make(data);
      for (let index = 0; index < REMOVALS; index += 1) {
        set.remove(index);
      }
    });
  }
});
