import { expect } from "@std/expect";
import {
  findMultiplicationInstructionsInMemory,
  sumInstructionsInMemory,
} from "./main.ts";
import { getPuzzleInput, sampleInput } from "./input.ts";

Deno.test("should read puzzle input from file", async () => {
  const puzzleInput = await getPuzzleInput();

  expect(puzzleInput).toBeDefined();
});

Deno.test("should have correct answer for part one", async () => {
  const puzzleInput = await getPuzzleInput();
  const answer = sumInstructionsInMemory(puzzleInput);

  expect(answer).toBe(166357705);
});

Deno.test("should detect multiple multiplication instructions in string", () => {
  const instructions = findMultiplicationInstructionsInMemory(sampleInput);

  expect(instructions.length).toBe(4);
  expect(instructions[0].text).toBe("mul(2,4)");
  expect(instructions[1].text).toBe("mul(5,5)");
  expect(instructions[2].text).toBe("mul(11,8)");
  expect(instructions[3].text).toBe("mul(8,5)");
});

Deno.test("should execute multiplication instruction and return calculated result", () => {
  const instructions = findMultiplicationInstructionsInMemory(sampleInput);
  expect(instructions.length).toBe(4);
  expect(instructions[0].exec()).toBe(8);
  expect(instructions[1].exec()).toBe(25);
  expect(instructions[2].exec()).toBe(88);
  expect(instructions[3].exec()).toBe(40);
});

Deno.test("should sum instructions and return total", () => {
  const total = sumInstructionsInMemory(sampleInput);
  expect(total).toBe(161);
});
