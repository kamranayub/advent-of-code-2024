import { expect } from "jsr:@std/expect";
import {
  calculateScore,
  calculateSimilarityScore,
  calculateTimesNumberAppearsInList,
  findDistanceBetweenLists,
  findSmallestNumberAtIndex,
  pairSmallestNumbersAtIndex,
} from "./main.ts";
import { leftList, rightList } from "./input.ts";

const sampleLeftList = [
  3,
  4,
  2,
  1,
  3,
  3,
];

const sampleRightList = [
  4,
  3,
  5,
  3,
  9,
  3,
];

Deno.test("should find smallest number at index", () => {
  expect(findSmallestNumberAtIndex(sampleLeftList, 0)).toBe(1);

  expect(findSmallestNumberAtIndex(
    sampleLeftList,
    1,
  )).toBe(2);

  expect(findSmallestNumberAtIndex(sampleRightList, 0)).toBe(3);

  expect(findSmallestNumberAtIndex(
    sampleRightList,
    1,
  )).toBe(3);
});

Deno.test("should find smallest pair at index", () => {
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 0))
    .toEqual([1, 3]);
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 1))
    .toEqual([2, 3]);
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 2))
    .toEqual([3, 3]);
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 3))
    .toEqual([3, 4]);
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 4))
    .toEqual([3, 5]);
  expect(pairSmallestNumbersAtIndex(sampleLeftList, sampleRightList, 5))
    .toEqual([4, 9]);
});

Deno.test("should calculate distance between two lists", () => {
  const distance = findDistanceBetweenLists(sampleLeftList, sampleRightList);

  expect(distance).toBe(11);
});

Deno.test("should find correct distance between puzzle inputs", () => {
  const distance = findDistanceBetweenLists(leftList, rightList);

  expect(distance).toBe(1834060);
});

Deno.test("calculates how many times number appears in list", () => {
  expect(calculateTimesNumberAppearsInList(1, sampleRightList)).toBe(0);
  expect(calculateTimesNumberAppearsInList(2, sampleRightList)).toBe(0);
  expect(calculateTimesNumberAppearsInList(3, sampleRightList)).toBe(3);
  expect(calculateTimesNumberAppearsInList(4, sampleRightList)).toBe(1);
});

Deno.test("calculates score of number in list", () => {
  expect(calculateScore(1, sampleRightList)).toBe(0);
  expect(calculateScore(2, sampleRightList)).toBe(0);
  expect(calculateScore(3, sampleRightList)).toBe(9);
  expect(calculateScore(4, sampleRightList)).toBe(4);
});

Deno.test("calculates similarity score between left and right lists", () => {
  expect(calculateSimilarityScore(sampleLeftList, sampleRightList)).toBe(31);
});

Deno.test("should calculate correct similarity score for puzzle inputs", () => {
  expect(calculateSimilarityScore(leftList, rightList)).toBe(21607792);
});
