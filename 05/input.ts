import { getPuzzleInputFromFileUrl } from "@puzzle/shared";
import { EOL } from "@std/fs";

export const sampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

export function getPuzzleInput() {
  return getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );
}

export interface PageRule {
  pageBefore: number;
  pageAfter: number;
}

export type PageUpdate = number[];

export function parsePageRules(input: string): PageRule[] {
  const lines = input.trim().split(EOL);
  const rules: PageRule[] = [];

  for (const line of lines) {
    if (line === "") break;

    const [before, after] = line.split("|");

    rules.push({
      pageBefore: Number.parseInt(before, 10),
      pageAfter: Number.parseInt(after, 10),
    });
  }

  return rules;
}

export function parsePageUpdates(input: string): PageUpdate[] {
  const lines = input.trim().split(EOL);
  const updates: PageUpdate[] = [];

  const updateStartIndex = lines.findIndex((line) => line === "");

  for (let i = updateStartIndex + 1; i < lines.length; i++) {
    if (lines[i] === "") continue;

    const pagesRaw = lines[i].split(",");
    const pages = pagesRaw.map((page) => Number.parseInt(page, 10));

    updates.push(pages);
  }

  return updates;
}
