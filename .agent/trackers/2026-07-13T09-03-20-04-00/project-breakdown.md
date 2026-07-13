# Project breakdown: The Unmapped House scene-transition composition authority

**Timestamp:** `2026-07-13T09-03-20-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Scope:** documentation-only audit

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current audit isolates scene-transition composition. `nextScene()` advances the story aggregate, route and log, closes the interlude, then asks `StageKit.loadScene()` to destructively replace the stage before UI projection and persistence complete. `loadScene()` clears the current stage and mutates camera, fog, post settings, materials, geometry and hotspot collections without a preparation result or rollback boundary. A failure in stage construction, DOM projection or `localStorage` can therefore leave story state, visible stage, interlude state, UI and durable save on different scene revisions.

## Plan ledger

**Goal:** make each scene advance one typed, revisioned transaction that prepares story, stage, UI, interlude and save candidates before committing all participants or none.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are present in the central ledger and have root `.agent` state.
- [x] Find no new, ledger-missing, root-agent-missing or unsynchronized eligible repository.
- [x] Select only `TheUnmappedHouse` by the oldest eligible central timestamp.
- [x] Trace boot, inspection, completion, interlude and scene-advance paths.
- [x] Identify all active domains.
- [x] Preserve all 24 implemented kit surfaces and offered services.
- [x] Define the scene-transition composition authority and fixture boundary.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
unsynchronized repositories: 0

TheUnmappedHouse   2026-07-13T04-47-00-04-00 selected oldest
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
PhantomCommand     2026-07-13T05-59-03-04-00
HorrorCorridor     2026-07-13T07-00-29-04-00
ZombieOrchard      2026-07-13T07-41-11-04-00
MyCozyIsland       2026-07-13T08-04-17-04-00
PrehistoricRush    2026-07-13T08-39-12-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
browser boot
  -> parse index.html and paint fixed shell
  -> resolve StageKit and Three.js provider
  -> load or create browser story state
  -> resolve currentScene from state.sceneId
  -> construct StageKit
  -> loadScene(currentScene)
  -> renderUi()
  -> saveState()

normal inspection
  -> canvas raycast or side-panel button selects hotspot
  -> inspectHotspot mutates inspected, clues, text and log
  -> completion check schedules delayed interlude
  -> renderUi()
  -> saveState()

scene advance
  -> Continue invokes nextScene()
  -> calculate authored successor
  -> assign currentScene = next
  -> mutate state.sceneId, route and log
  -> close interlude in DOM
  -> StageKit.loadScene(next)
       -> clear current stageGroup
       -> reset hotspot and material arrays
       -> mutate background, fog, camera and post uniforms
       -> allocate layers, props, materials and hotspot meshes
  -> renderUi()
  -> saveState()
  -> next RAF presents the new stage

failure window
  -> any stage, DOM or storage operation throws
  -> no typed SceneTransitionResult exists
  -> no participant rollback exists
  -> story, stage, interlude, UI and save can cite different scenes
  -> no first matching visible-frame acknowledgement exists
```

## Active domains

