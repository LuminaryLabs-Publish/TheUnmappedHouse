# START HERE: The Unmapped House

Last updated: `2026-07-10T00-51-03-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime horror point-and-click prototype. The visible route is stable and should stay stable while source-owned story command/readback proof is added.

Current browser path:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T00-51-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T00-51-03-04-00.md
.agent/architecture-audit/2026-07-10T00-51-03-04-00-story-command-readback-catchup-dsk-map.md
.agent/render-audit/2026-07-10T00-51-03-04-00-stagekit-consumption-command-readback.md
.agent/interaction-audit/2026-07-10T00-51-03-04-00-hotspot-command-result-readback.md
.agent/gameplay-audit/2026-07-10T00-51-03-04-00-story-route-fixture-loop.md
.agent/story-authority-audit/2026-07-10T00-51-03-04-00-browser-adapter-command-result-contract.md
.agent/deploy-audit/2026-07-10T00-51-03-04-00-story-fixture-check-gate.md
```

## Main finding

`src/game.js` is still the source-authority bottleneck. It owns command interpretation, direct mutation, save writes, interlude timing, route transitions, terminal copy, `StageKit` scene loading, DOM projection, reset, and debug JSON.

The next cut should source-own story command/result/projection records and prove them through a DOM-free fixture before touching visuals or adding story content.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Readback Catch-up + Browser Adapter Fixture Gate
```

## Do next

- Add pure story-authority modules for command envelopes, reason codes, preflight, command results, snapshots, projection records, save intents, interlude intents, stage-load intents, terminal intents, and replay rows.
- Add a DOM-free story fixture that proves accepted, repeated/no-mutation, completion, continue, terminal, stale/unknown hotspot, save, and stage-load cases.
- Adapt `src/game.js` to consume source-owned records while preserving the current route.
- Add stable additive browser adapter readback, ideally under `window.GameHost` or a similarly stable diagnostic surface.

## Do not start next with

- New story rooms or content.
- Inventory or audio.
- Renderer extraction or `StageKit` rewrite.
- Browser-only smoke gates before fixture rows exist.

## Validation status

Docs-only update. Runtime source was not changed and validation was not run in this pass.
