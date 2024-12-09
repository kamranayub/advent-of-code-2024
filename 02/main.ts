import { sumOf } from "@std/collections";
import { getPuzzleInput, getReports } from "./input.ts";

const SAFETY_MINIMUM_DIFFERENCE = 1;
const SAFETY_MAXIMUM_DIFFERENCE = 3;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const puzzleInput = await getPuzzleInput();
  const puzzleReports = getReports(puzzleInput);

  console.log("Part One:", countSafeReports(puzzleReports));
  console.log("Part Two:", countSafeReportsWithDampener(puzzleReports));
}

export type Report = Levels[];
export type Levels = number;

export function countSafeReports(reports: Report[]) {
  return sumOf(reports, (report) => areLevelsSafe(report) ? 1 : 0);
}

export function countSafeReportsWithDampener(reports: Report[]) {
  return sumOf(reports, (report) => areLevelsSafeWithDampener(report) ? 1 : 0);
}

export function areLevelsSafeWithDampener(report: Report) {
  const isUnsafe = !areLevelsSafe(report);
  if (isUnsafe) {
    const checklist = new Array(report.length).fill(false);
    return checkReportWithDampener(report, checklist);
  }
  return true;
}

function checkReportWithDampener(
  report: Report,
  reportChecklist: boolean[],
) {
  const checkCompleted = reportChecklist.every(Boolean);
  if (checkCompleted) return false;

  const { report: dampenedReport, checklist } = dampenReport(
    report,
    reportChecklist,
  );

  const isSafe = areLevelsSafe(dampenedReport);
  if (isSafe) return true;

  return checkReportWithDampener(report, checklist);
}

function dampenReport(report: Report, reportChecklist: boolean[]) {
  const dampenedReport: Levels[] = [...report];

  for (let levelIndex = 0; levelIndex < report.length; levelIndex++) {
    const checked = reportChecklist[levelIndex];
    if (checked) {
      continue;
    }

    reportChecklist[levelIndex] = true;
    dampenedReport.splice(levelIndex, 1);
    break;
  }

  return {
    report: dampenedReport,
    checklist: reportChecklist,
  };
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
