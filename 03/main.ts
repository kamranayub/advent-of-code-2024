import { sortBy, sumOf } from "@std/collections";
import { getPuzzleInput } from "./input.ts";
import {
  Calculation,
  Do,
  Dont,
  Instruction,
  Multiplication,
} from "./instructions.ts";
import { Instructor } from "./instructor.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const puzzleInput = await getPuzzleInput();
  console.log(sumInstructionsInMemory(puzzleInput));
  console.log(sumEnabledInstructionsInMemory(puzzleInput));
}

export function sumInstructionsInMemory(memory: string): number {
  return sumOf(
    findMultiplicationInstructionsInMemory(memory),
    (inst) => inst.calculate(),
  );
}

export function sumEnabledInstructionsInMemory(memory: string): number {
  return sumOf(
    findEnabledMultiplicationInstructionsInMemory(memory),
    (inst) => inst.calculate(),
  );
}

export function findMultiplicationInstructionsInMemory(
  memory: string,
): Calculation[] {
  const pattern = /mul\((\d+),(\d+)\)/mg;
  const matches = [...memory.matchAll(pattern)];

  if (matches.length === 0) return [];

  return matches.map((m) => Multiplication.create(m));
}

export function findEnabledMultiplicationInstructionsInMemory(
  memory: string,
): Calculation[] {
  const instructions = findInstructionsInMemory(memory);
  const instructor = new Instructor();

  for (const instruction of instructions) {
    instruction.exec(instructor);
  }

  return instructor.calculations;
}

function findInstructionsInMemory(memory: string) {
  const instructions: Instruction[] = [
    ...findMultiplicationInstructionsInMemory(memory),
    ...findDoInstructionsInMemory(memory),
    ...findDontInstructionsInMemory(memory),
  ];

  return sortBy(instructions, (inst) => inst.pos);
}

export function findDoInstructionsInMemory(memory: string): Instruction[] {
  const matches = [...memory.matchAll(/do\(\)/mg)];

  if (matches.length === 0) return [];

  return matches.map((m) => Do.create(m));
}

export function findDontInstructionsInMemory(memory: string): Instruction[] {
  const matches = [...memory.matchAll(/don't\(\)/mg)];

  if (matches.length === 0) return [];

  return matches.map((m) => Dont.create(m));
}
