import { expect } from "@std/expect";
import { getReports, sampleInput } from "./input.ts";
import { areLevelsIncreasing } from "./main.ts";

Deno.test("can read reports and levels from string", () => {
  const reports = getReports(sampleInput);

  expect(reports.length).toBe(6);
  expect(reports[0]).toEqual([7, 6, 4, 2, 1]);
  expect(reports[1]).toEqual([1, 2, 7, 8, 9]);
});

Deno.test("can check whether levels are all increasing", () => {
  const reports = getReports(sampleInput);
  const increasingLevels = reports[5];

  expect(areLevelsIncreasing(increasingLevels)).toBe(true);
  expect(areLevelsIncreasing(reports[0])).toBe(false);
  expect(areLevelsIncreasing(reports[1])).toBe(true);
  expect(areLevelsIncreasing(reports[2])).toBe(false);
  expect(areLevelsIncreasing(reports[3])).toBe(false);
  expect(areLevelsIncreasing(reports[4])).toBe(false);
});
