# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-08T11-28-38-04-00`

## Summary

`TheUnmappedHouse` is a compact fixed-camera anime point-and-click horror prototype.

This pass re-compared the accessible `LuminaryLabs-Publish` organization list against central `LuminaryLabs-Dev/LuminaryLabs` ledger state. No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as an oldest observed eligible fallback follow-up because its latest source wire map is still not implementation-ready enough for the next coder to stop guessing fixture contracts. This pass narrows the next ledge to a fixture replay contract plus GameHost projection gate.

## Full repo-list comparison result

Current `LuminaryLabs-Publish` repos observed:

```txt
AetherVale            tracked; root .agent state observed
HorrorCorridor        tracked; root .agent state observed
IntoTheMeadow         tracked; root .agent state observed
MyCozyIsland          tracked; root .agent state observed
PhantomCommand        tracked; root .agent state observed
PrehistoricRush       tracked; root .agent state observed
TheCavalryOfRome      excluded by standing rule
TheOpenAbove          tracked; root .agent state observed
TheUnmappedHouse      selected fallback: story fixture replay contract
ZombieOrchard         tracked; root .agent state observed
```

Selection reason:

```txt
No checked non-Cavalry Publish repo was new, central-ledger absent, missing root .agent state, or recently added but undocumented.

TheUnmappedHouse remains an eligible documented repo with an unresolved story-authority implementation ledge. The prior source wire map named helper files; this pass adds the exact replay rows, projection outputs, stop line, and acceptance contract.
```

## Source-backed product surface

```txt
README.md
  -> fixed-camera anime point-and-click horror prototype
  -> Stage Kit covers locked-camera scenes, hotspot inspection, story state, procedural props, anime shader materials, and post-processing

package.json
  -> browser-only static module project
  -> npm run check validates src/aspect-frame.js, src/game.js, src/stage-kit.js, and src/story-data.js with node --check

index.html
  -> static page shell
  -> loads ./src/game.js
  -> declares stage root, story panel, hotspot list, notebook debug panel, hover label, and interlude overlay

src/game.js
  -> owns DOM lookup, state load/save, clue grants, hotspot inspection, scene completion, interlude progression, UI projection, notebook debug projection, KeyR reset
  -> keeps SAVE_KEY as the current persisted save identity
  -> stores state and currentScene as module-level mutable values
  -> direct-mutation seam remains the next blocker

src/stage-kit.js
  -> imports Three.js from CDN
  -> owns renderer, scene, camera, raycaster, lights, render target, post pass, resize, animation, hotspot volume creation, hover label, and click picking
  -> should stay visually stable during the story-authority extraction

src/story-data.js
  -> owns three scene descriptors
  -> defines camera, stage layers, props, post settings, hotspots, clue grants, completion requirements, and interlude text
```

## Interaction loop

Current player loop:

```txt
open static route
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> show story text and hotspot buttons
  -> hover/click hotspot in renderer or click side-panel button
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log
  -> check scene completion
  -> if complete, show interlude
  -> continue to next scene
  -> persist route, clues, inspected map, and log to localStorage
  -> KeyR clears save and reloads
```

Current source loop:

```txt
StageKit click or side-panel button
  -> inspectHotspot(hotspot)
  -> direct inspected-state mutation
  -> direct clue mutation through grantClues
  -> direct text/log mutation
  -> direct sceneComplete check
  -> setTimeout(showInterlude, 450) when complete
  -> renderUi()
  -> saveState()
```

Target authority loop:

```txt
UI event
  -> StoryCommandEnvelope
  -> StorySourceSnapshot + StoryStateSnapshot + StageSceneSnapshot
  -> validateStoryCommand
  -> applyStoryCommand
  -> StoryCommandResult
  -> InspectionResult / SceneCompletionResult / SceneTransitionResult / SaveResult
  -> StoryEventRecord[]
  -> command journal + route journal
  -> save adapter
  -> UI projection
  -> GameHost diagnostics
  -> DOM-free fixture replay
```

## Current domains

```txt
static-page-shell
static-pages-deploy
browser-app-runtime
fixed-camera-story-runtime
story-source
story-source-snapshot
story-state
story-state-snapshot
story-save-load
story-command-authority
story-command-validation
story-command-result-authority
story-command-reason-authority
story-command-journal
story-event-records
inspection-action
inspection-result
scene-completion
scene-transition
prototype-complete-result
route-state
route-journal
save-state
reset-state
notebook-debug-projection
runtime-diagnostics
GameHost-diagnostics
fixture-replay
fixture-result-summary
stage-descriptor-validation
stage-scene-snapshot
scene-descriptor-source
fixed-aspect-frame
fixed-camera-stage-renderer
Three.js-render-host
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
anime-material-shader
WebGL-post-processing
repo-local-agent-state
central-ledger-readback
```

## Current service inventory

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
KeyR reset
computeAspectFrame
applyAspectFrame
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
static Pages deploy
```

Needed services for the next implementation slice:

```txt
createStorySourceSnapshot
createSceneGrantIndex
createSceneCompletionIndex
validateStorySourceSnapshot
createStoryStateSnapshot
createInitialStoryState
normalizeLoadedStoryState
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
createInspectionResult
createSceneCompletionResult
createSceneTransitionResult
createPrototypeCompleteResult
createSaveResult
createStoryEventRecord
appendRouteJournalEntry
appendCommandJournalEntry
projectUiState
projectNotebookDebug
projectGameHostDiagnostics
runStoryFixtureSequence
summarizeStoryFixtureResults
```

## Current kit inventory

Implemented or implied kits:

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

Needed next-cut kits:

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
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-save-load-fixture-kit
unmapped-house-stage-descriptor-validation-kit
unmapped-house-fixture-summary-projection-kit
```

## Architectural diagnosis

The project does not need more story content yet.

The active risk is that a future implementation could move code around without proving parity.

Current risk:

```txt
DOM event -> direct mutation -> direct localStorage write -> direct UI projection
```

Preferred next shape:

```txt
DOM event
  -> command envelope
  -> pure reducer / authority service
  -> result record
  -> journal entry
  -> save adapter
  -> UI projection
  -> GameHost projection
  -> DOM-free fixture row
```

## Source-backed blockers

```txt
src/game.js keeps story state as a module-level mutable object.
src/game.js repeat hotspot inspection updates text/log/UI/save but returns no repeated-inspection result.
src/game.js grants clues directly by mutating state.clues.
src/game.js completion is checked inline through sceneComplete(currentScene).
src/game.js interlude transition is scheduled through setTimeout and DOM class mutation.
src/game.js nextScene mutates currentScene, state.sceneId, state.route, interlude DOM, StageKit, UI, and save state in one handler.
src/game.js KeyR reset deletes localStorage and reloads instead of producing a reset result.
src/stage-kit.js owns pointer click dispatch and renderer state together, so story authority must be extracted without destabilizing picking.
src/story-data.js has required clue lists, but no descriptor validation proves every required clue is grantable or every hotspot id is unique.
```

## Recommended next implementation objective

```txt
TheUnmappedHouse Story Fixture Replay Contract + GameHost Projection Gate
```

Do this before expanding the story, replacing the renderer, adding audio, adding inventory, or broadening the StageKit object vocabulary.
