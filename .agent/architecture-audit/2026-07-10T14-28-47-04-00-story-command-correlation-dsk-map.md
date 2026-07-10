# Architecture audit: Story Command Correlation DSK Map

Timestamp: `2026-07-10T14-28-47-04-00`

## Current composition

```txt
index.html
  -> static-page-shell-kit
  -> aspect-frame-kit
  -> src/game.js
       -> story-data-kit
       -> browser-story-runtime-kit
       -> localstorage-save-kit
       -> notebook-log-kit
       -> debug-json-projection-kit
       -> StageKit
            -> stage-render-kit
            -> scene-descriptor-consumer-kit
            -> anime-material-kit
            -> post-process-kit
            -> hotspot-volume-kit
            -> hotspot-picking-kit
```

The composition is functional but vertically coupled. `src/game.js` is simultaneously story command authority, mutation owner, effect planner, browser adapter, persistence adapter, projection adapter, and diagnostics producer.

## Domain ownership

| Domain | Current owner | Boundary problem |
|---|---|---|
| Story source descriptors | `src/story-data.js` | No manifest, schema version, fingerprint, or immutable source snapshot. |
| Story state | `src/game.js` module state | Not independently constructible or replayable outside the DOM. |
| Inspect command | `inspectHotspot()` | Accepts a live descriptor object rather than a source id and returns no result. |
| Continue command | `nextScene()` | Performs transition and browser effects together and returns no result. |
| Completion policy | `sceneComplete()` | Pure enough to extract, but not represented in result rows. |
| Persistence | `loadState()` / `saveState()` | Shallow merge and write occur without schema validation or observations. |
| DOM projection | `renderUi()` | Projection is effectful and not represented as data. |
| Interlude/terminal routing | `showInterlude()` / `nextScene()` | Browser DOM writes are mixed with source decisions. |
| Stage consumption | `StageKit.loadScene()` | Consumes descriptors but emits no serializable observation. |
| Hotspot picking | `StageKit.pick()` / `clickHotspot()` | Callback-only; no source id, input id, hit row, or result correlation. |
| Diagnostics | `renderUi()` debug JSON | Aggregate state only; no causal ids or effect parity. |

## Required DSK split

```txt
story-source-domain
  story-source-manifest-kit
  story-source-fingerprint-kit
  story-source-snapshot-kit

story-command-domain
  story-command-envelope-kit
  story-command-reason-kit
  story-command-preflight-kit
  story-command-result-kit
  story-command-correlation-kit

story-transition-domain
  story-state-snapshot-kit
  story-transition-ledger-kit
  story-replay-kit

browser-effect-domain
  story-projection-ledger-kit
  browser-effect-intent-kit
  browser-effect-readback-kit
  save-write-observation-kit

stage-observation-domain
  stage-load-observation-kit
  stage-pick-observation-kit

story-diagnostics-domain
  gamehost-story-diagnostics-kit
  dom-free-story-fixture-kit
```

## Minimal command envelope

```js
{
  commandId,
  kind: "inspect_hotspot" | "continue_scene" | "reset_story",
  sourceFingerprint,
  sceneId,
  hotspotId,
  issuedAtTick,
  input: {
    origin: "side_panel" | "stage_raycast" | "keyboard"
  }
}
```

## Minimal result envelope

```js
{
  resultId,
  commandId,
  status: "accepted" | "no_mutation" | "rejected",
  reasonCode,
  beforeStateId,
  afterStateId,
  transitionIds,
  effectIntentIds,
  projectionId,
  saveObservationId,
  stageObservationIds
}
```

## Correlation invariant

Every accepted or rejected input should produce exactly one command row and exactly one result row. Accepted commands may produce zero or more transition/effect rows, but every effect readback must point back to the originating `commandId` and `resultId`.

```txt
input row
  -> command row
  -> preflight row
  -> result row
       -> transition rows
       -> projection row
       -> save intent/readback
       -> interlude or terminal intent/readback
       -> stage-load or stage-pick observation
       -> diagnostics snapshot
```

## Migration sequence

1. Build DOM-free source/state/command modules without changing browser behavior.
2. Prove inspect accepted, repeat no-mutation, unknown rejected, and scene mismatch rejected.
3. Add continue and terminal results.
4. Add serializable effect intents and readbacks.
5. Wrap existing `StageKit.loadScene()` and pick callbacks with additive observation rows.
6. Convert `src/game.js` into an adapter that consumes result/effect records.
7. Expose JSON-safe diagnostics while retaining the existing debug fields.

## Non-goals for this ledge

```txt
new rooms
inventory
audio
renderer extraction
new shader work
StageKit rewrite
visual polish
```
