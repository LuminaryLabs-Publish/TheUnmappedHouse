# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-08T21-00-12-04-00`

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no source-owned story command envelope for inspection, continuation, load, save, projection, or reset.
- There is no explicit `StoryPreflight` that validates source descriptors, loaded state, command shape, current scene, and target hotspot before mutation.
- There are no stable accepted/rejected/no-mutation/terminal result records.
- There are no stable reason codes for repeated hotspot, unknown hotspot, incomplete continue, prototype complete, invalid command, malformed save, duplicate descriptor, or ungrantable required clue.
- Repeat hotspot inspection is a direct UI branch, not a typed repeated-inspection result.
- The clue ledger mutates directly through `grantClues`.
- Scene completion is calculated directly in the host runtime without a `SceneCompletionResult`.
- Interlude progression mutates route state directly through `nextScene`.
- Save writes happen directly from the same code path as UI projection.
- Reset deletes localStorage and reloads instead of returning a reset result and clear-save intent.
- The debug notebook is a live DOM projection, not a stable diagnostics API.
- There is no command journal, route journal, save journal, preflight journal, adapter journal, or fixture summary row shape.
- There is no DOM-free story replay fixture.

## Browser adapter gaps

- `inspectHotspot(hotspot)` is command dispatcher, reducer, text projector, log writer, completion detector, interlude scheduler, UI renderer, and save trigger in one function.
- `nextScene()` directly mutates `currentScene`, `state.sceneId`, `state.route`, interlude DOM state, StageKit scene state, UI, and save state.
- `loadState()` shallow-merges localStorage into initial state without normalization facts, fallback reasons, rejected-save metadata, or source version.
- `saveState()` has no `SaveProjection`, save reason, save version, clear-save intent, or save parity fixture.
- `setTimeout(showInterlude, 450)` hides completion timing from reducer fixtures.
- There is no `StoryBrowserAdapterPlan` saying what the browser should update after each result.
- There is no host adapter boundary where the DOM host consumes `StoryProjection`, `SaveProjection`, `InterludeProjection`, and `StageProjection` without owning story rules.
- There is no additive `window.GameHost.getState()` story diagnostics surface.

## Render and projection gaps

- `StageKit` can load visual descriptors, but no pure `StageSceneSnapshot` reports camera, layer, prop, hotspot, post-process, and validation facts without Three.js.
- There is no `StageProjection` readback contract for the host to say what scene should be loaded and why.
- Current `debug` JSON does not include latest command result, preflight status, result reason, event records, fixture status, save projection, interlude projection, stage projection, stage snapshot, adapter plan, or source validation status.
- There is no stage descriptor readback fixture that proves every scene has camera, post settings, visible layers/props, and clickable hotspots.

## Source validation gaps

- Duplicate scene IDs are not rejected before runtime.
- Duplicate hotspot IDs are not rejected before runtime.
- Completion requirements are not checked against grantable clue IDs.
- Loaded saved state is only shallow-merged with the initial state.
- Loaded `sceneId` can fall back silently through `currentScene = scenes.find(...) ?? scenes[0]` without result metadata.
- Terminal route behavior writes prototype-complete text directly into DOM state without a `PrototypeCompleteResult`.
- Stage descriptor validity is implicit in `StageKit.loadScene(sceneData)`, not proven in a DOM-free source preflight.

## Testing gaps

- `npm run check` only runs syntax checks.
- There is no `scripts/validate-story-authority.mjs` fixture.
- There is no fixture row for first inspect, repeat inspect, unknown hotspot, incomplete continue, full route, save/load, reset, source validation, stage snapshot, story projection, interlude projection, save projection, stage projection, browser adapter plan, or GameHost projection.

## Do not solve by

```txt
expanding story content first
rewriting StageKit first
changing the public route
changing the localStorage key
adding browser-only tests before reducer fixtures exist
moving story authority into DOM handlers again
hiding the adapter plan inside renderUi or nextScene
```
