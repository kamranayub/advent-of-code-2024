import { fromFileUrl } from "@std/path";

export async function getPuzzleInputFromFileUrl(
  fileUrl: string,
): Promise<string> {
  const fileContents = await Deno.readTextFile(
    fromFileUrl(fileUrl),
  );
  return fileContents;
}
