import { leftList, rightList } from "@puzzle/01";
import { sumOf } from "@std/collections";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(calculateSimilarityScore(leftList, rightList));
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
