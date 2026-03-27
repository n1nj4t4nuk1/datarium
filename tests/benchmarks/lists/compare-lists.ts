import { runSuite } from "../_runner";
import { ArrayList } from "../../../src/core/collections/lists/array-list/array-list";
import { LinkedList } from "../../../src/core/collections/lists/linked-list/linked-list";
import { SortedArrayList } from "../../../src/core/collections/lists/sorted-array-list/sorted-array-list";
import { SortedLinkedList } from "../../../src/core/collections/lists/sorted-linked-list/sorted-linked-list";

const SIZE = 8_000;
const PROBES = 2_000;
const REMOVALS = 1_000;

const data = Array.from({ length: SIZE }, (_, index) => index);
const shuffledData = Array.from({ length: SIZE }, (_, index) => (index * 37) % SIZE);
const probeIndexes = Array.from({ length: PROBES }, (_, index) => (index * 97) % SIZE);

type ListLike = {
  size(): number;
  add(value: number): void;
  get(index: number): number;
  contains(value: number): boolean;
  removeAt(index: number): number;
};

const factories: Record<string, (initial: number[]) => ListLike> = {
  ArrayList: (initial) => new ArrayList<number>(initial),
  LinkedList: (initial) => new LinkedList<number>(initial),
  SortedArrayList: (initial) => new SortedArrayList<number>(initial),
  SortedLinkedList: (initial) => new SortedLinkedList<number>(initial),
};

await runSuite("Lists: add x8k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const list = make([]);
      for (const value of shuffledData) {
        list.add(value);
      }
    });
  }
});

await runSuite("Lists: get x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const list = make(data);
      for (const index of probeIndexes) {
        list.get(index);
      }
    });
  }
});

await runSuite("Lists: contains x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const list = make(data);
      for (const value of probeIndexes) {
        list.contains(value);
      }
    });
  }
});

await runSuite("Lists: removeAt middle x1k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const list = make(data);
      for (let step = 0; step < REMOVALS; step += 1) {
        const middle = Math.floor(list.size() / 2);
        list.removeAt(middle);
      }
    });
  }
});
