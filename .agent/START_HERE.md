# START HERE: The Unmapped House

Last updated: `2026-07-10T08-39-05-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime horror point-and-click prototype.

The visible three-scene route is stable and should stay stable while source-owned story command/result/projection/adapter-ledger proof is added.

Current browser path:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/story.js` is not present. The story source of truth is `src/story-data.js`.

## Read this pass first

```txt
.agent/trackers/2026-07-10T08-39-05-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T08-39-05-04-00.md
.agent/architecture-audit/2026-07-10T08-39-05-04-00-story-command-projection-ledger-dsk-map.md
.agent/render-audit/2026-07-10T08-39-05-04-00-stagekit-command-projection-readback-gap.md
.agent/interaction-audit/2026-07-10T08-39-05-04-00-hotspot-command-projection-result-map.md
.agent/gameplay-audit/2026-07-10T08-39-05-04-00-story-route-projection-result-loop.md
.agent/story-authority-audit/2026-07-10T08-39-05-04-00-command-projection-ledger-contract.md
.agent/deploy-audit/2026-07-10T08-39-05-04-00-story-command-fixture-gate.md
```

## Interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> src/game.js imports StageKit and story descriptors
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit.loadScene(currentScene)
  -> renderUi() writes title/text/buttons/debug JSON
  -> hotspot click calls inspectHotspot(hotspot)
  -> first inspect mutates inspected state, grants clues, logs, checks completion, renders, saves
  -> repeat inspect logs/saves without typed no_mutation result
  -> continue mutates route, StageKit scene, interlude DOM, UI, and save state
  -> terminal route writes prototype-complete copy directly into interlude DOM
  -> KeyR clears localStorage and reloads
```

## Main finding

`src/game.js` is still the source-authority and browser-adapter bottleneck. It owns command dispatch, mutation, clue grants, completion checks, interlude scheduling, save writes, StageKit scene loading, terminal copy, DOM projection, reset, and debug JSON together.

`StageKit` consumes descriptors and handles picking, but it exposes no serializable stage-load, pick, hover, or projection readback tied to story command results.

The next cut should source-own story command/result/projection/adapter-ledger records and prove them through a DOM-free fixture before touching visuals or adding story content.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Projection Ledger Refresh + Browser Adapter Fixture Gate
```

## Do next

- Add pure story-authority modules for source manifests, fingerprints, command envelopes, reason codes, preflight, command results, projection records, save intents, interlude intents, terminal intents, stage-load intents, adapter ledger rows, and replay rows.
- Add a DOM-free story fixture that proves accepted, repeated/no-mutation, completion, continue, terminal, stale/unknown hotspot, save, projection, and stage-load cases.
- Adapt `src/game.js` to consume source-owned records while preserving the current route.
- Add stable additive browser adapter readback, ideally under `window.GameHost` or a similarly stable diagnostic surface.

## Do not start next with

- New story rooms or content.
- Inventory or audio.
- Renderer extraction or `StageKit` rewrite.
- Visual polish.
- Browser-only smoke gates before fixture rows exist.

## Validation status

Docs-only update. Runtime source was not changed and validation was not run in this pass.
