import { fromFileUrl } from "@std/path";

export const sampleInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

export async function getPuzzleInput(): Promise<string> {
  const fileContents = await Deno.readTextFile(
    fromFileUrl(import.meta.resolve("./input.txt")),
  );
  return fileContents;
}
