import { expect } from "@std/expect";
import {
  findDoInstructionsInMemory,
  findDontInstructionsInMemory,
  findEnabledMultiplicationInstructionsInMemory,
  findMultiplicationInstructionsInMemory,
  sumEnabledInstructionsInMemory,
  sumInstructionsInMemory,
} from "./main.ts";
import {
  getPuzzleInput,
  partOneSampleInput,
  partTwoSampleInput,
} from "./input.ts";

Deno.test("should read puzzle input from file", async () => {
  const puzzleInput = await getPuzzleInput();

  expect(puzzleInput).toBeDefined();
});

Deno.test("should have correct answer for part one", async () => {
  const puzzleInput = await getPuzzleInput();
  const answer = sumInstructionsInMemory(puzzleInput);

  expect(answer).toBe(166357705);
});

Deno.test("should have correct answer for part two", async () => {
  const puzzleInput = await getPuzzleInput();
  const answer = sumEnabledInstructionsInMemory(puzzleInput);

  expect(answer).toBe(88811886);
});

Deno.test("should detect multiple multiplication instructions in string", () => {
  const instructions = findMultiplicationInstructionsInMemory(
    partOneSampleInput,
  );

  expect(instructions.length).toBe(4);
  expect(instructions[0].text).toBe("mul(2,4)");
  expect(instructions[1].text).toBe("mul(5,5)");
  expect(instructions[2].text).toBe("mul(11,8)");
  expect(instructions[3].text).toBe("mul(8,5)");
});

Deno.test("should execute multiplication instruction and return calculated result", () => {
  const instructions = findMultiplicationInstructionsInMemory(
    partOneSampleInput,
  );
  expect(instructions.length).toBe(4);
  expect(instructions[0].exec()).toBe(8);
  expect(instructions[1].exec()).toBe(25);
  expect(instructions[2].exec()).toBe(88);
  expect(instructions[3].exec()).toBe(40);
});

Deno.test("should sum instructions and return total", () => {
  const total = sumInstructionsInMemory(partOneSampleInput);
  expect(total).toBe(161);
});

Deno.test("should detect 'do()' instructions in memory", () => {
  const instructions = findDoInstructionsInMemory(
    partTwoSampleInput,
  );

  expect(instructions.length).toBe(1);
  expect(instructions[0].func).toBe("do");
  expect(instructions[0].text).toBe("do()");
});

Deno.test("should detect 'don't()' instructions in memory", () => {
  const instructions = findDontInstructionsInMemory(
    partTwoSampleInput,
  );

  expect(instructions.length).toBe(1);
  expect(instructions[0].func).toBe("don't");
  expect(instructions[0].text).toBe("don't()");
});

Deno.test("should detect enabled multiplication instructions in string", () => {
  const instructions = findEnabledMultiplicationInstructionsInMemory(
    partTwoSampleInput,
  );

  expect(instructions.length).toBe(2);
  expect(instructions[0].text).toBe("mul(2,4)");
  expect(instructions[1].text).toBe("mul(8,5)");
});
