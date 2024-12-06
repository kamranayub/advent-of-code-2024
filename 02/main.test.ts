import { expect } from "@std/expect";
import { getReports, sampleInput } from "./input.ts";
import {
  areLevelsDecreasing,
  areLevelsIncreasing,
  areLevelsSafe,
  areLevelsWithinSafetyThresholds,
} from "./main.ts";

Deno.test("can read reports and levels from string", () => {
  const reports = getReports(sampleInput);

  expect(reports.length).toBe(6);
  expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
  expect(reports[1]).toEqual([1, 2, 7, 8, 9]);
});

Deno.test("can check whether levels are safe", () => {
  const reports = getReports(sampleInput);

  expect(areLevelsSafe(reports[0])).toBe(true);
  expect(areLevelsSafe(reports[1])).toBe(false);
  expect(areLevelsSafe(reports[2])).toBe(false);
  expect(areLevelsSafe(reports[3])).toBe(false);
  expect(areLevelsSafe(reports[4])).toBe(false);
  expect(areLevelsSafe(reports[5])).toBe(true);
});

Deno.test("can check whether levels are all increasing", () => {
  const reports = getReports(sampleInput);

  expect(areLevelsIncreasing(reports[0])).toBe(false);
  expect(areLevelsIncreasing(reports[1])).toBe(true);
  expect(areLevelsIncreasing(reports[2])).toBe(false);
  expect(areLevelsIncreasing(reports[3])).toBe(false);
  expect(areLevelsIncreasing(reports[4])).toBe(false);
  expect(areLevelsIncreasing(reports[5])).toBe(true);
});

Deno.test("can check whether levels are all decreasing", () => {
  const reports = getReports(sampleInput);

  expect(areLevelsDecreasing(reports[0])).toBe(true);
  expect(areLevelsDecreasing(reports[1])).toBe(false);
  expect(areLevelsDecreasing(reports[2])).toBe(true);
  expect(areLevelsDecreasing(reports[3])).toBe(false);
  expect(areLevelsDecreasing(reports[4])).toBe(false);
  expect(areLevelsDecreasing(reports[5])).toBe(false);
});

Deno.test("can check whether level differences are within safe thresholds", () => {
  const reports = getReports(sampleInput);

  expect(areLevelsWithinSafetyThresholds(reports[0])).toBe(true);
  expect(areLevelsWithinSafetyThresholds(reports[1])).toBe(false);
  expect(areLevelsWithinSafetyThresholds(reports[2])).toBe(false);
  expect(areLevelsWithinSafetyThresholds(reports[3])).toBe(true);
  expect(areLevelsWithinSafetyThresholds(reports[4])).toBe(false);
  expect(areLevelsWithinSafetyThresholds(reports[5])).toBe(true);
});
