import { expect } from "@std/expect";
import {
  findMultiplicationInstructionInMemory,
  findMultiplicationInstructionsInMemory,
} from "./main.ts";
import { sampleInput } from "./input.ts";

Deno.test("should detect single multiplication instruction in string", () => {
  const instruction = findMultiplicationInstructionInMemory(sampleInput);

  expect(instruction).not.toBeNull();
  expect(instruction!.func).toBe("mul");
  expect(instruction!.text).toBe("mul(2,4)");
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
  const instruction = findMultiplicationInstructionInMemory(sampleInput);
  expect(instruction).not.toBeNull();
  expect(instruction.exec()).toBe(8);
});
