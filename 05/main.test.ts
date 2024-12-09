import { expect } from "@std/expect";
import {
  getPuzzleInput,
  parsePageRules,
  parsePageUpdates,
  sampleInput,
} from "./input.ts";
import {
  findPageRulesThatApply,
  findPageRulesThatApplyBefore,
} from "./main.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
});

Deno.test("can parse page rules from input string", () => {
  const pageRules = parsePageRules(sampleInput);

  expect(pageRules.length).toBe(21);
  expect(pageRules[0].page).toBe(47);
  expect(pageRules[0].before).toBe(53);
});

Deno.test("can parse page updates from input string", () => {
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(pageUpdates.length).toBe(6);
  expect(pageUpdates[0]).toEqual([75, 47, 61, 53, 29]);
});

Deno.test("can find rules that apply to update", () => {
  const pageRules = parsePageRules(sampleInput);
  const appliedRules = findPageRulesThatApply(
    pageRules,
    [75, 47, 61, 53, 29],
  );

  expect(appliedRules.length).toBe(10);
  expect(appliedRules[0]).toEqual({ page: 47, before: 53 });
});

Deno.test("can find pages in update that must be after a given page", () => {
  const pageRules = parsePageRules(sampleInput);
  const appliedRules = findPageRulesThatApplyBefore(
    pageRules,
    [75, 47, 61, 53, 29],
    75,
  );

  expect(appliedRules.length).toBe(4);
  expect(appliedRules[0]).toEqual({ page: 75, before: 29 });
  expect(appliedRules[1]).toEqual({ page: 75, before: 53 });
  expect(appliedRules[2]).toEqual({ page: 75, before: 47 });
  expect(appliedRules[3]).toEqual({ page: 75, before: 61 });
});
