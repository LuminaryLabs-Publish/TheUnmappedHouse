# Project Breakdown: TheUnmappedHouse

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T10-01-57-04-00`

**Branch target:** `main`

## Selection result

The accessible `LuminaryLabs-Publish` organization repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled repo-local root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, or missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected as the oldest observed eligible fallback because its last repo-local alignment was older than the sampled active breakdown set and its next implementation is now concrete enough to move from acceptance-ledger planning into a source wire map.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos observed

```txt
LuminaryLabs-Publish/AetherVale          tracked; root .agent observed
LuminaryLabs-Publish/HorrorCorridor      tracked; root .agent observed
LuminaryLabs-Publish/IntoTheMeadow       tracked; root .agent observed
LuminaryLabs-Publish/MyCozyIsland        tracked; root .agent observed
LuminaryLabs-Publish/PhantomCommand      tracked; root .agent observed
LuminaryLabs-Publish/PrehistoricRush     tracked; root .agent observed
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked; root .agent observed
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback: story authority source wire map
LuminaryLabs-Publish/ZombieOrchard       tracked; root .agent observed
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The README describes a Stage Kit that owns locked-camera Three.js diorama scenes, text-first hotspot inspection, story state, procedural props, anime shader materials, and WebGL post-processing.

The current browser route is:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`package.json` keeps the project static and provides `npm run check`, which syntax-validates `src/aspect-frame.js`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.

## Interaction loop

Current player loop:

```txt
open static route
  -> load saved state or create initial state
  -> load current scene into StageKit
  -> read room text
  -> hover hotspot volumes or click side-panel hotspot buttons
  -> inspect hotspot
  -> mark hotspot inspected
  -> grant clue(s)
  -> write notebook log entry
  -> check room completion
  -> if complete, open interlude after 450 ms
  -> Continue moves to next scene
  -> save route, scene id, clues, inspected map, and log to localStorage
  -> KeyR clears save and reloads
```

Current source loop:

```txt
StageKit click or side-panel button
  -> inspectHotspot(hotspot)
  -> mutate state.inspected[currentScene.id]
  -> grantClues(hotspot.grants)
  -> mutate text/log
  -> sceneComplete(currentScene)
  -> setTimeout(showInterlude, 450) on completion
  -> renderUi()
  -> saveState()
```

Target source loop:

```txt
UI event
  -> StoryCommandEnvelope
  -> StorySourceSnapshot
  -> StoryStateSnapshot
  -> StageSceneSnapshot
  -> validateStoryCommand
  -> applyStoryCommand
  -> StoryCommandResult
  -> InspectionResult / SceneCompletionResult / SceneTransitionResult / SaveResult
  -> CommandJournalEntry
  -> RouteJournalEntry
  -> save adapter
  -> UI projection
  -> GameHost diagnostics
  -> DOM-free fixture replay
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
browser-app-runtime
fixed-camera-story-runtime
story-source
story-state
story-save-load
story-command-authority
inspection-action
inspection-result-authority
clue-ledger
scene-completion
interlude-transition
route-state
save-state
reset-state
notebook-debug-projection
runtime-diagnostics
fixture-replay
stage-descriptor-source
stage-descriptor-validation
stage-scene-snapshot
fixed-camera-stage-renderer
threejs-render-host
fixed-aspect-frame
fixed-camera-parallax
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-raycast-picking
hover-label-projection
anime-material-shader
webgl-postprocess
repo-local-agent-state
central-repo-ledger-readback
```

## Services offered by current kits

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
story scene descriptors
static Pages deploy
npm run check syntax validation
repo-local .agent operating memory
central repo-ledger tracking
```

## Kits identified

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

Next-cut kits:

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
unmapped-house-scene-descriptor-validation-kit
```

## Source-backed findings

```txt
README.md confirms the fixed-camera anime point-and-click horror prototype and StageKit scope.
package.json confirms the repo is static and has syntax-only validation through npm run check.
src/game.js owns mutable story state, localStorage persistence, inspection, clue grant, completion, interlude, route, reset, and UI/debug projection.
src/stage-kit.js owns Three.js renderer setup, camera, lights, render target, shader materials, postprocess pass, scene loading, hotspot meshes, pointer raycast, resize, and animation.
src/story-data.js owns three ordered scene descriptors, hotspot grants, completion requirements, and interlude copy.
src/aspect-frame.js owns a fixed 1920 x 1080 / 16:9 frame and letterbox/pillarbox layout math.
```

## New implementation map produced this pass

The new `.agent/interaction-audit/2026-07-08T10-01-57-04-00-story-authority-source-wire-map.md` narrows the next implementation from a broad acceptance ledger into exact additive source files and integration seams.

Primary target:

```txt
src/story-authority/
  story-source-snapshot.js
  story-state-snapshot.js
  stage-scene-snapshot.js
  story-command-envelope.js
  story-command-reasons.js
  story-command-result.js
  story-reducer.js
  story-projection.js
scripts/validate-story-fixtures.mjs
```

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Source Wire Map
```

Stop the next implementation when DOM-free fixtures can replay first-room completion, repeated inspection, unknown hotspot rejection, premature continue rejection, transition to the next scene, prototype completion, save/load roundtrip, reset, duplicate hotspot descriptor rejection, and ungrantable required clue rejection.

## Validation status

Runtime files changed in this pass: no.

Docs changed in this pass: yes.

Central ledger changed in this pass: yes.

Local build/browser validation: not run; connector-only documentation and source-inspection pass.
