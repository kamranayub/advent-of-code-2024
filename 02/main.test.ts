import { expect } from "@std/expect";
import {
  calculateScore,
  calculateSimilarityScore,
  calculateTimesNumberAppearsInList,
} from "./main.ts";
import { leftList, rightList } from "../01/input.ts";

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

Deno.test("has correct puzzle answer", () => {
  expect(calculateSimilarityScore(leftList, rightList)).toBe(21607792);
});
