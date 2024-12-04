import { expect } from "@std/expect";
import { leftList, rightList } from "./input.ts";
import { calculateSimilarityScore, findDistanceBetweenLists } from "./main.ts";

Deno.test("first-half answer: distance", () => {
  expect(findDistanceBetweenLists(leftList, rightList)).toBe(1834060);
});

Deno.test("second-half answer: similarity score", () => {
  expect(calculateSimilarityScore(leftList, rightList)).toBe(21607792);
});
