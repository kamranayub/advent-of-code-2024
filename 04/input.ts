import { getPuzzleInputFromFileUrl } from "@puzzle/shared";

export const sampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

export function getPuzzleInput() {
  return getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );
}
