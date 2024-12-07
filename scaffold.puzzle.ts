import { parseArgs } from "@std/cli";
import { join } from "@std/path";

const scaffoldArgs = parseArgs(Deno.args);
const puzzleNumber = await parsePuzzleNumber(scaffoldArgs._);
const puzzleDirname = puzzleNumber.toString().padStart(2, "0");

console.log(
  "Scaffolding puzzle",
  puzzleNumber,
  "into dir",
  `./${puzzleDirname}`,
);

await Deno.mkdir(puzzleDirname);
await createDenoJson();
await createEntrypoint();
await createTests();
await createInput();
await createReadme();
await updateWorkspace();

async function parsePuzzleNumber(args: (string | number)[]): Promise<number> {
  if (args.length > 0 && typeof args[0] === "number") {
    return args[0];
  }

  return await getNextPuzzleNumber();
}

async function getNextPuzzleNumber() {
  const dirs = Deno.readDir(".");
  let lastPuzzle = 0;
  for await (const dir of dirs) {
    const potentialPuzzle = Number.parseInt(dir.name, 10);
    if (isNaN(potentialPuzzle) || potentialPuzzle < lastPuzzle) {
      continue;
    }
    lastPuzzle = potentialPuzzle;
  }

  return lastPuzzle + 1;
}

async function createDenoJson() {
  const denoJson = {
    name: `@puzzle/${puzzleDirname}`,
    exports: "./main.ts",
    tasks: {
      dev: "deno run --watch main.ts",
    },
  };

  await Deno.writeTextFile(
    join(puzzleDirname, "deno.json"),
    JSON.stringify(denoJson, null, 2),
  );
}

async function createEntrypoint() {
  const content = `
import { getPuzzleInput } from "./input.ts";

if (import.meta.main) {
  const puzzleInput = await getPuzzleInput();
}`;

  await Deno.writeTextFile(join(puzzleDirname, "main.ts"), content);
}

async function createTests() {
  const content = `
import { expect } from "@std/expect";
import { getPuzzleInput } from "./input.ts";

Deno.test("can read puzzle input", async () => {
  const input = await getPuzzleInput();
  expect(input).toBeDefined();
})`;

  await Deno.writeTextFile(join(puzzleDirname, "main.test.ts"), content);
}

async function createInput() {
  const content = `
import { getPuzzleInputFromFileUrl } from "@puzzle/shared";

export function getPuzzleInput() {
  return getPuzzleInputFromFileUrl(
    import.meta.resolve("./input.txt"),
  );
}`;

  await Deno.writeTextFile(join(puzzleDirname, "input.ts"), content);
  await Deno.writeTextFile(
    join(puzzleDirname, "input.txt"),
    "",
  );
}

async function createReadme() {
  await Deno.writeTextFile(join(puzzleDirname, "README.md"), "# Learnings");
}

async function updateWorkspace() {
  const workspaceConfig = await Deno.readTextFile("deno.json");
  const workspaceJson = JSON.parse(workspaceConfig);

  workspaceJson.workspace = [...workspaceJson.workspace, `./${puzzleDirname}`];

  await Deno.writeTextFile("deno.json", JSON.stringify(workspaceJson, null, 2));
}
