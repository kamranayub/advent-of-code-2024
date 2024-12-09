import { getPuzzleInput, PageRule, PageUpdate } from "./input.ts";

if (import.meta.main) {
  const puzzleInput = await getPuzzleInput();
}

export function findPageRulesThatApplyBefore(
  pageRules: PageRule[],
  pageUpdate: PageUpdate,
  page: number,
) {
  const appliedRules = findPageRulesThatApply(pageRules, pageUpdate);
  return appliedRules.filter((rule) => rule.page === page);
}

export function findPageRulesThatApply(
  pageRules: PageRule[],
  pageUpdate: PageUpdate,
) {
  return pageRules.filter((rule) =>
    pageUpdate.includes(rule.page) && pageUpdate.includes(rule.before)
  );
}
