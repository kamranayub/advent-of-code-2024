# Learnings

## Upgrading Deno is easy

`deno upgrade`

VS Code extension will notify you in status bar

## Where is OS newline constant?

There does not appear to be a built-in for Node's `os.EOL`

You can get it though with [Deno's compatibility layer for Node APIs](https://docs.deno.com/runtime/fundamentals/node/#using-node's-built-in-modules)

```ts
import { EOL } from 'node:os'
```

You do not need to add it as a dependency (in fact, it doesn't work)

## Debugging

With VS Code extension, create `launch.config` under **Run and Debug** tab.

### Debug Tests

Adjust launch.config to run `deno test` command and pass folder:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "request": "launch",
            "name": "Debug Tests",
            "type": "node",
            "program": "${workspaceFolder}/02",
            "cwd": "${workspaceFolder}",
            "env": {},
            "runtimeExecutable": "/Users/kamranicus/.deno/bin/deno",
            "runtimeArgs": [
                "test",
                "--unstable",
                "--inspect-wait",
                "--allow-all"
            ],
            "attachSimplePort": 9229
        }
    ]
}
```

Can then set breakpoints.

**Why doesn't it work with top-level workspace directory?** Trying to set `program` to just `${workspaceFolder}` didn't work.

## Reading files

Thought I needed `@std/fs` but no, can use `Deno.readTextFile` Promise-based API. Easy!

You will need to `--allow-read` when testing and running:

```sh
deno test -R --watch
deno run -R main.ts
```

When running interactively, it will prompt you to allow read which is handy.

### Note: Relative paths

Similar to other programs, it looks like Deno bases the path on the working directory `deno` is executed in.

So when I try to run `deno test -R` at the workspace root, `./input.txt` is not resolved correctly.

**Question:** How could I make it work for both running `deno test` at the root and in the project directory?

**Answer:** Use `import.meta.resolve` to resolve the path relative to the current module, then use `fromFileURL` from `@std/fs` to convert the `file:///` path.

## Lockfile

When I added `node:os` originally, either the extension (or Deno?) updated the `deno.lock` to include `npm:@types/node@*` specifier.

However, now that it's gone, the lockfile specifier remains. Not sure if that's expected or not. I cannot see a CLI flag that "re-verifies" the Lockfile.