# Advent of Code 2024

My learning repo for [Advent of Code 2024](https://adventofcode.com/2024). My goal is to use [Deno](https://docs.deno.com/) to learn it.

> [!CAUTION]
> **Spoilers Ahoy!** My solutions are in `main.ts` files, so peek at your own risk. I'm pretty slow, so you'll probably already be done with the puzzles if you want to see what I did.

## Run it

**Prerequisites**

- [Deno 2.1](https://docs.deno.com/runtime/)

Run all the tests:

```sh
deno test
```

Run a specific puzzle to get the answers:

```sh
deno run <day>/main.ts
```

## Structure

- Folders numbered by day (e.g. Day 1 is `01/`)
- `<day>/main.ts` -- Main run file
- `<day>/main.test.ts` -- Main test file
- `<day>/input.ts` -- Input helpers/module

## Approach

- Disable GitHub Copilot
- Refrain from using ChatGPT and reference Deno docs directly
    - If I get stuck, I may use ChatGPT, but it will be in a rubber duck format
    - I will **not** use ChatGPT to try and solve a puzzle directly (i.e. no feeding inputs, puzzle context, etc.)
- Write tests first that satisfy the puzzle criteria
- Not overly concerned with efficiency/performance -- this is primarily for learning Deno
- May go back and refactor if I learn something about Deno that improves the code

## Deno Learnings

Notes and aha moments collected in `README.md` files for each puzzle I work through.
