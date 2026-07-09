# TheUnmappedHouse Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

**Run type:** documentation-only repo breakdown

## Selection result

`TheUnmappedHouse` was selected.

The full accessible `LuminaryLabs-Publish` repo list was read and compared against the central repo ledger in `LuminaryLabs-Dev/LuminaryLabs` plus sampled repo-local `.agent` state.

No checked non-Cavalry repo was fully new, absent from the central ledger, missing a root `.agent/` folder, recently added but undocumented, or otherwise undocumented.

`TheUnmappedHouse` was the oldest eligible current central-ledger fallback in the sampled non-excluded set.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest 2026-07-09T00-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest 2026-07-09T01-09-24-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / oldest eligible central latest 2026-07-08T23-19-33-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest 2026-07-09T00-20-08-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest 2026-07-09T00-40-20-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central latest 2026-07-09T01-20-59-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest 2026-07-09T00-09-22-04-00
```

## Product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The current public route remains:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` is currently syntax-only across:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Current interaction loop

```txt
open index.html
  -> src/game.js imports StageKit plus story data
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene is resolved from scenes or falls back to scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit loads current scene descriptors
  -> hotspot side-panel button or raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot directly mutates inspected state, clue state, text, log, completion, interlude timer, UI, and save
  -> continue button calls nextScene()
  -> nextScene directly mutates currentScene, sceneId, route, interlude DOM, StageKit scene, UI, and save
  -> KeyR clears localStorage and reloads
  -> debug panel emits ad hoc JSON
```

## Target authority / adapter loop

```txt
UI event or StageKit callback
  -> StorySourceManifest
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryEventRecord[]
  -> StoryProjection
  -> SaveProjection
  -> InterludeProjection
  -> StageProjection
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
  -> GameHostStoryDiagnostics
  -> DOM-free fixture rows
  -> central ledger readback
```

## Domains in use

```txt
implemented:
  static-page-shell
  static-pages-deploy
  browser-app-runtime
  story-source
  story-state
  localstorage-save
  notebook-log
  route-state
  interlude-overlay
  stage-render-host
  fixed-aspect-frame
  fixed-camera-composition
  scene-descriptor
  stage-layer-descriptor
  stage-prop-descriptor
  stage-hotspot-volume
  hotspot-raycast-picking
  hover-label-projection
  anime-material-shader
  webgl-post-process
  debug-json-projection
  package-syntax-validation
  repo-local-agent-memory
  central-ledger-tracking

missing-next:
  story-source-manifest
  story-source-snapshot
  story-source-preflight
  story-state-snapshot
  stage-scene-snapshot
  story-command-envelope
  story-command-validation
  story-command-reason-authority
  story-command-result-authority
  story-event-records
  story-result-reducer
  inspection-result-contract
  clue-ledger-result
  scene-completion-result
  scene-transition-result
  prototype-complete-result
  save-projection
  interlude-projection
  stage-projection
  story-browser-adapter-plan
  browser-adapter-readback
  story-host-adapter
  GameHost-story-diagnostics
  fixture-replay
  fixture-result-summary
  central-ledger-readback-row
```

## Services offered by current kits

```txt
src/game.js / story runtime:
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

src/stage-kit.js / render host:
  Three.js WebGLRenderer construction
  fixed 16:9 frame integration
  render target construction
  shader material creation
  post-process pass
  scene load
  layer mesh creation
  prop mesh creation
  hotspot volume creation
  pointer normalization
  raycast pick
  hotspot click dispatch
  hover label projection
  resize
  animation loop

src/story-data.js / story descriptors:
  gameTitle
  ordered scenes
  scene camera descriptors
  stage layers
  stage props
  post settings
  hotspot ids
  hotspot text
  hotspot grants
  completion requirements
  interlude copy

package/deploy:
  syntax check
  static server command
  GitHub Pages deploy workflow state
```

## Services needed next

```txt
createStorySourceManifest
createStorySourceSnapshot
validateStorySourceSnapshot
createGrantableClueIndex
createSceneCompletionIndex
createStoryPreflight
createInitialStoryState
normalizeLoadedStoryState
createStoryStateSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
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
readBackBrowserAdapterPlan
projectGameHostStoryDiagnostics
runStoryFixtureSequence
summarizeStoryFixtureResults
createCentralLedgerReadbackRow
```

## Kits

```txt
implemented or source-backed:
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
  unmapped-house-inspection-action-kit
  unmapped-house-inspection-result-contract-kit
  unmapped-house-clue-ledger-reducer-kit
  unmapped-house-scene-completion-result-kit
  unmapped-house-scene-transition-result-kit
  unmapped-house-prototype-complete-result-kit
  unmapped-house-save-result-kit
  unmapped-house-save-projection-kit
  unmapped-house-interlude-projection-kit
  unmapped-house-stage-projection-kit
  unmapped-house-browser-adapter-plan-kit
  unmapped-house-browser-adapter-readback-kit
  unmapped-house-route-state-journal-kit
  unmapped-house-command-journal-kit
  unmapped-house-story-ui-projection-kit
  unmapped-house-gamehost-diagnostics-kit
  unmapped-house-dom-free-fixture-kit
  unmapped-house-hotspot-fixture-matrix-kit
  unmapped-house-scene-completion-fixture-kit
  unmapped-house-save-load-fixture-kit
  unmapped-house-stage-descriptor-validation-kit
  unmapped-house-fixture-summary-projection-kit
  unmapped-house-central-ledger-readback-row-kit
```

## Main finding

The render surface should not be rewritten first.

`StageKit` already provides the useful fixed 16:9 frame, shader material, post-process path, hotspot picking, scene descriptor loading, hover label, resize, and animation loop.

The issue is that `src/game.js` is still the owner of story source fallback, inspection command handling, clue mutation, scene completion, interlude scheduling, next-scene routing, save/reset, UI projection, debug projection, and adapter behavior.

The next implementation should make `src/game.js` a consumer of story authority records, not the owner of story rules.

## New next safe ledge

```txt
TheUnmappedHouse Story Adapter Readback Fixture + Central Ledger Freshness Gate
```

## Source files to add next

```txt
src/story-authority/story-source-manifest.js
src/story-authority/story-source-snapshot.js
src/story-authority/story-state-snapshot.js
src/story-authority/stage-scene-snapshot.js
src/story-authority/story-command-envelope.js
src/story-authority/story-command-reasons.js
src/story-authority/story-command-result.js
src/story-authority/story-event-record.js
src/story-authority/story-preflight.js
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

## Required fixture rows

```txt
source_manifest_created
source_snapshot_created
initial_state
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
load_state
reset_save
stage_scene_snapshot
story_projection
save_projection
interlude_projection
stage_projection
browser_adapter_plan
browser_adapter_readback
GameHost_projection
central_ledger_readback
```

## Validation performed

```txt
GitHub repo-list comparison: yes
central ledger comparison: yes
repo-local .agent readback: yes
package.json readback: yes
src/game.js readback: yes
src/stage-kit.js readback: yes
src/story-data.js readback: yes
runtime source changed: no
branch created: no
pull request created: no
local npm run check: no
browser smoke: no
fixture run: no, fixture files do not exist yet
pushed to main: yes
```
