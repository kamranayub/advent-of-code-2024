import type { Report } from "./main.ts";
import { EOL } from "@std/fs";
import { fromFileUrl } from "@std/path";

export async function getPuzzleInput(): Promise<string> {
  const fileContents = await Deno.readTextFile(
    fromFileUrl(import.meta.resolve("./input.txt")),
  );
  return fileContents;
}

export const sampleInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

export function getReports(input: string): Report[] {
  const reports = input.split(EOL);
  return reports.filter((report) => report.trim().length > 0).map((report) => {
    return report.split(" ").map((level) => Number.parseInt(level, 10));
  });
}
