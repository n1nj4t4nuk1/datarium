import { describe, expect, test } from "bun:test";
import { StrategySortedLinkedList } from "../../../../../src/strategy/collections/lists/strategy-sorted-linked-list/strategy-sorted-linked-list";

class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly age: number,
  ) {}
}

describe("StrategySortedLinkedList with class type User", () => {
  const orderByAge = (left: User, right: User): number => left.age - right.age;
  const equalById = (left: User, right: User): boolean => left.id === right.id;

  test("orders users by age in constructor", () => {
    const list = new StrategySortedLinkedList<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    expect(list.toArray().map((user) => user.age)).toEqual([22, 29, 35]);
  });

  test("keeps users ordered by age when adding elements", () => {
    const list = new StrategySortedLinkedList<User>(orderByAge, [new User(1, "Ana", 35)], equalById);

    list.add(new User(2, "Luis", 22));
    list.add(new User(3, "Marta", 29));

    expect(list.toArray().map((user) => user.age)).toEqual([22, 29, 35]);
  });

  test("uses equality comparator by id for contains and indexOf", () => {
    const list = new StrategySortedLinkedList<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
      ],
      equalById,
    );

    expect(list.contains(new User(2, "Different Name", 99))).toBe(true);
    expect(list.indexOf(new User(2, "Another", 10))).toBe(0);
  });

  test("uses equality comparator by id for remove", () => {
    const list = new StrategySortedLinkedList<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    const removed = list.remove(new User(2, "Not Luis", 100));

    expect(removed).toBe(true);
    expect(list.toArray().map((user) => user.id)).toEqual([3, 1]);
    expect(list.toArray().map((user) => user.age)).toEqual([29, 35]);
  });

  test("set keeps sorted order by age and returns replaced user", () => {
    const list = new StrategySortedLinkedList<User>(
      orderByAge,
      [
        new User(1, "Ana", 35),
        new User(2, "Luis", 22),
        new User(3, "Marta", 29),
      ],
      equalById,
    );

    const previous = list.set(1, new User(4, "Nora", 40));

    expect(previous.id).toBe(3);
    expect(list.toArray().map((user) => user.age)).toEqual([22, 35, 40]);
  });
});
