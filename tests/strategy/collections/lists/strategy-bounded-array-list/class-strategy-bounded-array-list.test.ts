import { describe, expect, test } from "bun:test";
import { StrategyBoundedArrayList } from "../../../../../src/strategy/collections/lists/strategy-bounded-array-list/strategy-bounded-array-list";
import { ElementNotFoundError } from "../../../../../src/core/errors/element-not-found-error";
import { ListCapacityExceededError } from "../../../../../src/core/errors/list-capacity-exceeded-error";

class User {
  constructor(
    readonly id: number,
    readonly name: string,
  ) {}
}

describe("StrategyBoundedArrayList with class type User (unsorted)", () => {
  test("keeps insertion order with initial elements", () => {
    const user1 = new User(1, "Ana");
    const user2 = new User(2, "Luis");
    const user3 = new User(3, "Marta");

    const list = new StrategyBoundedArrayList<User>(3, [user1, user2, user3]);

    expect(list.toArray().map((user) => user.id)).toEqual([1, 2, 3]);
  });

  test("add appends users without sorting", () => {
    const user1 = new User(1, "Ana");
    const user2 = new User(2, "Luis");
    const user3 = new User(3, "Marta");

    const list = new StrategyBoundedArrayList<User>(3, [user1]);
    list.add(user3);
    list.add(user2);

    expect(list.toArray().map((user) => user.id)).toEqual([1, 3, 2]);
  });

  test("throws ListCapacityExceededError when adding beyond capacity", () => {
    const user1 = new User(1, "Ana");
    const user2 = new User(2, "Luis");
    const user3 = new User(3, "Marta");

    const list = new StrategyBoundedArrayList<User>(2, [user1, user2]);

    expect(() => list.add(user3)).toThrow(ListCapacityExceededError);
  });

  test("addAt inserts user at explicit position", () => {
    const user1 = new User(1, "Ana");
    const user3 = new User(3, "Marta");
    const user2 = new User(2, "Luis");

    const list = new StrategyBoundedArrayList<User>(3, [user1, user3]);
    list.addAt(1, user2);

    expect(list.toArray().map((user) => user.id)).toEqual([1, 2, 3]);
  });

  test("contains/indexOf/remove work with same object references", () => {
    const user1 = new User(1, "Ana");
    const user2 = new User(2, "Luis");

    const list = new StrategyBoundedArrayList<User>(2, [user1, user2]);

    expect(list.contains(user2)).toBe(true);
    expect(list.indexOf(user2)).toBe(1);
    list.remove(user2);
    expect(list.toArray().map((user) => user.id)).toEqual([1]);
  });

  test("contains/indexOf/remove throw for different references", () => {
    const user1 = new User(1, "Ana");
    const user2 = new User(2, "Luis");

    const list = new StrategyBoundedArrayList<User>(2, [user1, user2]);

    expect(list.contains(new User(2, "Luis"))).toBe(false);
    expect(() => list.indexOf(new User(2, "Luis"))).toThrow(ElementNotFoundError);
    expect(() => list.remove(new User(2, "Luis"))).toThrow(ElementNotFoundError);
    expect(list.toArray().map((user) => user.id)).toEqual([1, 2]);
  });
});
