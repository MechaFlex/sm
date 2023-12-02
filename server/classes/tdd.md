### Q1 partitioning

Partitions:
Null
Empty list
List with one integer
List with two (or more) different integers
List with two (or more) equal integers

```ts
function maxIndex(ints: number[]): number {
  return 0
}

test("null or empty get exception", () => {
  const list1 = null
  const list2 = []
  expect(maxIndex(list1)).toBe(exception)
  expect(maxIndex(list2)).toBe(exception)
})

test("List of length 1 should return index 0", () => {
  const list1 = [1]
  expect(maxIndex(list1)).toBe(0)
})

test("list with all identical elements should return index 0", () => {
  const list1 = [1, 1, 1, 1, 1]
  expect(maxIndex(list1)).toBe(0)
})

test("list with elements in descending order should return 0", () => {
  const list1 = [5, 4, 3, 2, 1]
  const list2 = [5, 5, 5, 4, 4]

  expect(maxIndex(list1)).toBe(0)
  expect(maxIndex(list2)).toBe(0)
})

test("list in ascending order with no duplicates should return last index (length of list minus 1)", () => {
  const list1 = [5, 4, 3, 2, 1]

  expect(maxIndex(list1)).toBe(list1.length - 1)
})

test("list with different numbers", () => {
  const list1 = [1, 2]
  const list2 = [3, 2, 1]
  const list3 = [2, 1, 3]

  const list4 = [1, 3, 2]

  expect(maxIndex(list1)).toBe(1)
  expect(maxIndex(list2)).toBe(0)
  expect(maxIndex(list3)).toBe(2)
})

test("lists with identical numbers", () => {
  const list1 = [1, 1]
  const list2 = [1, 2, 2]
  const list3 = [2, 1, 2]
  const list4 = [2, 2, 1]

  expect(maxIndex(list1)).toBe(0)
  expect(maxIndex(list2)).toBe(1)
  expect(maxIndex(list3)).toBe(0)
  expect(maxIndex(list4)).toBe(0)
})
```
