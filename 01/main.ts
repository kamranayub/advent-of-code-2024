import { sortBy } from "@std/collections/sort-by";
import { leftList, rightList } from "./input.ts";

type Pair = readonly [number, number];

function sortBySmallestNumbers(list: number[]) {
  return sortBy(list, (num) => num);
}

export function findSmallestNumber(list: number[]) {
  return sortBySmallestNumbers(list)[0];
}

export function findSmallestNumberAtIndex(
  list: number[],
  index: number,
) {
  const sortedList = sortBySmallestNumbers(list);
  return sortedList[index];
}

export function pairSmallestNumbers(left: number[], right: number[]): Pair {
  const leftSmallest = findSmallestNumber(left);
  const rightSmallest = findSmallestNumber(right);

  return [leftSmallest, rightSmallest];
}

export function pairSmallestNumbersAtIndex(
  left: number[],
  right: number[],
  index: number,
): Pair {
  const leftSmallest = findSmallestNumberAtIndex(left, index);
  const rightSmallest = findSmallestNumberAtIndex(right, index);
  return [leftSmallest, rightSmallest];
}

export function findDistanceBetweenPair(pair: Pair) {
  const leftMinusRight = pair[0] - pair[1];
  const rightMinusLeft = pair[1] - pair[0];

  return Math.max(leftMinusRight, rightMinusLeft);
}

export function findDistanceBetweenLists(left: number[], right: number[]) {
  let sum = 0;

  for (let i = 0; i < left.length; i++) {
    const pair = pairSmallestNumbersAtIndex(left, right, i);
    const dist = findDistanceBetweenPair(pair);

    sum += dist;
  }

  return sum;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
const isEntrypoint = import.meta.main;
if (isEntrypoint) {
  console.log(findDistanceBetweenLists(leftList, rightList));
}
