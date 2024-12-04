import { sortBy, sumOf } from "@std/collections";
import { leftList, rightList } from "./input.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(findDistanceBetweenLists(leftList, rightList));
  console.log(calculateSimilarityScore(leftList, rightList));
}

type Pair = readonly [number, number];

export function findDistanceBetweenLists(left: number[], right: number[]) {
  let sum = 0;

  for (let i = 0; i < left.length; i++) {
    const pair = pairSmallestNumbersAtIndex(left, right, i);
    const dist = findDistanceBetweenPair(pair);

    sum += dist;
  }

  return sum;
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

export function findSmallestNumberAtIndex(
  list: number[],
  index: number,
) {
  const sortedList = sortBySmallestNumbers(list);
  return sortedList[index];
}

function sortBySmallestNumbers(list: number[]) {
  return sortBy(list, (num) => num);
}

export function findDistanceBetweenPair(pair: Pair) {
  const leftMinusRight = pair[0] - pair[1];
  const rightMinusLeft = pair[1] - pair[0];

  return Math.max(leftMinusRight, rightMinusLeft);
}

export function calculateSimilarityScore(left: number[], right: number[]) {
  let similarity = 0;

  for (let i = 0; i < left.length; i++) {
    const score = calculateScore(left[i], right);

    similarity += score;
  }

  return similarity;
}

export function calculateScore(num: number, list: number[]) {
  const times = calculateTimesNumberAppearsInList(num, list);
  return num * times;
}

export function calculateTimesNumberAppearsInList(num: number, list: number[]) {
  return sumOf(list, (el) => el === num ? 1 : 0);
}
