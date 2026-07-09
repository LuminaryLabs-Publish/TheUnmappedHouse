# Next Steps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T13-38-15-04-00`

## Next safe ledge

Build the story authority central sync and browser adapter fixture gate.

Do not expand story content first.

Do not rewrite StageKit first.

Do not change the route, localStorage key, story copy, StageKit picking behavior, fixed 16:9 frame, public static shell, or Pages workflow unless validation proves it is required.

## Current ledge name

```txt
TheUnmappedHouse Story Authority Central Sync + Browser Adapter Fixture Gate
```

## Implementation order

1. Add pure story authority modules under `src/story-authority/`.
2. Add `StorySourceManifest` with product id, route id, save key, scene ids, command ids, source version, and fixture expectations.
3. Add source and state snapshot builders.
4. Add command envelope and reason catalog.
5. Add preflight for inspect, continue, reset intent, save/load, projection, and ledger readback.
6. Add command result records for accepted, rejected, no-mutation, complete-scene, terminal-complete, corrupted-save-fallback, and reset-intent.
7. Add projection records for story text, notebook log, save intent, interlude intent, StageKit intent, and debug diagnostics.
8. Add browser adapter plan and adapter readback contracts.
9. Add DOM-free fixture rows before wiring browser behavior.
10. Add compatibility-safe `globalThis.UnmappedHouseHost.getState()` diagnostics.
11. Wire `src/game.js` to consume the pure records while preserving visible behavior.
12. Add fixture script to `npm run check`.

## Validation target

```txt
npm run check
node scripts/story-authority-fixture.mjs
manual browser route smoke after fixture rows pass
```

## Stop condition for the next implementation

Stop when fixture rows prove:

```txt
first inspect accepted + clue grant + save intent
repeat inspect no_mutation + log/text compatibility
scene completion + interlude intent
continue accepted + stage projection
terminal continue terminal_complete + no scene mutation
corrupted save fallback
reset intent without hard browser dependency
repo-local ledger readback
central ledger readback
browser adapter readback skeleton
```
