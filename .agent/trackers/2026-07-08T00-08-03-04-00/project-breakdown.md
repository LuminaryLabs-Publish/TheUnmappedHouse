# The Unmapped House Project Breakdown

**Generated:** `2026-07-08T00:08:03-04:00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Branch target:** `main`

**Selected because:** this repo exists in `LuminaryLabs-Publish`, was not present in the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger, and is therefore older than the already-rotating documented Publish repos for breakdown purposes. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Plan ledger

**Goal:** Create the first repo-local `.agent` documentation pass for `TheUnmappedHouse`, identify its interaction loop, domains, services, kits, blockers, and next implementation slice, then log the finding into the central LuminaryLabs repo.

**Checklist:**

- [x] Confirmed repo exists under `LuminaryLabs-Publish`.
- [x] Confirmed repo is not yet tracked in central `repo-ledger/LuminaryLabs-Publish/`.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Inspected README, package, static entry, runtime, StageKit, story source, and Pages workflow.
- [x] Identified the current player loop.
- [x] Identified the current runtime loop.
- [x] Identified domains in use.
- [x] Identified current services.
- [x] Identified current and candidate kits.
- [x] Defined the next implementation slice.

## Source-backed current read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype. The README describes a reusable Stage Kit for locked-camera Three.js diorama scenes, text-first hotspot inspection, story state, procedural stage props, anime-style shader materials, and WebGL post-processing.

The live route is intentionally small:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

`index.html` owns the static shell: stage mount, story panel, hotspot list, notebook/debug pane, hover label, interlude modal, and module script route.

`src/game.js` owns application state and story logic: localStorage load/save, current scene selection, StageKit boot, hotspot inspection, clue grants, log entries, room completion, interlude display, scene advancement, UI projection, and reset via `KeyR`.

`src/stage-kit.js` owns the reusable render/runtime kit: Three.js renderer, scene, camera, raycaster, animated anime shader material, post-processing shader, render target, fixed-camera parallax, scene descriptor loading, layer/prop/hotspot creation, pointer hover, click picking, resize, and animation.

`src/story-data.js` owns the current narrative source: three scenes, each with camera data, stage layers, props, post settings, hotspots, clue grants, completion requirements, and interlude copy.

The Pages workflow deploys the full static repository root on `main` pushes.

## Interaction loop

### Current player-facing loop

```txt
open index.html
  -> see fixed-camera room diorama
  -> move pointer over invisible hotspot volumes
  -> read hover label
  -> click hotspot
  -> read text-first inspection result
  -> collect clue into notebook state
  -> repeat until all required scene clues are found
  -> receive interlude / map update
  -> click Continue
  -> load next fixed-camera room
  -> repeat until prototype completion
  -> press R to reset local save when needed
```

### Current runtime loop

```txt
index.html loads src/game.js
  -> query DOM nodes
  -> load localStorage state or create initial state
  -> choose scene from story-data by state.sceneId
  -> create StageKit({ root, hoverLabel, onHotspot })
  -> StageKit creates renderer, scene, camera, raycaster, lights, render target, post scene, post shader
  -> stage.loadScene(currentScene)
  -> StageKit clears old stage and builds layers, props, and hotspot meshes from descriptors
  -> renderUi projects title, scene text, hotspot buttons, and notebook debug JSON
  -> StageKit animation loop updates material time, parallax camera, render target, and post pass
  -> pointer hover/click raycasts against hotspot meshes
  -> inspectHotspot mutates state, clues, inspected map, and log
  -> saveState persists to localStorage
```

### Target authority loop

```txt
user requests inspect-hotspot
  -> create InspectionCommandEnvelope
  -> validate scene id and hotspot id
  -> classify accepted / rejected reason
  -> produce InspectionResult with before/after state snapshots
  -> apply clue ledger reducer
  -> apply scene completion reducer
  -> optionally produce SceneTransitionResult
  -> project StorySnapshot, StageSnapshot, JournalSnapshot, and SaveSnapshot
  -> expose diagnostics through window.GameHost
  -> replay the same command sequence in DOM-free fixtures
```

## Domains in use

```txt
static-page-shell
  owns HTML structure, stage mount, story panel, interlude shell, hover label, notebook pane

static-pages-deploy
  owns GitHub Pages workflow, root artifact upload, main-branch deployment

app-runtime
  owns DOM lookup, boot order, current scene binding, key reset, UI projection

story-source
  owns gameTitle, scene descriptors, opening copy, interlude copy, route ordering

scene-descriptor
  owns camera, fog, background, stage layers, props, hotspots, post settings

stage-render-host
  owns renderer, scene, camera, render target, render loop, resize

fixed-camera-composition
  owns scene camera descriptors, base camera, lookAt, fov, parallax offset

anime-material-shader
  owns triplanar/fbm-ish stage shader, toon lighting, rim, material uniforms

webgl-post-process
  owns grain, vignette, chromatic aberration, distortion, memory scanline pass

hotspot-picking
  owns invisible volume creation, pointer projection, raycast selection, hover label, click dispatch

inspection-action
  owns hotspot inspection intent and text result, currently implicit inside inspectHotspot

clue-ledger
  owns clue grant idempotency and clue collection state

scene-completion
  owns requiresToComplete checks and completion classification

interlude-transition
  owns room completion interlude display and continue-to-next-scene logic

route-state
  owns ordered scene route and visited scene ids

save-state
  owns localStorage key, loadState, saveState, reset behavior

