# START HERE: The Unmapped House

Last updated: `2026-07-10T15-58-47-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, local browser persistence, and descriptor-driven Three.js rendering.

Preserve the current visible route. The next safe work is source-owned story lifecycle transactions, exactly-once browser effects, save reconciliation, and JSON-safe StageKit load/pick/resource observations.

## Runtime path

```txt
index.html
  -> src/game.js
       -> src/story-data.js
       -> src/stage-kit.js
            -> src/aspect-frame.js
            -> Three.js 0.160.0 CDN
       -> localStorage
       -> DOM / timers / location
```

## Authority today

```txt
src/story-data.js  = authored story, scene, hotspot, stage, camera, fog, material, and post source
src/game.js        = story state + command policy + lifecycle + browser effects + persistence + projection
src/stage-kit.js   = render host + descriptor consumer + hotspot picker + permanent frame loop
src/aspect-frame.js = fixed-aspect viewport policy
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T15-58-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T15-58-47-04-00.md
.agent/architecture-audit/2026-07-10T15-58-47-04-00-story-lifecycle-transaction-dsk-map.md
.agent/render-audit/2026-07-10T15-58-47-04-00-stagekit-resource-lifecycle-observation-gap.md
.agent/interaction-audit/2026-07-10T15-58-47-04-00-input-origin-lifecycle-command-map.md
.agent/gameplay-audit/2026-07-10T15-58-47-04-00-scene-completion-interlude-terminal-loop.md
.agent/story-authority-audit/2026-07-10T15-58-47-04-00-story-lifecycle-transaction-contract.md
.agent/save-system-audit/2026-07-10T15-58-47-04-00-save-reconciliation-terminal-state-gap.md
.agent/lifecycle-audit/2026-07-10T15-58-47-04-00-exactly-once-browser-effect-journal.md
.agent/deploy-audit/2026-07-10T15-58-47-04-00-lifecycle-fixture-check-gate.md
```

## Interaction loop

```txt
open page
  -> load and shallow-merge save
  -> resolve scene
  -> load descriptors into StageKit
  -> project story UI and debug JSON
  -> inspect by side-panel button or raycast
  -> mutate inspected/clues/log and save
  -> schedule interlude after completion
  -> continue and load next scene
  -> final continue writes terminal DOM copy
  -> KeyR clears save and reloads
```

## Main finding

The route has no explicit lifecycle state or exactly-once effect boundary. Completion timing, interlude visibility, terminal completion, save writes, StageKit loads, raycast picks, and reset effects are not represented as correlated source-owned records.

`StageKit.loadScene()` also detaches old scene objects without recording or disposing prior geometry/material resources, and the constructor-owned frame loop/listeners have no teardown contract.

## Next safe ledge

```txt
TheUnmappedHouse Story Lifecycle Transaction Ledger + StageKit Resource Observation Fixture Gate
```

## Do not do first

```txt
new rooms
inventory
audio
renderer replacement
StageKit rewrite
new shader work
camera retuning
visual polish
```