import { sortBy, sumOf } from "@std/collections";
import { getPuzzleInput } from "./input.ts";

interface Instruction {
  readonly func: string;
  readonly text: string;
  readonly pos: number;
  exec(instructor: Instructor): void;
}

interface Calculation extends Instruction {
  calculate(): number;
}

class Multiplication implements Calculation {
  public static Pattern = /mul\((\d+),(\d+)\)/mg;
  public func = "mul";

  public static create(match: RegExpMatchArray) {
    if (match.length !== 3) throw new Error("Not a valid Multiplication match");

    const lhs = Number.parseInt(match[1]);
    const rhs = Number.parseInt(match[2]);

    return new Multiplication(match[0], match.index!, lhs, rhs);
  }

  private constructor(
    public text: string,
    public pos: number,
    private lhs: number,
    private rhs: number,
  ) {}

  public calculate(): number {
    return this.lhs * this.rhs;
  }

  public exec(instructor: Instructor): void {
    if (instructor.enabled) {
      instructor.calculations.push(this);
    }
  }
}

class Do implements Instruction {
  public static Pattern = /do\(\)/mg;
  public func = "do";

  constructor(
    public text: string,
    public pos: number,
  ) {}

  public static create(match: RegExpMatchArray) {
    return new Do(match[0], match.index!);
  }

  public exec(instructor: Instructor): void {
    instructor.enabled = true;
  }
}

class Dont implements Instruction {
  public static Pattern = /don't\(\)/mg;
  public func = "don't";

  constructor(
    public text: string,
    public pos: number,
  ) {}

  public static create(match: RegExpMatchArray) {
    return new Dont(match[0], match.index!);
  }

  public exec(instructor: Instructor): void {
    instructor.enabled = false;
  }
}

class Instructor {
  public enabled: boolean = true;
  public calculations: Calculation[] = [];
}

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
  const matches = [...memory.matchAll(Multiplication.Pattern)];

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
  const matches = [...memory.matchAll(Do.Pattern)];

  if (matches.length === 0) return [];

  return matches.map((m) => Do.create(m));
}

export function findDontInstructionsInMemory(memory: string): Instruction[] {
  const matches = [...memory.matchAll(Dont.Pattern)];

  if (matches.length === 0) return [];

  return matches.map((m) => Dont.create(m));
}
