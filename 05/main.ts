import { sumOf } from "@std/collections";
import { getPuzzleInput, PageRule, PageUpdate } from "./input.ts";

if (import.meta.main) {
  const puzzleInput = await getPuzzleInput();
}

export function sumMiddlePagesInVerifiedUpdates(
  pageRules: PageRule[],
  pageUpdates: PageUpdate[],
) {
  const verifiedUpdates = verifyUpdates(pageRules, pageUpdates);
  return sumOf(verifiedUpdates, (update) => findMiddlePageInUpdate(update));
}

export function findMiddlePageInUpdate(update: PageUpdate) {
  const middle = (update.length + 1) / 2;
  return update[middle - 1];
}

export function verifyUpdates(
  pageRules: PageRule[],
  pageUpdates: PageUpdate[],
) {
  return pageUpdates.filter((update) => verifyUpdate(pageRules, update));
}

export function verifyUpdate(pageRules: PageRule[], pageUpdate: PageUpdate) {
  const appliedRules = findPageRulesThatApply(pageRules, pageUpdate);

  return pageUpdate.every((page, pageIndex) => {
    const pagesAfter = findPageRulesAfter(appliedRules, pageUpdate, page).map(
      (rule) => rule.before,
    );
    const restOfUpdate = pageUpdate.slice(pageIndex + 1);
    const restOfUpdateIsAfter = restOfUpdate.every(
      (pageAfter) => pagesAfter.includes(pageAfter),
    );

    return restOfUpdateIsAfter;
  });
}

export function findPageRulesAfter(
  pageRules: PageRule[],
  pageUpdate: PageUpdate,
  page: number,
) {
  const appliedRules = findPageRulesThatApply(pageRules, pageUpdate);
  return appliedRules.filter((rule) => rule.page === page);
}

export function findPageRulesBefore(
  pageRules: PageRule[],
  pageUpdate: PageUpdate,
  page: number,
) {
  const appliedRules = findPageRulesThatApply(pageRules, pageUpdate);
  return appliedRules.filter((rule) => rule.before === page);
}

export function findPageRulesThatApply(
  pageRules: PageRule[],
  pageUpdate: PageUpdate,
) {
  return pageRules.filter((rule) =>
    pageUpdate.includes(rule.page) && pageUpdate.includes(rule.before)
  );
}
