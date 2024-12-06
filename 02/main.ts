import { sumOf } from "@std/collections";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}

export type Report = Levels[];
export type Levels = number;

export function countSafeReports(reports: Report[]) {
  return sumOf(reports, (report) => areLevelsSafe(report) ? 1 : 0);
}

export function areLevelsSafe(report: Report) {
  if (areLevelsWithinSafetyThresholds(report)) {
    return areLevelsDecreasing(report) || areLevelsIncreasing(report);
  }
  return false;
}

export function areLevelsIncreasing(report: Report) {
  let prev = -Infinity;
  for (const level of report) {
    if (level > prev) {
      prev = level;
      continue;
    } else {
      return false;
    }
  }
  return true;
}

export function areLevelsDecreasing(report: Report) {
  let prev = Infinity;
  for (const level of report) {
    if (level < prev) {
      prev = level;
      continue;
    } else {
      return false;
    }
  }
  return true;
}

const SAFETY_MINIMUM_DIFFERENCE = 1;
const SAFETY_MAXIMUM_DIFFERENCE = 3;

export function areLevelsWithinSafetyThresholds(report: Report) {
  let prev = -Infinity;
  for (const level of report) {
    if (prev == -Infinity) {
      prev = level;
      continue;
    }

    const diff = Math.abs(level - prev);

    if (diff < SAFETY_MINIMUM_DIFFERENCE) return false;
    if (diff > SAFETY_MAXIMUM_DIFFERENCE) return false;

    prev = level;
  }
  return true;
}
