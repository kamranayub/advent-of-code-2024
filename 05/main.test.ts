import { expect } from "@std/expect";
import {
  getPuzzleInput,
  parsePageRules,
  parsePageUpdates,
  sampleInput,
} from "./input.ts";
import {
  findMiddlePageInUpdate,
  findPageRulesAfter,
  findPageRulesBefore,
  findPageRulesThatApply,
  fixIncorrectUpdate,
  sumMiddlePagesInCorrectedUpdates,
  sumMiddlePagesInVerifiedUpdates,
  verifyUpdate,
  verifyUpdates,
} from "./main.ts";

Deno.test("can answer part one correctly", async () => {
  const input = await getPuzzleInput();
  const pageRules = parsePageRules(input);
  const pageUpdates = parsePageUpdates(input);
  const middleSum = sumMiddlePagesInVerifiedUpdates(pageRules, pageUpdates);

  expect(middleSum).toBe(4578);
});

Deno.test("can answer part two correctly", async () => {
  const input = await getPuzzleInput();
  const pageRules = parsePageRules(input);
  const pageUpdates = parsePageUpdates(input);
  const middleSum = sumMiddlePagesInCorrectedUpdates(pageRules, pageUpdates);

  expect(middleSum).toBe(6179);
});

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
});

Deno.test("can parse page rules and updates from puzzle input", async () => {
  const input = await getPuzzleInput();
  const pageRules = parsePageRules(input);
  const pageUpdates = parsePageUpdates(input);

  expect(pageRules.length).toBeGreaterThan(100);
  expect(pageUpdates.length).toBeGreaterThan(100);
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
  const appliedRules = findPageRulesAfter(
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

Deno.test("can find pages in update that must be before a given page", () => {
  const pageRules = parsePageRules(sampleInput);
  const appliedRules = findPageRulesBefore(
    pageRules,
    [75, 47, 61, 53, 29],
    47,
  );

  expect(appliedRules.length).toBe(1);
  expect(appliedRules[0]).toEqual({ page: 75, before: 47 });
});

Deno.test("can verify update is in the correct order", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(verifyUpdate(
    pageRules,
    pageUpdates[0],
  )).toBe(true);
  expect(verifyUpdate(
    pageRules,
    pageUpdates[1],
  )).toBe(true);
  expect(verifyUpdate(
    pageRules,
    pageUpdates[2],
  )).toBe(true);
});

Deno.test("can verify update is not in order if breaks a rule", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(verifyUpdate(
    pageRules,
    pageUpdates[3],
  )).toBe(false);
  expect(verifyUpdate(
    pageRules,
    pageUpdates[4],
  )).toBe(false);
  expect(verifyUpdate(
    pageRules,
    pageUpdates[5],
  )).toBe(false);
});

Deno.test("can list verified updates", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);
  const verified = verifyUpdates(pageRules, pageUpdates);

  expect(verified.length).toBe(3);
});

Deno.test("can find middle page number in verified update", () => {
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(findMiddlePageInUpdate(pageUpdates[0])).toBe(61);
  expect(findMiddlePageInUpdate(
    pageUpdates[1],
  )).toBe(53);
  expect(findMiddlePageInUpdate(
    pageUpdates[2],
  )).toBe(29);
});

Deno.test("can sum middle page numbers in verified updates", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(sumMiddlePagesInVerifiedUpdates(pageRules, pageUpdates)).toBe(143);
});

Deno.test("can order incorrect updates according to page rules", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(fixIncorrectUpdate(pageRules, pageUpdates[3])).toEqual([
    97,
    75,
    47,
    61,
    53,
  ]);
  expect(fixIncorrectUpdate(pageRules, pageUpdates[4])).toEqual([61, 29, 13]);
  expect(fixIncorrectUpdate(pageRules, pageUpdates[5])).toEqual([
    97,
    75,
    47,
    29,
    13,
  ]);
});

Deno.test("can sum middle page of corrected updates", () => {
  const pageRules = parsePageRules(sampleInput);
  const pageUpdates = parsePageUpdates(sampleInput);
  const total = sumMiddlePagesInCorrectedUpdates(pageRules, pageUpdates);

  expect(total).toBe(123);
});
