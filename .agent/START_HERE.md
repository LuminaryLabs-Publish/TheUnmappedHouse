# START HERE: The Unmapped House

Last updated: `2026-07-10T14-28-47-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three deterministic story scenes.

The visible route is stable. Preserve it while adding source-owned command correlation, browser-effect readback, StageKit observations, save observations, and a DOM-free fixture.

Current browser path:

```txt
index.html
  -> src/game.js
       -> src/story-data.js
       -> src/stage-kit.js
            -> src/aspect-frame.js
            -> Three.js 0.160.0 CDN
```

Authority today:

```txt
src/story-data.js  = authored descriptor source
src/game.js        = story authority + browser adapter + persistence + DOM projection
src/stage-kit.js   = render host + descriptor consumer + hotspot picker
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T14-28-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T14-28-47-04-00.md
.agent/architecture-audit/2026-07-10T14-28-47-04-00-story-command-correlation-dsk-map.md
.agent/render-audit/2026-07-10T14-28-47-04-00-stagekit-observation-correlation-gap.md
.agent/interaction-audit/2026-07-10T14-28-47-04-00-input-command-correlation-map.md
.agent/gameplay-audit/2026-07-10T14-28-47-04-00-clue-route-result-loop.md
.agent/story-authority-audit/2026-07-10T14-28-47-04-00-command-correlation-record-contract.md
.agent/save-system-audit/2026-07-10T14-28-47-04-00-localstorage-source-version-readback-gap.md
.agent/deploy-audit/2026-07-10T14-28-47-04-00-command-correlation-fixture-gate.md
```

## Current interaction loop

```txt
open page
  -> restore shallow-merged localStorage state
  -> resolve current scene
  -> load scene descriptors into StageKit
  -> project story panel, hotspot buttons, and debug JSON
  -> inspect through side-panel button or StageKit raycast
  -> mutate inspected/clues/log and save
  -> when all required clues exist, schedule interlude
  -> continue to the next scene and reload StageKit
  -> final continue writes prototype-complete copy
  -> KeyR clears the save and reloads
```

## Main finding

The missing capability is not more content or renderer work. It is a stable causal ledger. Inputs currently produce mutation and browser effects without a command id, typed decision, transition rows, projection record, save observation, StageKit observation, or correlated diagnostics.

`inspectHotspot()`, `nextScene()`, `saveState()`, and `StageKit.clickHotspot()` should first gain additive source/result/readback records while preserving visible behavior.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Correlation Ledger Refresh + StageKit Observation Fixture Gate
```

## Do not do first

```txt
new rooms
inventory
audio
renderer extraction
StageKit rewrite
new shader work
visual polish
```
