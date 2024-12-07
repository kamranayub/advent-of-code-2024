# Learnings

## Ignoring tests

Pass `{ ignore: true }` as the second argument (or to your test definition object)

```ts
Deno.test('name', { ignore: true }, () => {
    // etc
});
```