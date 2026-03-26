import { runSuite } from "../_runner";
import { ArrayStack } from "../../../src/core/collections/stacks/array-stack/array-stack";
import { LinkedStack } from "../../../src/core/collections/stacks/linked-stack/linked-stack";
import { BoundedArrayStack } from "../../../src/core/collections/stacks/bounded-array-stack/bounded-array-stack";
import { BoundedLinkedStack } from "../../../src/core/collections/stacks/bounded-linked-stack/bounded-linked-stack";

const SIZE = 8_000;
const OPS = 2_000;
const CAPACITY = SIZE + 100;

const data = Array.from({ length: SIZE }, (_, index) => index);

type StackLike = {
  push(value: number): void;
  pop(): number;
  peek(): number;
};

const factories: Record<string, (initial: number[]) => StackLike> = {
  ArrayStack: (initial) => new ArrayStack<number>(initial),
  LinkedStack: (initial) => new LinkedStack<number>(initial),
  BoundedArrayStack: (initial) => new BoundedArrayStack<number>(CAPACITY, initial),
  BoundedLinkedStack: (initial) => new BoundedLinkedStack<number>(CAPACITY, initial),
};

await runSuite("Stacks: push x8k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const stack = make([]);
      for (const value of data) {
        stack.push(value);
      }
    });
  }
});

await runSuite("Stacks: pop x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const stack = make(data);
      for (let step = 0; step < OPS; step += 1) {
        stack.pop();
      }
    });
  }
});

await runSuite("Stacks: peek x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const stack = make(data);
      for (let step = 0; step < OPS; step += 1) {
        stack.peek();
      }
    });
  }
});
