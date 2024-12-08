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

  expect(wordGrid.getCell(0, 0)).toBe("M");
  expect(wordGrid.getCell(1, 0)).toBe("M");
  expect(wordGrid.getCell(2, 0)).toBe("M");
  expect(wordGrid.getCell(2, 3)).toBe("A");
  expect(wordGrid.getCell(3, 2)).toBe("S");
});
