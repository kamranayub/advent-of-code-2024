import type { Instructor } from "./instructor.ts";

export interface Instruction {
  readonly func: string;
  readonly text: string;
  readonly pos: number;
  exec(instructor: Instructor): void;
}

export interface Calculation extends Instruction {
  calculate(): number;
}

export class Multiplication implements Calculation {
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

export class Do implements Instruction {
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

export class Dont implements Instruction {
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
