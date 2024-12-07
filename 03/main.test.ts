import { expect } from "@std/expect";
import { findMultiplicationInstructionsInMemory } from "./main.ts";
import { sampleInput } from "./input.ts";

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
});
