import { getPuzzleInputFromFileUrl } from "@puzzle/shared";

export const partOneSampleInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

export const partTwoSampleInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

export function getPuzzleInput() {
  return getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );
}