```txt
browser document and fixed-shell composition
authored story, scene, hotspot and render descriptors
scene routing and completion progression
inspection, clue, route and Notebook ledgers
interlude timing and terminal routing
browser persistence and destructive reset
DOM pointer, click, keyboard, modal and focus interaction
Three.js provider resolution and WebGL presentation
scene graph, camera, fog, materials, geometry and hotspot resources
raycast picking, camera parallax and hover projection
offscreen render target and post-processing
recursive RAF and callback lifetime
scene-transition participant preparation, commit, rollback and proof
syntax validation, local serving and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed 1920x1080 frame computation and DOM application. |
| `story-data-kit` | Three scenes, nine hotspots, clue grants, completion rules, camera, material and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI projection and persistence. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and clue query. |
| `notebook-log-kit` | Prepend narrative rows and bound retention. |
| `interlude-timer-kit` | Delayed completion interlude scheduling. |
| `terminal-route-kit` | Prototype-complete copy projection. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete one browser save. |
| `stage-render-kit` | Renderer, scene, camera, lights, render target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post configuration from descriptors. |
| `anime-material-kit` | Procedural shader materials and time-uniform updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Pointer normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass and post pass to canvas. |
| `debug-json-projection-kit` | Story-field serialization into the visible Notebook. |
| `package-syntax-check-kit` | Node syntax checks over local JavaScript. |
| `static-pages-deploy-kit` | Repository-root artifact upload and Pages deployment from `main`. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection mirror and findings history. |

```txt
implemented source-backed kit surfaces: 24
planned scene-transition authority kits: 26
```

## Source findings

### Story state advances before stage preparation

`nextScene()` assigns `currentScene`, updates `state.sceneId`, appends route and log entries and closes the interlude before calling `stage.loadScene(currentScene)`.

### Stage replacement is destructive

`StageKit.loadScene()` clears the current `stageGroup`, hotspot list and material list before constructing the successor. It has no detached candidate, validation result, resource receipt or rollback path.

### UI and save commit after stage replacement

`renderUi()` and `saveState()` execute only after `loadScene()` returns. A stage failure can leave the in-memory story advanced while the visible UI and durable save remain on the predecessor.

### Storage failure is not classified

`saveState()` calls `localStorage.setItem()` without a typed result or catch boundary. A quota, policy or serialization error occurs after story, stage and UI mutations.

### Visible adoption is unproven

The recursive RAF renders whatever state is current. No scene generation, transition ID, frame sequence or first-visible-scene acknowledgement correlates the committed story and stage.

## Required parent domain

```txt
the-unmapped-house-scene-transition-composition-authority-domain
```

Candidate kits:

```txt
scene-transition-id-kit
scene-transition-generation-kit
story-revision-kit
stage-generation-kit
scene-transition-command-kit
scene-transition-admission-kit
scene-route-precondition-kit
scene-descriptor-validation-kit
story-transition-candidate-kit
stage-transition-candidate-kit
stage-resource-receipt-kit
interlude-transition-candidate-kit
ui-transition-candidate-kit
save-transition-candidate-kit
transition-participant-prepare-kit
transition-participant-receipt-kit
scene-transition-commit-kit
scene-transition-rollback-kit
scene-transition-result-kit
scene-transition-journal-kit
scene-transition-observation-kit
first-scene-frame-ack-kit
stage-preparation-failure-fixture-kit
ui-save-failure-fixture-kit
stale-duplicate-transition-fixture-kit
browser-pages-scene-transition-smoke-kit
```

## Required transaction

```txt
SceneTransitionCommand
  -> bind TransitionId, session generation and predecessor revisions
  -> validate current scene, completion phase and authored successor
  -> validate successor descriptors without mutating live ownership
  -> prepare detached story, stage, interlude, UI and save candidates
  -> collect participant preparation receipts
  -> reject stale, duplicate or failed candidates with zero live mutation
  -> atomically adopt every participant or restore the predecessor set
  -> publish one terminal SceneTransitionResult
  -> release predecessor stage resources after accepted adoption
  -> render the accepted scene generation
  -> publish FirstSceneFrameAck
```

Terminal statuses should include:

```txt
Accepted
TerminalAccepted
InvalidRoute
CompletionRequired
DescriptorRejected
StagePreparationFailed
UiPreparationFailed
PersistenceRejected
CommitFailedRolledBack
Duplicate
Stale
Cancelled
```

## Required proof

```txt
successful transition commits story, stage, interlude, UI and save together
stage allocation failure leaves every predecessor participant intact
DOM projection failure leaves every predecessor participant intact
storage rejection leaves every predecessor participant intact
late and duplicate commands mutate nothing
terminal scene completion does not create an invalid successor
predecessor resources retire only after successor adoption
first visible frame cites TransitionId and stage/story revisions
source, browser, built-output and Pages fixture matrices pass
```

## Validation boundary

This run changes documentation and machine audit state only. Runtime JavaScript, HTML, CSS, story descriptors, provider source, rendering, persistence, package scripts, dependencies and Pages workflow are unchanged. No executable transition fixture was run.