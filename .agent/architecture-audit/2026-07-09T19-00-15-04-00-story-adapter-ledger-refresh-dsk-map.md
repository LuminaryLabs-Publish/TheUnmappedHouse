# Architecture Audit: Story Adapter Ledger Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T19-00-15-04-00`

## Current DSK shape

```txt
static page shell
  -> aspect-frame-kit
  -> browser-story-runtime-kit
  -> story-data-kit
  -> stage-render-kit
  -> debug-json-projection-kit
```

The route is coherent, but `browser-story-runtime-kit` is doing too much. It currently owns command dispatch, mutation, save, interlude, StageKit load calls, UI writes, reset, and debug projection inside `src/game.js`.

## Current loop

```txt
index.html
  -> src/game.js
  -> StageKit({ onHotspot: inspectHotspot })
  -> stage.loadScene(currentScene)
  -> inspectHotspot(hotspot)
  -> mutate state / grant clues / write log / schedule interlude / render / save
  -> nextScene()
  -> mutate route / hide interlude / stage.loadScene(next) / render / save
  -> debug JSON from mutable module state
```

## Domain breakdown

```txt
static-page-shell:
  index.html DOM structure, story panel, stage root, hotspot list, notebook, interlude, module entry

fixed-aspect-frame:
  DESIGN_WIDTH, DESIGN_HEIGHT, DESIGN_ASPECT, computeAspectFrame(), applyAspectFrame()

story-source-descriptors:
  gameTitle, scene ids, scene titles, opening text, camera descriptors, stage layers, props, post settings, hotspots, clue grants, completion requirements, interlude text

browser-app-runtime:
  DOM node capture, state/currentScene globals, event listeners, StageKit construction, UI render path

story-state:
  sceneId, clues, flags, inspected, route, log

save-state:
  SAVE_KEY, loadState(), saveState(), localStorage JSON round trip

command-authority:
  inspectHotspot(), nextScene(), KeyR reset, implicit load/project/save behavior

render-stage:
  StageKit renderer, scene, camera, shaders, render target, post-process pass, layer/prop/hotspot meshes, animation loop

debug-projection:
  renderUi() JSON output, no stable host snapshot yet

ledger-readback:
  repo-local `.agent` pointers and central ledger pointers, currently docs-only
```

## Service map

```txt
AspectFrame service:
  preserves fixed 16:9 composition under arbitrary browser sizes

StageKit service:
  consumes stage descriptors into Three.js meshes and hotspot volumes, then handles pointer hover, raycast click, resize, render target, post process, and animation

StoryData service:
  owns the current three-scene source data and all hotspot clue/completion descriptors

Browser runtime service:
  translates user events into direct mutation and browser side effects

Planned StoryAuthority service:
  source manifest, snapshots, command envelope, reason catalog, preflight, command result, event rows, projections, save/interlude/stage intents, adapter plan, and readback rows
```

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
repo-local-agent-ledger-kit
```

## Planned kits

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
repo-local-ledger-readback-kit
central-ledger-readback-kit
dom-free-story-fixture-kit
```

## Architecture finding

The next cut should introduce a pure story adapter boundary in front of `src/game.js`. It should not move camera, shader, stage geometry, or story copy first.

## Target DSK path

```txt
StorySourceManifest
  -> StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryProjection
  -> BrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> RepoLocalLedgerReadback
  -> CentralLedgerReadback
  -> DOM-free fixture rows
```
