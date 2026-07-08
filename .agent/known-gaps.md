# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T12-59-11-04-00`

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no command envelope for inspection, continuation, load, save, projection, or reset.
- There are no stable accepted/rejected/no-mutation/result records.
- There are no stable reason codes for repeated hotspot, unknown hotspot, incomplete continue, prototype complete, invalid command, duplicate descriptor, or ungrantable required clue.
- Repeat hotspot inspection is a direct UI branch, not a typed repeated-inspection result.
- The clue ledger mutates directly through `grantClues`.
- Scene completion is calculated directly in the host runtime without a `SceneCompletionResult`.
- Interlude progression mutates route state directly through `nextScene`.
- Save writes happen directly from the same code path as UI projection.
- Reset deletes localStorage and reloads instead of returning a reset result and clear-save intent.
- The debug notebook is a live DOM projection, not a stable diagnostics API.
- There is no command journal or route journal row shape.
- There is no DOM-free story replay fixture.

## Render and projection gaps

- `StageKit` can load visual descriptors, but no pure `StageSceneSnapshot` reports camera, layer, prop, hotspot, post-process, and validation facts without Three.js.
- `window.GameHost` is not yet implemented as an additive diagnostics surface for story results.
- Current `debug` JSON is useful but does not include latest command result, result reason, event records, fixture status, or stage snapshot.

## Source validation gaps

- Duplicate scene IDs are not rejected before runtime.
- Duplicate hotspot IDs are not rejected before runtime.
- Completion requirements are not checked against grantable clue IDs.
- Loaded saved state is only shallow-merged with the initial state.
- Loaded `sceneId` can fall back silently through `currentScene = scenes.find(...) ?? scenes[0]` without result metadata.

## Testing gaps

- `npm run check` only runs syntax checks.
- There is no `scripts/validate-story-authority.mjs` fixture.
- There is no fixture row for first inspect, repeat inspect, unknown hotspot, incomplete continue, full route, save/load, reset, source validation, stage snapshot, story projection, or GameHost projection.

## Do not solve by

```txt
expanding story content first
rewriting StageKit first
changing the public route
changing the localStorage key
adding browser-only tests before reducer fixtures exist
moving story authority into DOM handlers again
```
