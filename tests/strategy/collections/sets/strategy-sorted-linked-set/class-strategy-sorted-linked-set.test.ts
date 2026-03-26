import { describe, expect, test } from "bun:test";
import { StrategySortedLinkedSet } from "../../../../../src/strategy/collections/sets/strategy-sorted-linked-set/strategy-sorted-linked-set";

class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly age: number,
  ) {}
}

describe("StrategySortedLinkedSet with class type User", () => {
  const orderByAge = (left: User, right: User): number => left.age - right.age;
  const equalById = (left: User, right: User): boolean => left.id === right.id;

  test("orders users by age in constructor", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    expect(set.toArray().map((user) => user.age)).toEqual([22, 29, 35]);
    expect(set.size()).toBe(3);
  });

  test("keeps users ordered by age when adding elements", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [new User(1, "Ana", 35)],
      equalById,
    );

    set.add(new User(2, "Luis", 22));
    set.add(new User(3, "Marta", 29));

    expect(set.toArray().map((user) => user.age)).toEqual([22, 29, 35]);
  });

  test("ignores duplicate user by id during initialization", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(1, "Different Ana", 50),
      ],
      equalById,
    );

    expect(set.size()).toBe(1);
    expect(set.toArray().map((user) => user.id)).toEqual([1]);
  });

  test("ignores user with existing id when adding", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
      ],
      equalById,
    );

    set.add(new User(1, "Another Ana", 30));

    expect(set.size()).toBe(2);
    expect(set.toArray().map((user) => user.id)).toEqual([2, 1]);
  });

  test("uses equality comparator by id for contains", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
      ],
      equalById,
    );

    expect(set.contains(new User(2, "Different Name", 99))).toBe(true);
    expect(set.contains(new User(3, "Unknown", 25))).toBe(false);
  });

  test("uses equality comparator by id for remove", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    set.remove(new User(2, "Not Luis", 100));

    expect(set.size()).toBe(2);
    expect(set.toArray().map((user) => user.id)).toEqual([3, 1]);
    expect(set.toArray().map((user) => user.age)).toEqual([29, 35]);
  });

  test("ignores removing non-existent user", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [new User(1, "Ana", 35)],
      equalById,
    );

    set.remove(new User(999, "Unknown", 100));

    expect(set.size()).toBe(1);
    expect(set.toArray().map((user) => user.id)).toEqual([1]);
  });

  test("isEmpty and clear work correctly", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
      ],
      equalById,
    );

    expect(set.isEmpty()).toBe(false);
    expect(set.size()).toBe(2);

    set.clear();

    expect(set.isEmpty()).toBe(true);
    expect(set.size()).toBe(0);
    expect(set.toArray()).toEqual([]);
  });

  test("orders by age but validates uniqueness by id", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    set.add(new User(4, "Pedro", 22));

    expect(set.size()).toBe(4);
    expect(set.toArray().map((user) => user.age)).toEqual([22, 22, 29, 35]);
    expect(set.toArray().map((user) => user.id)).toEqual([2, 4, 3, 1]);
  });

  test("handles operations on set with single element", () => {
    const set = new StrategySortedLinkedSet<User>(
      orderByAge,
      [new User(1, "Ana", 35)],
      equalById,
    );

    expect(set.contains(new User(1, "Ana", 35))).toBe(true);

    set.remove(new User(1, "Anything", 99));

    expect(set.isEmpty()).toBe(true);
  });
});
