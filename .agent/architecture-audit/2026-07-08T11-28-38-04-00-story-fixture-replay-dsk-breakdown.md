# Story Fixture Replay DSK Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T11-28-38-04-00`

## Selection summary

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

No checked non-Cavalry repo was new, central-ledger absent, root-agent missing, or recently added but undocumented.

`TheUnmappedHouse` was selected as an oldest observed eligible fallback follow-up.

## Current architecture

```txt
index.html
  -> src/game.js
     -> mutable story state
     -> localStorage save/load
     -> StageKit callback bridge
     -> hotspot inspection branch
     -> scene completion check
     -> interlude transition
     -> UI/debug projection
  -> src/stage-kit.js
     -> Three.js renderer host
     -> fixed camera scene
     -> post-process pass
     -> hotspot picking
  -> src/story-data.js
     -> scene descriptors
     -> hotspots
     -> clue grants
     -> completion requirements
```

## Target DSK split

```txt
unmapped-house-domain
├─ story-source-domain
│  ├─ story-source-snapshot-kit
│  ├─ scene-grant-index-kit
│  ├─ scene-completion-index-kit
│  ├─ scene-descriptor-validation-kit
│  └─ stage-scene-snapshot-kit
├─ story-state-domain
│  ├─ story-state-snapshot-kit
│  ├─ initial-story-state-kit
│  ├─ loaded-story-state-normalization-kit
│  ├─ clue-ledger-reducer-kit
│  ├─ route-journal-kit
│  └─ command-journal-kit
├─ story-command-domain
│  ├─ story-command-envelope-kit
│  ├─ story-command-validation-kit
│  ├─ story-command-reason-kit
│  ├─ story-command-result-kit
│  ├─ story-event-record-kit
│  ├─ inspection-result-kit
│  ├─ scene-completion-result-kit
│  ├─ scene-transition-result-kit
│  ├─ prototype-complete-result-kit
│  └─ save-result-kit
├─ renderer-consumer-domain
│  ├─ fixed-camera-diorama-kit
│  ├─ stage-hotspot-volume-kit
│  ├─ hotspot-raycast-kit
│  ├─ hover-label-kit
│  ├─ notebook-debug-projection-kit
│  └─ interlude-overlay-consumer-kit
├─ diagnostics-domain
│  ├─ gamehost-diagnostics-kit
│  ├─ story-result-projection-kit
│  ├─ stage-summary-projection-kit
│  └─ fixture-summary-projection-kit
└─ fixture-domain
   ├─ dom-free-fixture-kit
   ├─ hotspot-fixture-matrix-kit
   ├─ scene-completion-fixture-kit
   ├─ save-load-fixture-kit
   └─ descriptor-rejection-fixture-kit
```

## Interaction loop

Current loop:

```txt
StageKit click or side-panel button
  -> inspectHotspot(hotspot)
  -> direct mutation
  -> direct clue grant
  -> direct completion check
  -> direct UI projection
  -> direct localStorage save
```

Target loop:

```txt
StageKit click or side-panel button
  -> create StoryCommandEnvelope
  -> applyStoryCommand(envelope, context)
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> command journal
  -> UI projection
  -> save projection
  -> GameHost diagnostics
  -> fixture replay parity
```

## Domains in use

```txt
static page shell
browser app runtime
story source
story state
story save/load
story command authority
story command validation
story command reason authority
story command result authority
story event records
inspection action
scene completion
scene transition
prototype complete terminal state
route state
notebook/debug projection
runtime diagnostics
fixture replay
stage descriptor validation
stage scene snapshot
fixed aspect frame
fixed camera renderer
Three.js render host
stage layer descriptors
stage prop descriptors
stage hotspot volumes
hotspot picking
hover label projection
anime material shader
WebGL post process
static Pages deploy
repo-local .agent state
central ledger readback
```

## Services offered by kits

Implemented services:

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
computeAspectFrame
applyAspectFrame
StageKit renderer setup
StageKit scene loading
StageKit hotspot picking
StageKit render loop
```

Needed services:

```txt
createStorySourceSnapshot
createSceneGrantIndex
createSceneCompletionIndex
validateStorySourceSnapshot
createInitialStoryState
normalizeLoadedStoryState
createStoryStateSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
applyStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applySaveStateCommand
applyLoadSaveCommand
applyResetSaveCommand
createStoryCommandResult
createStoryEventRecord
appendCommandJournalEntry
appendRouteJournalEntry
projectUiState
projectNotebookDebug
projectGameHostDiagnostics
runStoryFixtureSequence
summarizeStoryFixtureResults
```

## All kits

Implemented or implied:

```txt
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
unmapped-house-agent-state-kit
unmapped-house-central-ledger-readback-kit
```

Next-cut:

```txt
unmapped-house-story-source-snapshot-kit
unmapped-house-story-state-snapshot-kit
unmapped-house-stage-scene-snapshot-kit
unmapped-house-story-command-envelope-kit
unmapped-house-command-validation-kit
unmapped-house-story-command-result-kit
unmapped-house-story-command-reason-kit
unmapped-house-story-event-record-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-prototype-complete-result-kit
unmapped-house-save-result-kit
unmapped-house-route-state-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-save-load-fixture-kit
unmapped-house-stage-descriptor-validation-kit
unmapped-house-fixture-summary-projection-kit
```

## Implementation stop line

Stop after pure story authority, fixture replay, and additive GameHost diagnostics prove parity.

Do not extract StageKit internals, add story rooms, add inventory, add audio, change the save key, or change visuals in the same pass.
