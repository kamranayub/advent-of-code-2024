
import { getPuzzleInputFromFileUrl } from "@puzzle/shared";

export function getPuzzleInput() {
  return getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );
}