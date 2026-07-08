# Current Audit

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Audit timestamp:** `2026-07-08T10-01-57-04-00`

## Summary

`TheUnmappedHouse` is a compact fixed-camera anime point-and-click horror prototype with a clear inspection, clue, room-completion, and interlude loop.

This pass re-compared the accessible `LuminaryLabs-Publish` organization list against central `LuminaryLabs-Dev/LuminaryLabs` ledger state. No checked non-Cavalry repo was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as an oldest observed eligible fallback follow-up because its remaining source-backed blocker is still story command authority. The stale central status-summary rollup gap is already closed and is not used as the current selection reason.

This pass adds a source wire map that names exact additive files and fixture rows for the next implementation.

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
TheUnmappedHouse      selected fallback: story authority source wire map
ZombieOrchard         tracked; root .agent state observed
```

Selection reason:

```txt
No checked non-Cavalry Publish repo was new, central-ledger absent, missing root .agent state, or recently added but undocumented.

TheUnmappedHouse remains an eligible documented repo with the oldest observed unresolved story-authority implementation ledge in this pass. It was selected to convert the prior acceptance ledger into a file-level source wire map and fixture replay contract.
```

## Source-backed product surface

```txt
README.md
  -> fixed-camera anime point-and-click horror prototype
  -> Stage Kit scope covers locked-camera scenes, text-first hotspot inspection, story state, procedural props, anime shader materials, and WebGL post-processing

package.json
  -> browser-only static module project
  -> npm run check validates src/aspect-frame.js, src/game.js, src/stage-kit.js, and src/story-data.js with node --check

index.html
  -> static page shell
  -> loads ./src/game.js
  -> declares stage root, story panel, hotspot list, notebook debug panel, hover label, and interlude overlay

src/aspect-frame.js
  -> owns fixed 1920 x 1080 / 16:9 frame math
  -> applies letterbox/pillarbox dimensions to the aspect frame element

src/game.js
  -> owns state load/save
  -> owns clue grants
  -> owns hotspot inspection behavior
  -> owns scene completion and interlude progression
  -> projects UI and notebook debug state
  -> KeyR clears localStorage and reloads

src/stage-kit.js
  -> owns Three.js renderer setup
  -> owns camera, raycaster, lights, render target, post pass
  -> creates layers, props, and hotspot volumes
  -> handles pointer hover/click and animation

src/story-data.js
  -> owns three scene descriptors
  -> defines camera, stage layers, props, post settings, hotspots, clue grants, completion requirements, and interlude text

.github/workflows/deploy.yml
  -> deploys the static site to GitHub Pages from main
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
  -> command journal + route journal
  -> save adapter
  -> UI projection
  -> GameHost diagnostics
  -> DOM-free fixture replay
```

## Current domains

```txt
static page shell
static Pages deploy
browser app runtime
fixed-camera story runtime
scene descriptor source
story state save/load
story clue ledger
hotspot inspection
inspection command authority
inspection result authority
scene completion
interlude transition
route state
save state
reset state
notebook/debug projection
runtime diagnostics
fixture replay
stage descriptor validation
stage scene snapshot
fixed aspect frame
fixed-camera stage renderer
Three.js render host
stage layer descriptors
stage prop descriptors
hotspot volume descriptors
pointer raycast picking
hover label projection
anime shader material
WebGL post-processing
responsive story panel styling
repo-local .agent operating state
central repo-ledger readback
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
applyResetSaveCommand
applyLoadSaveCommand
createStoryCommandResult
createInspectionResult
createSceneCompletionResult
createSceneTransitionResult
createSaveResult
appendRouteJournalEntry
appendCommandJournalEntry
projectUiState
projectNotebookDebug
projectGameHostDiagnostics
runStoryFixtureSequence
```

## Current kit inventory

Implemented or implied kits:

```txt
unmapped-house-static-shell-kit
unmapped-house-story-runtime-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-localstorage-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
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
unmapped-house-static-pages-deploy-kit
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
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-save-result-kit
unmapped-house-route-journal-kit
unmapped-house-command-journal-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-stage-descriptor-validation-kit
```

## Architectural diagnosis

The main issue is not that the project lacks a loop.

The issue is that the loop is not yet divided into reusable, testable authority units.

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
```

## Source-backed blockers

```txt
src/game.js keeps story state as a module-level mutable object.
src/game.js repeat hotspot inspection returns by mutating text/log/UI/save instead of returning a typed repeated-inspection result.
src/game.js grants clues directly by mutating state.clues.
src/game.js completion is checked inline through sceneComplete(currentScene).
src/game.js interlude transition is scheduled through setTimeout and DOM class mutation.
src/game.js nextScene mutates currentScene, state.sceneId, state.route, interlude DOM, StageKit, UI, and save state in one handler.
src/stage-kit.js owns pointer click dispatch and renderer state together, so story authority must be extracted without destabilizing picking.
src/story-data.js has required clue lists, but no descriptor validation proves every required clue is grantable or every hotspot id is unique.
```

## Recommended next implementation objective

```txt
TheUnmappedHouse Story Authority Source Wire Map
```

Do this before expanding the story, replacing the renderer, adding audio, adding inventory, or broadening the StageKit object vocabulary.
