# START HERE: The Unmapped House

Last updated: `2026-07-10T10-11-35-04-00`

## Current state

`TheUnmappedHouse` is a fixed-camera anime horror point-and-click prototype.

The visible three-scene route is stable. Keep it stable while source-owned story command/result/projection and browser adapter readback proof are added.

Current browser path:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`src/story-data.js` is the story descriptor source of truth.

## Read this pass first

```txt
.agent/trackers/2026-07-10T10-11-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T10-11-35-04-00.md
.agent/architecture-audit/2026-07-10T10-11-35-04-00-story-adapter-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-10T10-11-35-04-00-stagekit-adapter-readback-gap.md
.agent/interaction-audit/2026-07-10T10-11-35-04-00-hotspot-adapter-result-readback-map.md
.agent/gameplay-audit/2026-07-10T10-11-35-04-00-story-route-adapter-readback-loop.md
.agent/story-authority-audit/2026-07-10T10-11-35-04-00-story-source-command-readback-contract.md
.agent/deploy-audit/2026-07-10T10-11-35-04-00-story-adapter-fixture-gate.md
```

## Current interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> src/game.js imports StageKit and story descriptors from src/story-data.js
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi() writes title/text/buttons/debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspect mutates state, grants clues, logs, checks completion, renders, saves
  -> repeat inspect writes text/log/UI/save without typed no_mutation result
  -> continue mutates route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete copy directly into interlude DOM
  -> KeyR clears localStorage and reloads
```

## Main finding

`TheUnmappedHouse` should not start next with new story rooms, inventory, audio, renderer extraction, visual polish, or a `StageKit` rewrite.

The blocker is browser adapter readback. `src/game.js` still owns command interpretation, mutation, save writes, interlude timing, route changes, StageKit scene loading, terminal DOM copy, reset, and debug JSON together.

## Next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Ledger Refresh + DOM-Free Fixture Gate
```