notebook-debug
  owns debug JSON projection, latest log entries, inspected state, completion status

runtime-diagnostics
  not implemented yet; should own GameHost state snapshots and last command results

fixture-replay
  not implemented yet; should own DOM-free inspection/transition parity fixtures
```

## Services currently present

### App/runtime services

```txt
createInitialState()
loadState()
saveState()
hasClue(clue)
grantClues(clues)
writeLog(entry)
sceneComplete(scene)
inspectHotspot(hotspot)
showInterlude(scene)
nextScene()
renderUi()
KeyR local save reset
```

### StageKit services

```txt
constructor root validation
Three.js renderer creation
pixel ratio and size setup
shadow map setup
Scene and stageGroup creation
PerspectiveCamera creation
Raycaster creation
DirectionalLight and HemisphereLight creation
WebGLRenderTarget creation
post-process scene and material creation
resize listener
mousemove pointer listener
click hotspot listener
animeMaterial(preset)
loadScene(sceneData)
createLayer(layer)
createProp(prop)
createHotspot(hotspot)
handlePointer(event)
pick()
clickHotspot()
resize()
animate()
```

### Story descriptor services

```txt
gameTitle export
scenes export
scene id/title/opening text
background/fog descriptor
camera descriptor
stage layer descriptor
prop descriptor
post-process descriptor
hotspot descriptor
clue grant descriptor
requiresToComplete descriptor
interlude descriptor
```

### Deployment / validation services

```txt
package check script: node --check src/game.js, src/stage-kit.js, src/story-data.js
static local server script: python3 -m http.server 8080
GitHub Pages deploy workflow on main push
root static artifact upload
```

## Kits identified

### Implemented kits

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

### Runtime-implied kits to extract or formalize

```txt
unmapped-house-inspection-action-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-inspection-rejection-reason-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-state-journal-kit
unmapped-house-save-snapshot-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-command-journal-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-stage-descriptor-validation-kit
```

### Future product kits

```txt
unmapped-house-room-authoring-kit
unmapped-house-hotspot-authoring-kit
unmapped-house-prop-library-kit
unmapped-house-house-map-progression-kit
unmapped-house-memory-distortion-kit
unmapped-house-save-slot-kit
unmapped-house-settings-kit
unmapped-house-audio-ambience-kit
unmapped-house-worldspace-prompt-kit
unmapped-house-scene-unlock-kit
unmapped-house-end-state-kit
```

## Current blockers

```txt
No .agent folder existed before this pass.
No central repo ledger existed for TheUnmappedHouse before this pass.
No window.GameHost diagnostics surface exists.
Inspection logic mutates state directly and does not return typed accepted/rejected results.
Repeated inspections are handled as a special branch but not classified as a result reason.
Scene completion is checked, but completion/transition does not produce a typed SceneTransitionResult.
Route progression is an array of scene ids, but it is not journaled as accepted transition events.
Save snapshots are implicit localStorage writes, not explicit SaveResult records.
StageKit validates root only; scene descriptors are trusted without validation.
There is no DOM-free fixture harness for hotspot inspection, clue grants, scene completion, repeat inspection, missing hotspot, save/load, reset, or final prototype completion.
```

## Next implementation slice

```txt
TheUnmappedHouse Inspection Result Contract + Scene Transition Fixture Gate
```

### Build order

```txt
preserve current static route, visuals, story copy, StageKit behavior, localStorage key, and Pages workflow
  -> add StoryStateSnapshot helper
  -> add StageSceneSnapshot helper
  -> add InspectionCommandEnvelope contract
  -> add InspectionResult contract
  -> add stable InspectionReason values: accepted, repeat_inspection, unknown_scene, unknown_hotspot, scene_already_complete
  -> make inspectHotspot delegate to pure applyInspectionCommand(state, scene, hotspotId)
  -> preserve existing UI by consuming the result instead of directly mutating state
  -> add SceneCompletionResult for newly completed rooms and already complete rooms
  -> add SceneTransitionResult for Continue actions
  -> add RouteJournal entries for accepted inspections and accepted transitions
  -> add SaveResult record around localStorage writes
  -> expose window.GameHost.getState() with story, stage, journal, save, and latestResult snapshots
  -> add DOM-free fixture module for story-state reducers
  -> prove first room completion, repeat inspection, unknown hotspot rejection, transition to hallway, full prototype route, save/load, and reset behavior
  -> defer StageKit renderer extraction until command/result fixtures are stable
```

## Acceptance target

```txt
Existing browser prototype still loads from index.html and keeps its current story/visual behavior.
Hotspot buttons and raycast clicks both produce InspectionResult records.
Accepted first-time hotspot inspection grants clues exactly once.
Repeat inspection returns reason=repeat_inspection and does not duplicate clues.
Unknown hotspot returns accepted=false with reason=unknown_hotspot.
Room completion produces SceneCompletionResult with before/after completion state.
Continue action produces SceneTransitionResult with fromSceneId, toSceneId, accepted, reason, before, and after.
RouteJournal captures inspection and transition events.
window.GameHost.getState() exposes current scene, clues, inspected map, route, latest result, journal counters, and stage descriptor summary.
DOM-free fixture harness passes first-room, repeat, unknown-hotspot, transition, full-route, save/load, and reset cases.
StageKit render extraction remains out of scope for this slice.
```

## Validation status

```txt
Runtime source files changed: no
.agent docs changed: yes
Central ledger changed: yes
Local build/smoke run: no, connector-only documentation pass
```
