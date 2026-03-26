import { Bench } from "tinybench";

export async function runSuite(
  name: string,
  registerTasks: (bench: Bench) => void,
): Promise<void> {
  const bench = new Bench({
    time: 500,
    iterations: 20,
    warmupTime: 200,
    warmupIterations: 5,
  });

  registerTasks(bench);
  await bench.run();

  console.log(`\n=== ${name} ===`);
  console.table(bench.table());
}
