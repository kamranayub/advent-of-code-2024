import { sumOf } from "@std/collections";

interface Instruction {
  func: string;
  text: string;
  exec(): number;
}

class Multiplication implements Instruction {
  public static RxMultiplication = /mul\((\d+),(\d+)\)/g;

  public static create(func: string, match: RegExpMatchArray) {
    if (match.length !== 3) throw new Error("Not a valid Multiplication match");

    const lhs = Number.parseInt(match[1]);
    const rhs = Number.parseInt(match[2]);

    return new Multiplication(func, match[0], lhs, rhs);
  }

  private constructor(
    public func: string,
    public text: string,
    private lhs: number,
    private rhs: number,
  ) {}

  public exec(): number {
    return this.lhs * this.rhs;
  }
}

export function sumInstructionsInMemory(memory: string): number {
  return sumOf(
    findMultiplicationInstructionsInMemory(memory),
    (inst) => inst.exec(),
  );
}

export function findMultiplicationInstructionsInMemory(
  memory: string,
): Instruction[] {
  const matches = [...memory.matchAll(Multiplication.RxMultiplication)];

  if (matches.length === 0) return [];

  return matches.map((m) => Multiplication.create("mul", m));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}
