# Architecture audit: story adapter readback catch-up DSK map

Timestamp: `2026-07-09T23-28-35-04-00`

## DSK shape

```txt
story-data-kit
  -> scene, hotspot, clue, stage, camera, post, and interlude descriptors
  -> consumed by browser-story-runtime-kit and StageKit

browser-story-runtime-kit
  -> owns command dispatch, mutation, persistence, route, DOM projection, debug JSON
  -> calls StageKit.loadScene(scene)
  -> currently lacks typed command result/readback rows

stage-render-kit
  -> consumes scene descriptor records
  -> owns WebGL, fixed frame, camera, layer/prop/hotspot meshes, raycast picking, hover, post-process
  -> should remain stable during next source-authority cut

planned story-authority kits
  -> source manifest
  -> source/state/stage snapshots
  -> command envelope
  -> reason catalog
  -> preflight
  -> command result
  -> event/replay journal
  -> projection records
  -> browser adapter plan/readback
  -> fixture rows
  -> additive GameHost diagnostics
```

## Domains mapped

- Source descriptor domain: `src/story-data.js`.
- Browser command domain: `inspectHotspot`, `nextScene`, reset, and debug projection in `src/game.js`.
- Mutation domain: clues, inspected map, log, completed scenes, current route, interlude state, terminal state.
- Persistence domain: shallow localStorage load/save.
- Render consumption domain: `StageKit.loadScene(scene)`.
- Interaction domain: side-panel button clicks and `StageKit` raycast hotspot clicks.
- Projection domain: DOM text, clue list, log list, interlude overlay, debug JSON.
- Deploy/check domain: static files plus `npm run check` syntax gate.
- Ledger domain: root `.agent` docs and central LuminaryLabs ledger.

## Boundary read

`story-data.js` is source-like. `stage-kit.js` is consumer-like. `game.js` is both source authority and browser adapter, which makes it the unsafe join. The next cut should split pure story authority from browser projection without changing the visible route.

## Required next architecture proof

- Every hotspot command returns a row with `status`, `reason`, `sceneId`, `hotspotId`, `grantedClues`, `alreadyInspected`, `completedScene`, `saveIntent`, `interludeIntent`, `stageLoadIntent`, and `projectionIntent`.
- Repeated hotspot inspection must produce an explicit `no_mutation` result instead of silent browser-only re-render/save behavior.
- Terminal continuation must return a typed terminal route result.
- Browser adapter must consume command results and expose readback without owning story mutation.
