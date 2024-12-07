import type { Calculation } from "./instructions.ts";

export class Instructor {
  public enabled: boolean = true;
  public calculations: Calculation[] = [];
}
