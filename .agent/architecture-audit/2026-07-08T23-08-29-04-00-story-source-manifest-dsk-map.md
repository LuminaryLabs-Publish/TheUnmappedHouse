# Architecture Audit: Story Source Manifest DSK Map

**Timestamp:** `2026-07-08T23-08-29-04-00`

## Purpose

Define the next DSK boundary for `TheUnmappedHouse` without changing runtime source.

The next implementation should make source, command, result, projection, adapter, and fixture records explicit before story expansion or renderer work.

## Current architecture

```txt
index.html
  -> src/game.js
     -> imports StageKit
     -> imports story data
     -> owns DOM nodes
     -> owns SAVE_KEY
     -> owns loaded state
     -> owns currentScene
     -> owns story mutations
     -> owns UI projection
     -> owns interlude timing
     -> owns localStorage writes
     -> owns reset/reload
     -> owns debug JSON
  -> src/stage-kit.js
     -> owns Three.js renderer and scene consumption
  -> src/story-data.js
     -> owns scenes and hotspot descriptors
```

## Required architectural cut

```txt
src/story-authority/story-source-manifest.js
  -> stable product/source id
  -> route id
  -> scene count
  -> hotspot count
  -> required clue count
  -> SAVE_KEY
  -> public entry route

src/story-authority/story-source-snapshot.js
  -> normalized scene descriptors
  -> grantable clue index
  -> completion requirement index
  -> stage descriptor summary

src/story-authority/story-command-envelope.js
  -> source
  -> command id
  -> command type
  -> scene id
  -> hotspot id
  -> payload

src/story-authority/story-preflight.js
  -> source validation
  -> state validation
  -> command validation
  -> scene validation
  -> hotspot validation

src/story-authority/story-command-result.js
  -> accepted / rejected / no_mutation / terminal
  -> reason code
  -> stateBefore/stateAfter summaries
  -> event records
  -> projections requested

src/story-authority/story-reducer.js
  -> inspect hotspot
  -> repeat hotspot
  -> continue scene
  -> prototype complete
  -> save
  -> load
  -> reset

src/story-authority/story-projection.js
  -> title
  -> body text
  -> hotspot button states
  -> notebook log
  -> completion flag

src/story-authority/save-projection.js
  -> write-save intent
  -> clear-save intent
  -> serialized payload
  -> reason

src/story-authority/interlude-projection.js
  -> open/close intent
  -> title/text
  -> delay reason

src/story-authority/stage-projection.js
  -> scene load intent
  -> descriptor id
  -> reason

src/story-authority/story-browser-adapter-plan.js
  -> DOM text update plan
  -> hotspot list update plan
  -> localStorage update plan
  -> interlude update plan
  -> StageKit update plan
  -> diagnostics update plan

src/story-authority/gamehost-story-diagnostics.js
  -> additive read-only GameHost state
```

## Domain map

```txt
static-page-shell                     implemented
static-pages-deploy                   implemented
browser-app-runtime                   implemented-monolith
story-source                          implemented
story-source-manifest                 missing-next
story-source-snapshot                 missing-next
story-source-preflight                missing-next
story-state                           implemented-inline
story-state-snapshot                  missing-next
localstorage-save                     implemented-inline
notebook-log                          implemented-inline
route-state                           implemented-inline
interlude-overlay                     implemented-inline
scene-descriptor                      implemented
stage-layer-descriptor                implemented
stage-prop-descriptor                 implemented
stage-hotspot-volume                  implemented
stage-render-host                     implemented
fixed-aspect-frame                    implemented
fixed-camera-composition              implemented
hotspot-raycast-picking               implemented
hover-label-projection                implemented
anime-material-shader                 implemented
webgl-post-process                    implemented
story-command-envelope                missing-next
story-command-validation              missing-next
story-command-reason-authority        missing-next
story-command-result-authority        missing-next
story-event-records                   missing-next
story-result-reducer                  missing-next
story-projection                      missing-next
save-projection                       missing-next
interlude-projection                  missing-next
stage-projection                      missing-next
story-browser-adapter-plan            missing-next
GameHost-story-diagnostics            missing-next
fixture-replay                        missing-next
fixture-result-summary                missing-next
```

## Services

```txt
implemented:
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
  computeAspectFrame
  applyAspectFrame
  StageKit.animeMaterial
  StageKit.loadScene
  StageKit.createLayer
  StageKit.createProp
  StageKit.createHotspot
  StageKit.handlePointer
  StageKit.pick
  StageKit.clickHotspot
  StageKit.resize
  StageKit.animate

needed next:
  createStorySourceManifest
  createStorySourceSnapshot
  validateStorySourceSnapshot
  createGrantableClueIndex
  createSceneCompletionIndex
  createInitialStoryState
  normalizeLoadedStoryState
  createStoryStateSnapshot
  createStageSceneSnapshot
  createStoryCommandEnvelope
  validateStoryCommand
  createStoryPreflight
  createStoryCommandReason
  createStoryCommandResult
  createStoryEventRecord
  applyStoryCommand
  applyInspectionCommand
  applyContinueSceneCommand
  applySaveCommand
  applyLoadCommand
  applyResetCommand
  projectStoryUiState
  projectSaveIntent
  projectInterludeIntent
  projectStageIntent
  createStoryBrowserAdapterPlan
  projectGameHostStoryDiagnostics
  runStoryFixtureSequence
```

## Kit map

```txt
implemented or implied:
  unmapped-house-static-shell-kit
  unmapped-house-static-pages-deploy-kit
  unmapped-house-browser-runtime-kit
  unmapped-house-story-data-kit
  unmapped-house-story-runtime-kit
  unmapped-house-story-state-save-kit
  unmapped-house-localstorage-save-kit
  unmapped-house-clue-ledger-kit
  unmapped-house-scene-completion-kit
  unmapped-house-interlude-overlay-kit
  unmapped-house-route-state-kit
  unmapped-house-notebook-debug-kit
  unmapped-house-aspect-frame-kit
  unmapped-house-stage-kit
  unmapped-house-fixed-camera-diorama-kit
  unmapped-house-stage-layer-kit
  unmapped-house-stage-prop-kit
  unmapped-house-stage-hotspot-volume-kit
  unmapped-house-hotspot-raycast-kit
  unmapped-house-hover-label-kit
  unmapped-house-anime-material-shader-kit
  unmapped-house-stage-postprocess-kit
  unmapped-house-static-validation-kit

next-cut:
  unmapped-house-story-source-manifest-kit
  unmapped-house-story-source-snapshot-kit
  unmapped-house-story-source-preflight-kit
  unmapped-house-story-state-snapshot-kit
  unmapped-house-stage-scene-snapshot-kit
  unmapped-house-story-command-envelope-kit
  unmapped-house-command-validation-kit
  unmapped-house-story-command-result-kit
  unmapped-house-story-command-reason-kit
  unmapped-house-story-reducer-kit
  unmapped-house-story-event-record-kit
  unmapped-house-save-projection-kit
  unmapped-house-interlude-projection-kit
  unmapped-house-stage-projection-kit
  unmapped-house-browser-adapter-plan-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-dom-free-fixture-kit
```

## Acceptance target

The browser host should consume `StoryBrowserAdapterPlan` records and stop owning story rules.

`StageKit` should continue to render the same visible scenes.
