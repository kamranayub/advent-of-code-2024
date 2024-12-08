
import { expect } from "@std/expect";
import { getPuzzleInput } from "./input.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
})