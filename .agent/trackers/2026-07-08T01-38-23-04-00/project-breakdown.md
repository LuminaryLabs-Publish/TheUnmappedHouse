# The Unmapped House Project Breakdown

**Generated:** `2026-07-08T01:38:23-04:00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

**Selected repo:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Selection status:** oldest eligible tracked non-Cavalry Publish repo after the latest `HorrorCorridor` pass.

## Selection check

Observed Publish repos:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome   excluded by standing rule
TheOpenAbove
TheUnmappedHouse   selected
ZombieOrchard
```

Central ledger ordering used for this pass:

```txt
TheUnmappedHouse   latest reviewed 2026-07-08T00:08:03-04:00   selected
TheOpenAbove       latest reviewed 2026-07-08T00:21:15-04:00
AetherVale         latest reviewed 2026-07-08T00:28:42-04:00
PhantomCommand     latest reviewed 2026-07-08T00:41:39-04:00
PrehistoricRush    latest reviewed 2026-07-08T00:49:44-04:00
MyCozyIsland       latest reviewed 2026-07-08T01:00:43-04:00
IntoTheMeadow      latest reviewed 2026-07-08T01:10:16-04:00
ZombieOrchard      latest reviewed 2026-07-08T01:20:35-04:00
HorrorCorridor     latest reviewed 2026-07-08T01:31:11-04:00
```

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype. The playable surface is a static web page that mounts a Three.js Stage Kit, loads one authored story scene at a time, lets the player inspect hotspots by raycast or side-panel buttons, grants clues, completes a room when required clues are found, shows an interlude, and advances to the next room.

The live route is still:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

The strongest reusable system remains `StageKit`. It owns renderer setup, locked-camera composition, pointer parallax, shader material creation, post-process rendering, scene descriptor loading, layer/prop/hotspot creation, hover labels, raycast picking, resizing, and animation.

The main blocker is still story authority shape. `src/game.js` mutates state directly from UI handlers. Inspection, clue grants, repeat inspection, room completion, interlude display, next-scene routing, save writes, reset, and debug projection do not yet produce typed result envelopes, stable reason codes, command journals, or DOM-free fixture replay.

## Interaction loop

### Current player-facing loop

```txt
open index.html
  -> read the current room text
  -> hover the stage to reveal hotspot labels
  -> click an invisible hotspot volume or matching side-panel button
  -> read the inspection text
  -> collect clue grants into notebook state
  -> repeat until all required scene clues are found
  -> interlude opens as a map update / field note
  -> click Continue
  -> next scene loads and route persists
  -> press R to clear local save when needed
```

### Current runtime loop

```txt
index.html loads src/game.js
  -> game.js imports StageKit and story scenes
  -> DOM nodes are captured
  -> loadState reads localStorage using SAVE_KEY
  -> currentScene resolves from state.sceneId
  -> StageKit is constructed with root, hoverLabel, and onHotspot callback
  -> stage.loadScene(currentScene) rebuilds Three scene contents
  -> renderUi projects scene title, text, buttons, notebook debug
  -> StageKit animate loop renders to WebGLRenderTarget and post scene
  -> pointer movement normalizes raycast coordinates and parallax input
  -> clickHotspot calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected/clues/log/text/interlude state
  -> saveState writes the full mutable state object to localStorage
```

### Target authority loop

```txt
UI / StageKit input creates StoryCommandEnvelope
  -> command ids: inspect_hotspot, continue_scene, reset_save, load_save
  -> source snapshot validates scene id, hotspot id, route index, clue requirements
  -> pure reducer returns StoryCommandResult
  -> result carries accepted, reason, before/after snapshot ids, clue delta, log delta, completion result, transition result, save result
  -> UI consumes result records and updates text/interlude/debug
  -> StageKit remains a render/input adapter
  -> GameHost exposes latest result, command journal, story snapshot, stage snapshot, save snapshot, and fixture report
  -> DOM-free fixtures replay scenes without WebGL or localStorage
```

## Domains in use

```txt
static-page-shell
static-pages-deploy
app-runtime
story-source
scene-descriptor
stage-render-host
fixed-camera-composition
fixed-camera-parallax
anime-material-shader
webgl-post-process
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
hover-label-projection
inspection-action
inspection-result-authority
clue-ledger
scene-completion
interlude-transition
route-state
save-state
reset-state
notebook-debug
runtime-diagnostics
fixture-replay
stage-descriptor-validation
```

## Domain notes

### static-page-shell

Owns the page shell: `#stage`, `#story-panel`, `#hotspot-list`, `#state-debug`, `#hover-label`, `#interlude`, and the module route into `src/game.js`.

### app-runtime

Owns boot order, DOM binding, state loading, scene resolution, StageKit construction, UI event binding, UI projection, and reset handling.

