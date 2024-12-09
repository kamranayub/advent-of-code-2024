import { expect } from "@std/expect";
import {
  getPuzzleInput,
  parsePageRules,
  parsePageUpdates,
  sampleInput,
} from "./input.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
});

Deno.test("can parse page rules from input string", () => {
  const pageRules = parsePageRules(sampleInput);

  expect(pageRules.length).toBe(21);
  expect(pageRules[0].pageBefore).toBe(47);
  expect(pageRules[0].pageAfter).toBe(53);
});

Deno.test("can parse page updates from input string", () => {
  const pageUpdates = parsePageUpdates(sampleInput);

  expect(pageUpdates.length).toBe(6);
  expect(pageUpdates[0]).toEqual([75, 47, 61, 53, 29]);
});
