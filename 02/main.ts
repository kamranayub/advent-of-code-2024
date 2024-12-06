// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}

export type Report = Levels[];
export type Levels = number;

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
