import { runSuite } from "../_runner";
import { NativeMap } from "../../../src/core/collections/maps/native-map/native-map";

const SIZE = 20_000;
const PROBES = 5_000;

const keys = Array.from({ length: SIZE }, (_, index) => `key-${index}`);

await runSuite("Maps: NativeMap put x20k", (bench) => {
  bench.add("NativeMap", () => {
    const map = new NativeMap<string, number>();
    for (let index = 0; index < SIZE; index += 1) {
      map.put(keys[index]!, index);
    }
  });
});

await runSuite("Maps: NativeMap get x5k", (bench) => {
  bench.add("NativeMap", () => {
    const map = new NativeMap<string, number>();
    for (let index = 0; index < SIZE; index += 1) {
      map.put(keys[index]!, index);
    }

    for (let probe = 0; probe < PROBES; probe += 1) {
      map.get(keys[(probe * 41) % SIZE]!);
    }
  });
});

await runSuite("Maps: NativeMap remove x5k", (bench) => {
  bench.add("NativeMap", () => {
    const map = new NativeMap<string, number>();
    for (let index = 0; index < SIZE; index += 1) {
      map.put(keys[index]!, index);
    }

    for (let probe = 0; probe < PROBES; probe += 1) {
      map.remove(keys[probe]!);
    }
  });
});
