import { expect } from "@std/expect";
import { getPuzzleInput, sampleInput } from "./input.ts";
import { WordGrid } from "./word-grid.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
});

Deno.test("can create word grid from puzzle input", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);

  expect(wordGrid.rows).toBe(10);
  expect(wordGrid.cols).toBe(10);
});

Deno.test("can retrieve letter at cell xy position", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);

  expect(wordGrid.getLetter(0, 0)).toBe("M");
  expect(wordGrid.getLetter(1, 0)).toBe("M");
  expect(wordGrid.getLetter(2, 0)).toBe("M");
  expect(wordGrid.getLetter(2, 3)).toBe("A");
  expect(wordGrid.getLetter(3, 2)).toBe("S");
});

Deno.test("can find horizontal word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "horizontal").length).toBe(3);
});

Deno.test("can find vertical word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "vertical").length).toBe(3);
});

Deno.test("can find diagonal word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "diagonal").length).toBe(5);
});
