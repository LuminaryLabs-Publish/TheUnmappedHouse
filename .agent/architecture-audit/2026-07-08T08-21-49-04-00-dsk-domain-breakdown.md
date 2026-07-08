# DSK Domain Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T08:21:49-04:00`

## Summary

`TheUnmappedHouse` is currently a small but clear DSK candidate.

The product already has usable domains, but several are only implicit inside `src/game.js` and `src/stage-kit.js`.

The next implementation should extract story authority first, not renderer shape.

## Current source ownership

```txt
index.html
  owns static shell and DOM regions

src/game.js
  owns boot, state, save/load, inspection, clue grants, completion, interlude, UI projection, reset

src/stage-kit.js
  owns renderer, fixed camera, post pass, scene loading, materials, props, hotspot meshes, pointer picking, hover label, animation

src/story-data.js
  owns scene descriptor source, story text, stage descriptors, hotspot descriptors, clue grants, completion requirements, interlude text
```

## Interaction loop

```txt
open page
  -> create/load StoryState
  -> select current SceneDescriptor
  -> StageKit.loadScene(scene)
  -> render story text and hotspot buttons
  -> pointer hover projects hotspot label
  -> click hotspot or button calls inspectHotspot(hotspot)
  -> state.inspected[currentScene.id][hotspot.id] = true
  -> grantClues(hotspot.grants)
  -> writeLog(...)
  -> sceneComplete(currentScene)
  -> showInterlude(currentScene) when complete
  -> continueButton calls nextScene()
  -> currentScene/state.sceneId/state.route mutate
  -> renderUi()
  -> saveState()
```

## Target DSK map

```txt
unmapped-house
├─ shell-domain
│  ├─ static-shell-kit
│  ├─ story-panel-kit
│  ├─ hotspot-list-kit
│  ├─ notebook-panel-kit
│  ├─ hover-label-shell-kit
│  └─ interlude-shell-kit
├─ story-source-domain
│  ├─ story-data-kit
│  ├─ scene-descriptor-kit
│  ├─ clue-source-kit
│  ├─ completion-requirement-kit
│  └─ interlude-copy-kit
├─ story-authority-domain
│  ├─ story-source-snapshot-kit
│  ├─ story-state-snapshot-kit
│  ├─ story-command-envelope-kit
│  ├─ story-command-validation-kit
│  ├─ story-command-result-kit
│  ├─ story-command-reason-kit
│  ├─ inspection-command-kit
│  ├─ completion-result-kit
│  └─ transition-result-kit
├─ state-save-domain
│  ├─ localstorage-adapter-kit
│  ├─ save-result-kit
│  ├─ reset-result-kit
│  ├─ route-journal-kit
│  └─ command-journal-kit
├─ stage-descriptor-domain
│  ├─ stage-scene-snapshot-kit
│  ├─ stage-camera-descriptor-kit
│  ├─ stage-layer-descriptor-kit
│  ├─ stage-prop-descriptor-kit
│  ├─ stage-hotspot-volume-kit
│  ├─ stage-post-descriptor-kit
│  └─ stage-descriptor-validation-kit
├─ render-domain
│  ├─ stage-render-host-kit
│  ├─ fixed-camera-diorama-kit
│  ├─ pointer-parallax-camera-kit
│  ├─ anime-material-shader-kit
│  ├─ webgl-postprocess-kit
│  └─ render-target-pass-kit
├─ interaction-domain
│  ├─ hotspot-raycast-kit
│  ├─ hover-label-projection-kit
│  ├─ click-dispatch-kit
│  └─ side-panel-action-kit
├─ diagnostics-domain
│  ├─ notebook-debug-projection-kit
│  ├─ gamehost-state-projection-kit
│  ├─ latest-result-projection-kit
│  └─ fixture-summary-projection-kit
└─ fixture-domain
   ├─ dom-free-fixture-kit
   ├─ hotspot-fixture-matrix-kit
   ├─ completion-fixture-kit
   ├─ transition-fixture-kit
   ├─ save-load-fixture-kit
   └─ descriptor-validation-fixture-kit
```

## Domains in use

| Domain | Status | Current source | Services |
| --- | --- | --- | --- |
| shell-domain | implemented | `index.html` | stage mount, panels, hotspot list, notebook, interlude |
| story-source-domain | implemented | `src/story-data.js` | scenes, titles, copy, hotspots, clues, completion |
| story-authority-domain | missing/extract next | `src/game.js` inline | command envelope, validation, result records, reasons |
| state-save-domain | implemented inline | `src/game.js` | localStorage load/save/reset, route mutation |
| stage-descriptor-domain | implemented unvalidated | `src/story-data.js` | camera, props, layers, post, hotspots |
| render-domain | implemented monolith | `src/stage-kit.js` | Three renderer, camera, materials, post pass |
| interaction-domain | implemented inline | `src/stage-kit.js`, `src/game.js` | raycast, hover, click dispatch, side buttons |
| diagnostics-domain | partial | `src/game.js` debug panel | JSON notebook projection |
| fixture-domain | missing | none | DOM-free replay and fixture validation |
| deploy-domain | implemented | `.github/workflows/deploy.yml` | static Pages deploy from main |

## Services the kits offer now

```txt
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
KeyR reset
StageKit constructor
StageKit animeMaterial
StageKit loadScene
StageKit createLayer
StageKit createProp
StageKit createHotspot
StageKit handlePointer
StageKit pick
StageKit clickHotspot
StageKit resize
StageKit animate
```

## Services the next kits need to offer

```txt
createStorySourceSnapshot
createStoryStateSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
applyStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applyResetSaveCommand
applyLoadSaveCommand
createInspectionResult
createSceneCompletionResult
createSceneTransitionResult
createSaveResult
appendRouteJournalEntry
appendCommandJournalEntry
projectGameHostDiagnostics
runStoryFixtureSequence
validateSceneDescriptor
```

## Implementation order

```txt
1. Add pure story-authority modules.
2. Add command/result/reason contracts.
3. Add fixture replay around source data and cloned state.
4. Wire current UI handlers to consume results.
5. Add GameHost diagnostics projection.
6. Defer StageKit renderer extraction until fixtures prove story parity.
```

## Do not do yet

```txt
new rooms
new route graph
renderer rewrite
inventory system
audio system
controller support
save slots
large art pass
```

Those are product expansions. The source authority seam comes first.