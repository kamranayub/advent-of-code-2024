# Puzzle 01

## Deno Learnings

- Initialize project with `deno init`
- VS Code: [Install Deno extension](https://docs.deno.com/runtime/getting_started/setup_your_environment/#visual-studio-code) to get Intellisense set up
- Testing: 
    - Supports `main_test.ts` or `main.test.ts` filename styles
    - Can use `@std/expect` for Jest-style `expect` assertions
    - Run with `deno test`
- Formatting and linting:
    - Run manually `deno fmt` and `deno lint`
    - Enabled in VS Code settings (`deno.lint` and formatter is `denoland.vscode-deno`)
- Importing
    - Standard library is `@std/` 
    - Prefix with `jsr:` in import module to direct import from JSR
    - **Why doesn't importing without `jsr:` prefix work?**
        - It does if you add via `deno add jsr:@std/*`
        - This wasn't clear when I started with [Testing](https://docs.deno.com/runtime/fundamentals/testing/) page
        - The `jsr:` prefix allows you to import directly without adding
        - _NOTE:_ Using `jsr:` direct imports does not appear to add to `deno.lock` so it does not seem suited for a "project" but nice for scripts (I would advise pinning version but probably only to major thanks to Standard Library long-term compat).
- Collections
    - Initially thought about writing manual `Array.sort` function but decided to check stdlib
    - Found `@std/collections` which provides Lodash-like utilities.
    - Used `sortBy` which sorts ASC by default