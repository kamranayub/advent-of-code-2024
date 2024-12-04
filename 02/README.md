# Puzzle 02

## Deno Learnings

- Collections
    - Used `@std/collections/sumOf` to help with calculating times number appears
- Importing
    - Can import outside the project
    - Needs `.ts` module for relative modules
    - Can I use without `.ts`?
        - Yes, but it requires enabling [sloppy imports](https://docs.deno.com/runtime/reference/cli/unstable_flags/#--unstable-sloppy-imports)
        - Why? Sounds like it's for performance reasons.
        - `deno compile` doesn't support sloppy imports
        - Potentially (big) migration task if moving from Node to Deno
            - It would be, except you can run `deno lint --fix` which will [add all the missing file extensions](https://docs.deno.com/runtime/tutorials/cjs_to_esm/#commonjs-vs-ecmascript-resolution) for you :rocket:
- Workspaces
    - Easy to [configure monorepo/workspace](https://docs.deno.com/runtime/fundamentals/workspaces/)
    - Add `deno.json` to top-level with folders + shared deps
    - Remove shared deps from individual folder `deno.json` files
    - Add `name` and `exports` fields to individual `deno.json`
    - Export shared stuff for other packages