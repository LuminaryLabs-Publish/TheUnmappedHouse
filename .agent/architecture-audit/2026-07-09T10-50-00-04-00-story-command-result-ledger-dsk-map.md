# Architecture Audit: Story Command Result Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
     -> src/story-data.js
     -> src/stage-kit.js
        -> src/aspect-frame.js
        -> Three.js CDN
```

`src/game.js` is currently the browser entry, story reducer, command handler, route manager, localStorage adapter, StageKit adapter, interlude scheduler, debug projector, and DOM renderer.

`src/stage-kit.js` is already a viable render kit boundary. It should stay stable while story authority is extracted first.

## Current DSK/domain split

```txt
implemented/static-page-shell-kit
  owns index.html shell and browser boot surface

implemented/aspect-frame-kit
  owns deterministic 16:9 frame sizing

implemented/stage-render-kit
  owns Three.js renderer, camera, scene group, fixed frame, target, post-pass, scene loading, hotspot meshes, and animation

implemented/story-data-kit
  owns scene descriptors, hotspots, grants, completion requirements, and interlude text

implemented/browser-story-runtime-kit
  owns current state mutation, save/load, route changes, notebook, DOM text, interlude state, reset, and debug JSON
```

## Missing DSK split

```txt
story-source-manifest-kit
  product id, route id, save key, source version, scene ids, command ids, and central ledger expectations

story-source-snapshot-kit
  immutable snapshot of story descriptor facts

story-state-snapshot-kit
  selected state facts before and after each command

stage-scene-snapshot-kit
  pure camera/layer/prop/hotspot/post-process facts without Three.js

story-command-envelope-kit
  normalized command input for inspect, repeat, continue, load, save, reset, validate, projection, adapter readback, and ledger readback

story-preflight-kit
  source and state validation before mutation

story-command-result-kit
  accepted/rejected/no_mutation/terminal/readback result envelope

story-event-record-kit
  event rows for clues, log entries, route updates, scene completion, stage load intent, save intent, interlude intent, and terminal state

story-command-ledger-kit
  ordered command/result journal for DOM-free fixtures and GameHost diagnostics

story-projection-kit
  UI text, hotspot labels, notebook, clue list, completion, and debug projection values

save-projection-kit
  save/write/clear intent with reason and source version

interlude-projection-kit
  interlude open/close/title/text/timing intent

stage-projection-kit
  scene load intent and reason for StageKit

browser-adapter-plan-kit
  complete list of DOM/StageKit/localStorage actions the browser host should perform

browser-adapter-readback-kit
  consumed plan facts emitted by the browser host

gamehost-story-diagnostics-kit
  additive window.GameHost.getState().story state

central-ledger-readback-kit
  repo-local proof that central ledger path/timestamp/source references match current audit state

dom-free-story-fixture-kit
  deterministic fixture cases proving story authority without browser DOM
```

## Implementation constraint

Do not move renderer responsibilities first.

The first implementation should create pure source authority files under `src/story-authority/`, add `scripts/validate-story-authority.mjs`, then adapt `src/game.js` only after fixture rows pass.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Result Ledger + Adapter Readback Fixture Gate
```
