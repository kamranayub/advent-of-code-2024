type Instruction = {
  text: string;
  func: string;
};

const rxMultiplication = /mul\(\d+,\d+\)/g;

export function findMultiplicationInstructionInMemory(
  memory: string,
): Instruction | null {
  const matches = memory.match(rxMultiplication);

  if (matches === null) return null;

  return { func: "mul", text: matches[0] };
}

export function findMultiplicationInstructionsInMemory(
  memory: string,
): Instruction[] {
  const matches = [...memory.matchAll(rxMultiplication)];

  if (matches.length === 0) return [];

  return matches.map((m) => ({ func: "mul", text: m[0] }));
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}
