# Architecture Audit: Story Preflight DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T18-51-55-04-00`

## Intent

Define the next DSK/domain cut so the story system can validate source, execute commands, emit results, and project host/UI/save/stage state without the DOM host owning story rules.

## Current architecture

```txt
index.html
  -> src/game.js
     -> imports gameTitle/scenes from src/story-data.js
     -> creates mutable module state from localStorage
     -> creates StageKit with onHotspot: inspectHotspot
     -> mutates state/currentScene in inspectHotspot and nextScene
     -> updates text, hotspot buttons, interlude, debug JSON, localStorage
  -> src/stage-kit.js
     -> imports Three.js CDN and aspect-frame helpers
     -> creates renderer, scene, camera, target, post pass, layers, props, hotspots
     -> dispatches clicked hotspot object back to src/game.js
```

## Current interaction loop

```txt
open static page
  -> load or shallow-merge save state
  -> find current scene or fallback to scenes[0]
  -> StageKit loads scene descriptor
  -> player clicks side-panel button or StageKit hotspot volume
  -> inspectHotspot directly mutates inspected/clues/log/text
  -> sceneComplete checks required clues directly
  -> setTimeout schedules interlude if complete
  -> renderUi recreates buttons and debug JSON
  -> saveState writes localStorage
  -> continue button directly mutates scene/route/interlude/stage/UI/save
```

## Target DSK map

```txt
unmapped-house-story-authority-domain
├─ source-domain
│  ├─ story-source-snapshot-kit
│  ├─ story-source-preflight-kit
│  ├─ grantable-clue-index-kit
│  └─ scene-completion-index-kit
├─ command-domain
│  ├─ story-command-envelope-kit
│  ├─ story-command-validation-kit
│  ├─ story-command-reason-kit
│  └─ story-command-result-kit
├─ reducer-domain
│  ├─ story-state-snapshot-kit
│  ├─ inspection-reducer-kit
│  ├─ continue-scene-reducer-kit
│  ├─ save-reset-reducer-kit
│  └─ story-event-record-kit
├─ projection-domain
│  ├─ story-ui-projection-kit
│  ├─ save-projection-kit
│  ├─ interlude-projection-kit
│  ├─ stage-projection-kit
│  └─ gamehost-story-diagnostics-kit
└─ fixture-domain
   ├─ story-fixture-cases-kit
   ├─ source-preflight-fixture-kit
   ├─ command-result-fixture-kit
   └─ fixture-summary-projection-kit
```

## Domains in use

```txt
static-page-shell:
  implemented by index.html; provides the DOM mount surface, story panel, hotspot list, notebook/debug pane, hover label, and interlude shell.

browser-app-runtime:
  implemented by src/game.js; currently owns boot order, local state, currentScene, UI mutation, save mutation, and event handlers.

story-source:
  implemented by src/story-data.js; provides gameTitle, scenes, ordered route, stage descriptors, hotspots, grants, completion requirements, and interlude copy.

stage-render-host:
  implemented by src/stage-kit.js; provides renderer, camera, scene graph, post pass, animation, hotspots, pointer/raycast picking, and visible scene load.

fixed-aspect-frame:
  implemented by src/aspect-frame.js; provides 1920x1080 canonical frame and 16:9 letterbox/pillarbox behavior.

story-source-preflight:
  missing next; should validate duplicate scene IDs, duplicate hotspot IDs, ungrantable required clues, required camera data, stage descriptor presence, and hotspot volume metadata.

story-command-authority:
  missing next; should normalize inspect, continue, save, load, reset, project, preflight, and snapshot-stage command envelopes.

story-result-reducer:
  missing next; should return accepted/rejected/no_mutation/terminal results with stable reasons, event records, deltas, and projection hints.

host-projection-adapter:
  missing next; should keep src/game.js as host but make it consume StoryProjection, SaveProjection, InterludeProjection, StageProjection, and GameHost diagnostics.
```

## Services offered by kits

```txt
implemented services:
  createInitialState
  loadState
  saveState
  hasClue
  grantClues
  writeLog
  sceneComplete
  inspectHotspot
  showInterlude
  nextScene
  renderUi
  computeAspectFrame
  applyAspectFrame
  StageKit.loadScene
  StageKit.createLayer
  StageKit.createProp
  StageKit.createHotspot
  StageKit.pick
  StageKit.clickHotspot
  StageKit.resize
  StageKit.animate

next-cut services:
  createStorySourceSnapshot
  validateStorySourceSnapshot
  createStoryPreflight
  createGrantableClueIndex
  createSceneCompletionIndex
  createStoryStateSnapshot
  createStageSceneSnapshot
  createStoryCommandEnvelope
  validateStoryCommand
  applyStoryCommand
  createStoryCommandResult
  createStoryEventRecord
  projectStoryUiState
  projectSaveIntent
  projectInterludeIntent
  projectStageIntent
  projectGameHostStoryDiagnostics
  runStoryFixtureSequence
```

## Kits

```txt
implemented or implied:
  unmapped-house-static-shell-kit
  unmapped-house-browser-runtime-kit
  unmapped-house-story-data-kit
  unmapped-house-story-state-save-kit
  unmapped-house-clue-ledger-kit
  unmapped-house-scene-completion-kit
  unmapped-house-interlude-overlay-kit
  unmapped-house-aspect-frame-kit
  unmapped-house-stage-kit
  unmapped-house-stage-hotspot-volume-kit
  unmapped-house-hotspot-raycast-kit
  unmapped-house-anime-material-shader-kit
  unmapped-house-stage-postprocess-kit

next-cut:
  unmapped-house-story-source-snapshot-kit
  unmapped-house-story-source-preflight-kit
  unmapped-house-story-command-envelope-kit
  unmapped-house-story-command-result-kit
  unmapped-house-story-reducer-kit
  unmapped-house-stage-scene-snapshot-kit
  unmapped-house-stage-projection-kit
  unmapped-house-dom-free-fixture-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Story Preflight Result Fixture Contract + Stage Projection Readback Gate
```
