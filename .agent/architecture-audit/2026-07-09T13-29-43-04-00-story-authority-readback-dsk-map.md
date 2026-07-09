# Architecture Audit — Story Authority Readback DSK Map

**Timestamp:** `2026-07-09T13-29-43-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
     -> StageKit
     -> story-data scenes
     -> localStorage save/load
     -> inspectHotspot mutation
     -> nextScene mutation
     -> renderUi DOM projection
     -> debug JSON projection
  -> src/stage-kit.js
     -> fixed 16:9 WebGL stage
     -> descriptor consumption
     -> hotspot picking
```

## Current boundary issue

`src/game.js` owns too many architecture roles at once:

```txt
command dispatcher
story reducer
state mutation owner
save/load adapter
route adapter
interlude scheduler
StageKit consumer
DOM projector
debug projector
reset adapter
```

That makes the runtime playable but not fixture-safe. The browser can mutate state correctly, but no DOM-free consumer can prove why a command was accepted, rejected, repeated, terminal, or saved.

## DSK/domain breakdown

```txt
story-authority-domain
  -> story-source-manifest-kit
  -> story-source-snapshot-kit
  -> story-state-snapshot-kit
  -> stage-scene-snapshot-kit

story-command-domain
  -> story-command-envelope-kit
  -> story-command-reason-kit
  -> story-preflight-kit
  -> story-command-result-kit
  -> story-event-record-kit
  -> story-reducer-kit

story-projection-domain
  -> story-projection-kit
  -> save-projection-kit
  -> interlude-projection-kit
  -> stage-projection-kit

browser-adapter-domain
  -> browser-adapter-plan-kit
  -> browser-adapter-readback-kit
  -> gamehost-story-diagnostics-kit

ledger-readback-domain
  -> repo-local-ledger-readback-kit
  -> central-ledger-readback-kit
  -> dom-free-story-fixture-kit
```

## Current implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
stage-render-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
story-data-kit
browser-story-runtime-kit
localstorage-save-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
```

## Current kit services

```txt
AspectFrame:
  deterministic 16:9 frame calculation
  DOM frame application

StageKit:
  WebGL renderer setup
  camera descriptor consumption
  layer/prop/hotspot construction
  pointer hover
  raycast picking
  post-process rendering

Story data:
  title / scenes / hotspots / clues / requirements / interludes

Browser runtime:
  load state
  inspect hotspot
  grant clues
  write log
  check completion
  show interlude
  advance scene
  save state
  render UI
  reset
  debug projection
```

## Next-cut contract

The next source change should make browser events produce a typed command path:

```txt
StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
```

## Main recommendation

Do not refactor `StageKit` first. Add pure story authority and adapter records first, then splice `src/game.js` to consume those records without changing visible behavior.
