import { expect } from "@std/expect";
import { getPuzzleInput, sampleInput } from "./input.ts";
import { WordGrid } from "./word-grid.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
});

Deno.test("can answer part one", async () => {
  const input = await getPuzzleInput();
  const wordGrid = WordGrid.fromInput(input);

  const runs = wordGrid.search("XMAS");

  expect(runs.total).toBe(2567);
});

Deno.test("can answer part two", async () => {
  const input = await getPuzzleInput();
  const wordGrid = WordGrid.fromInput(input);

  const runs = wordGrid.searchForCross("MAS");

  expect(runs.total).toBe(2029);
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

Deno.test("throws error if cell is out of bounds", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);

  expect(() => wordGrid.getLetter(-1, 0)).toThrow("Index out of bounds");
  expect(() => wordGrid.getLetter(wordGrid.cols, 0)).toThrow(
    "Index out of bounds",
  );
  expect(() => wordGrid.getLetter(0, -1)).toThrow("Index out of bounds");
  expect(() => wordGrid.getLetter(0, wordGrid.rows)).toThrow(
    "Index out of bounds",
  );
});

Deno.test("can find horizontal word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "e").length).toBe(3);
  expect(results.runs.filter((r) => r.type === "w").length).toBe(2);
});

Deno.test("can find vertical word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "s").length).toBe(1);
  expect(results.runs.filter((r) => r.type === "n").length).toBe(2);
});

Deno.test("can find diagonal word XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.runs.filter((r) => r.type === "ne").length).toBe(4);
  expect(results.runs.filter((r) => r.type === "nw").length).toBe(4);
  expect(results.runs.filter((r) => r.type === "se").length).toBe(1);
  expect(results.runs.filter((r) => r.type === "sw").length).toBe(1);
});

Deno.test("can find all runs for XMAS", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.search("XMAS");

  expect(results.total).toBe(18);
});

Deno.test("can find all X-MAS instances", () => {
  const wordGrid = WordGrid.fromInput(sampleInput);
  const results = wordGrid.searchForCross("MAS");

  expect(results.total).toBe(9);
});
