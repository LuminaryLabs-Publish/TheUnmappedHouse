# Known Gaps

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T08-02-33-04-00`

## Architecture gaps

- Story authority is embedded in `src/game.js` UI handlers.
- Module-level `state` and `currentScene` are mutated directly.
- There is no `StorySourceManifest` that defines product id, route id, save key, scene ids, command ids, source version, public entry route, and central readback expectations.
- There is no source-owned story command envelope for inspection, continuation, load, save, projection, readback, ledger readback, or reset.
- There is no explicit `StoryPreflight` that validates source descriptors, loaded state, command shape, current scene, target hotspot, completion requirement, and target scene before mutation.
- Repeat hotspot inspection is a direct UI branch, not a typed repeated-inspection result.
- Unknown hotspot, incomplete continue, malformed save, central-ledger mismatch, and terminal prototype states do not have stable reason codes.
- The clue ledger mutates directly through `grantClues`.
- Scene completion is calculated directly in the host runtime without a `SceneCompletionResult`.
- Interlude progression mutates route state directly through `nextScene`.
- Save writes happen directly from the same code path as UI projection.
- Reset deletes localStorage and reloads instead of returning a reset result and clear-save intent.
- The debug notebook is a live DOM projection, not a stable diagnostics API.
- There is no command journal, route journal, save journal, preflight journal, adapter journal, readback journal, central-ledger readback row, or fixture summary row shape.
- There is no DOM-free story replay fixture.

## Browser adapter gaps

- `inspectHotspot(hotspot)` is command dispatcher, reducer, text projector, log writer, completion detector, interlude scheduler, UI renderer, and save trigger in one function.
- `nextScene()` directly mutates `currentScene`, `state.sceneId`, `state.route`, interlude DOM state, StageKit scene state, UI, and save state.
- `loadState()` shallow-merges localStorage into initial state without normalization facts, fallback reasons, rejected-save metadata, or source version.
- `saveState()` has no `SaveProjection`, save reason, save version, clear-save intent, or save parity fixture.
- `setTimeout(showInterlude, 450)` hides completion timing from reducer fixtures.
- There is no `StoryBrowserAdapterPlan` saying what the browser should update after each result.
- There is no `BrowserAdapterReadback` proving what the browser host actually consumed from the plan.
- There is no host adapter boundary where the DOM host consumes `StoryProjection`, `SaveProjection`, `InterludeProjection`, `StageProjection`, and `StoryBrowserAdapterPlan` without owning story rules.
- There is no additive `window.GameHost.getState().story` diagnostics surface.

## Render and projection gaps

- `StageKit` can load visual descriptors, but no pure `StageSceneSnapshot` reports camera, layer, prop, hotspot, and post-process facts without Three.js.
- There is no `StageProjection` readback contract for the host to say what scene should be loaded and why.
- Current debug JSON does not include latest command result, preflight status, result reason, event records, fixture status, save projection, interlude projection, stage projection, stage snapshot, adapter plan, adapter readback, central-ledger readback, or source validation status.
- There is no stage descriptor fixture that proves every scene has camera, post settings, visible layers/props, and clickable hotspots.

## Source validation gaps

- Duplicate scene IDs are not rejected before runtime.
- Duplicate hotspot IDs are not rejected before runtime.
- Completion requirements are not checked against grantable clue IDs.
- Loaded saved state is only shallow-merged with the initial state.
- Loaded `sceneId` can fall back silently through `currentScene = scenes.find(...) ?? scenes[0]` without result metadata.
- Terminal route behavior writes prototype-complete text directly into DOM state without a `PrototypeCompleteResult`.
- Stage descriptor validity is implicit in `StageKit.loadScene(sceneData)`, not proven in a DOM-free source preflight.

## Central tracking gaps

- Central tracking was stale relative to repo-local `.agent` state at selection time.
- Central tracking has no source-owned `CentralLedgerReadback` fixture row.
- The central ledger can be manually updated before repo-local fixtures prove that referenced `.agent` paths and source facts are current.
- The next runtime pass should emit an explicit `central_ledger_snapshot_created` fixture row so the central ledger can be validated against repo-local source paths.

## Testing gaps

- `npm run check` only runs syntax checks.
- There is no `scripts/validate-story-authority.mjs` fixture.
- There is no fixture row for source manifest, first inspect, repeat inspect, unknown hotspot, incomplete continue, full route, save/load, reset, source validation, stage snapshot, story projection, interlude projection, save projection, stage projection, browser adapter plan, browser adapter readback, GameHost projection, or central ledger snapshot.

## Do not solve by

```txt
expanding story content first
rewriting StageKit first
changing the public route
changing the localStorage key
adding browser-only tests before reducer fixtures exist
moving story authority into DOM handlers again
hiding the adapter plan inside renderUi or nextScene
omitting central ledger readback after repo-local .agent updates
```