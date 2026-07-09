# Architecture Audit: Story Adapter Readback Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T07-48-29-04-00`

## Summary

`TheUnmappedHouse` is architecturally small but highly collapsed: source descriptors, browser command handling, state mutation, save IO, route progression, interlude timing, StageKit scene loading, UI projection, and debug output still converge in `src/game.js`.

The next source pass should not rewrite `StageKit`. It should introduce pure story-authority DSKs and make the browser route consume source-owned command/result/projection records.

## Current runtime composition

```txt
index.html
  -> src/game.js
    -> imports StageKit
    -> imports gameTitle/scenes from story-data
    -> owns state/currentScene/SAVE_KEY/browser DOM adapters
  -> src/stage-kit.js
    -> imports Three.js CDN
    -> imports aspect-frame helpers
    -> renders scene descriptors
  -> src/story-data.js
    -> owns scene/hotspot/clue/completion/interlude descriptors
```

## Current interaction loop

```txt
open index.html
  -> game.js loads saved state
  -> currentScene is resolved
  -> StageKit is constructed
  -> StageKit loads current scene descriptor
  -> side button or StageKit raycast invokes inspectHotspot(hotspot)
  -> inspectHotspot mutates state and DOM-facing text/log
  -> sceneComplete checks clue requirements directly
  -> completion schedules showInterlude(currentScene)
  -> continue invokes nextScene()
  -> nextScene mutates route/current scene/interlude/stage/UI/save
  -> KeyR clears save and reloads
  -> renderUi writes browser debug JSON
```

## DSK/domain breakdown

| Domain | Current owner | Current service | Gap | Next DSK cut |
|---|---|---|---|---|
| Static shell | `index.html` | Boot DOM route | Stable | keep stable |
| Story source | `src/story-data.js` | Scene/hotspot/clue descriptors | No manifest/version/readback | `story-source-manifest-kit` |
| Browser runtime | `src/game.js` | Command, reducer, adapter, save, debug | Too much authority | `story-host-adapter-kit` |
| Save state | `src/game.js` | Shallow localStorage merge/write | No normalization result | `save-projection-kit` |
| Story command | `inspectHotspot`, `nextScene`, KeyR | Direct function calls | No envelope/reasons | `story-command-envelope-kit` |
| Story preflight | inline branches | Existence/repeat/completion checks | No row-level proof | `story-preflight-kit` |
| Story result | implicit state mutation | accepted/no-op/terminal not explicit | No result contract | `story-command-result-kit` |
| Story events | `writeLog` strings | Notebook entries | No event records | `story-event-record-kit` |
| Story projection | `renderUi` | Title/text/hotspot/debug DOM | Browser-only projection | `story-projection-kit` |
| Interlude | `showInterlude`, `nextScene` | DOM overlay state | Timing hidden from fixtures | `interlude-projection-kit` |
| Stage projection | `stage.loadScene(currentScene)` | Stage scene load | No pure intent/readback | `stage-projection-kit` |
| Render host | `src/stage-kit.js` | Three renderer/camera/materials/hotspots | Needs readback, not rewrite | `stage-scene-snapshot-kit` |
| Adapter plan | none | n/a | Browser decides everything | `browser-adapter-plan-kit` |
| Adapter readback | none | n/a | No proof of consumed plan | `browser-adapter-readback-kit` |
| GameHost diagnostics | debug DOM only | ad hoc JSON | No API | `gamehost-story-diagnostics-kit` |
| Central ledger readback | manual docs | repo ledger text | No source-proven row | `central-ledger-readback-kit` |
| Fixture replay | none | n/a | No DOM-free proof | `dom-free-story-fixture-kit` |

## Implemented kits

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
```

## Next-cut kits

```txt
story-source-manifest-kit
story-source-snapshot-kit
story-state-snapshot-kit
stage-scene-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-event-record-kit
story-reducer-kit
story-projection-kit
save-projection-kit
interlude-projection-kit
stage-projection-kit
browser-adapter-plan-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
central-ledger-readback-kit
dom-free-story-fixture-kit
```

## Required source file shape next

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-preflight.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-reducer.js
src/story-authority/story-projection.js
src/story-authority/save-projection.js
src/story-authority/interlude-projection.js
src/story-authority/stage-projection.js
src/story-authority/story-browser-adapter-plan.js
src/story-authority/browser-adapter-readback.js
src/story-authority/gamehost-story-diagnostics.js
src/story-authority/central-ledger-readback.js
src/story-authority/story-fixture-cases.js
scripts/validate-story-authority.mjs
```

## Acceptance bar

The architecture is not meaningfully improved until a DOM-free fixture proves inspection, repeat inspection, unknown hotspot rejection, incomplete continue rejection, scene completion, route continuation, terminal prototype result, save projection, stage projection, browser adapter plan, adapter readback, GameHost diagnostics, and central ledger readback.