### story-source

Owns `gameTitle`, ordered scenes, opening text, interlude copy, completion requirements, and authored clue/hotspot data.

### scene-descriptor

Owns camera data, fog, background color, layers, props, hotspots, material presets, and post-process values.

### stage-render-host

Owns Three renderer, scene graph, camera, lights, render target, post scene, resize behavior, and animation loop.

### hotspot-picking

Owns invisible mesh creation, pointer coordinate normalization, raycasting, hover tracking, hover label placement, and click dispatch.

### inspection-result-authority

Missing as a first-class kit. It should own validation, repeat handling, accepted/rejected result records, stable reasons, clue deltas, and text/log deltas.

### fixture-replay

Missing. It should replay story commands against scene descriptors without DOM, WebGL, localStorage, timers, or click events.

## Services that current kits offer

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
story scene descriptor export
static Pages deploy workflow
```

## Services missing for next authority pass

```txt
createStorySourceSnapshot
createStageSceneSnapshot
createStoryCommandEnvelope
validateStoryCommand
applyInspectionCommand
applyContinueSceneCommand
applyResetSaveCommand
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

## Kits identified

### Implemented explicit kits

```txt
unmapped-house-static-shell-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-static-pages-deploy-kit
```

### Runtime-implied kits

```txt
unmapped-house-app-runtime-kit
unmapped-house-story-ui-projection-kit
unmapped-house-localstorage-save-kit
unmapped-house-route-state-kit
unmapped-house-stage-descriptor-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-fixed-camera-parallax-kit
unmapped-house-postprocess-memory-kit
unmapped-house-static-validation-kit
```

### Next-cut kits

```txt
unmapped-house-story-command-envelope-kit
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-inspection-rejection-reason-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-state-journal-kit
unmapped-house-save-result-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-command-journal-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-stage-descriptor-validation-kit
```

### Deferred kits

```txt
unmapped-house-inventory-memory-kit
unmapped-house-character-affinity-kit
unmapped-house-chapter-route-graph-kit
unmapped-house-audio-sting-kit
unmapped-house-controller-navigation-kit
unmapped-house-save-slot-kit
unmapped-house-storylet-authoring-kit
unmapped-house-cutscene-panel-kit
```

## Source-backed findings

```txt
README.md confirms the fixed-camera anime point-and-click horror prototype and Stage Kit scope.
index.html confirms a single static module route through ./src/game.js.
src/game.js confirms direct mutable story state, localStorage persistence, hotspot inspection, room completion, interlude transition, UI projection, and KeyR reset.
src/stage-kit.js confirms StageKit owns renderer/camera/raycaster/lights/render target/post pass, scene loading, hotspot volumes, hover/click picking, resize, and animation.
src/story-data.js confirms three scene descriptors with camera, layers, props, hotspots, clue grants, completion requirements, and interludes.
```

## Next slice

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

### Build order

```txt
preserve current static route, visuals, story copy, StageKit behavior, localStorage key, and Pages workflow
  -> add StorySourceSnapshot and StageSceneSnapshot helpers
  -> add StoryCommandEnvelope for inspect_hotspot, continue_scene, reset_save, and load_save
  -> add StoryCommandResult with accepted/rejected status and stable reason
  -> move inspectHotspot mutation into pure applyInspectionCommand
  -> move nextScene mutation into pure applyContinueSceneCommand
  -> emit InspectionResult, SceneCompletionResult, SceneTransitionResult, SaveResult, and RouteJournal entries
  -> keep existing UI as a consumer of result records
  -> expose additive window.GameHost.getState diagnostics
  -> add DOM-free fixture harness for first-room completion, repeat inspection, unknown hotspot, transition, full route, save/load, and reset
  -> defer deeper StageKit renderer extraction until story authority fixtures are stable
```

## Acceptance target

```txt
The browser prototype still loads from index.html.
All existing authored scenes, visuals, hotspot buttons, hover labels, and raycast clicks still work.
Hotspot buttons and raycast clicks both produce StoryCommandResult records.
First-time inspection grants each clue exactly once.
Repeat inspection returns reason=repeat_inspection and does not duplicate clues.
Unknown hotspot returns accepted=false with reason=unknown_hotspot.
Continue before completion returns accepted=false with reason=scene_incomplete.
Room completion produces SceneCompletionResult.
Continue after completion produces SceneTransitionResult.
RouteJournal captures accepted inspection and transition events.
SaveResult wraps load/save/reset paths.
window.GameHost.getState exposes story, stage, save, journal, latestResult, and fixture diagnostics.
DOM-free fixtures prove core story progression without WebGL or localStorage.
```

## Validation

```txt
Runtime source files changed: no
.agent docs changed: yes
Central ledger changed: yes
Local build/smoke run: no, connector-only documentation pass
```
