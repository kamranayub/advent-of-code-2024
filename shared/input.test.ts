import { expect } from "@std/expect";
import { getPuzzleInputFromFileUrl } from "./input.ts";

Deno.test("reads input from file url", async () => {
  const input = await getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );

  expect(input).toBe("test");
});
