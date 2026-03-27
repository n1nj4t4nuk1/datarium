import { runSuite } from "../_runner";
import { ArrayQueue } from "../../../src/core/collections/queues/array-queue/array-queue";
import { LinkedQueue } from "../../../src/core/collections/queues/linked-queue/linked-queue";

const SIZE = 8_000;
const OPS = 2_000;

const data = Array.from({ length: SIZE }, (_, index) => index);

type QueueLike = {
  enqueue(value: number): void;
  dequeue(): number;
  peek(): number;
};

const factories: Record<string, (initial: number[]) => QueueLike> = {
  ArrayQueue: (initial) => new ArrayQueue<number>(initial),
  LinkedQueue: (initial) => new LinkedQueue<number>(initial),
};

await runSuite("Queues: enqueue x8k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const queue = make([]);
      for (const value of data) {
        queue.enqueue(value);
      }
    });
  }
});

await runSuite("Queues: dequeue x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const queue = make(data);
      for (let step = 0; step < OPS; step += 1) {
        queue.dequeue();
      }
    });
  }
});

await runSuite("Queues: peek x2k", (bench) => {
  for (const [name, make] of Object.entries(factories)) {
    bench.add(name, () => {
      const queue = make(data);
      for (let step = 0; step < OPS; step += 1) {
        queue.peek();
      }
    });
  }
});
