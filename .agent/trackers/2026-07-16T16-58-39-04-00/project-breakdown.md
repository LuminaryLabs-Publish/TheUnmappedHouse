# Project breakdown: The Unmapped House scene-entry narrative projection

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed repository head:** `34ac6209e2e434ce68e809f9b3a656b43e638ba1`  
**Status:** `scene-entry-narrative-projection-authority-audited`

## Summary

TheUnmappedHouse is a three-scene fixed-camera point-and-click prototype. Scene progression correctly changes the scene identity, stage descriptor, title, hotspot list, route and save state, but the main story paragraph is only assigned from `openingText` when it is empty or exactly `Loading`.

After the player completes a scene, that paragraph contains the last inspected hotspot text. `nextScene()` advances to the successor and calls `renderUi()`, but the conditional opening-copy assignment fails. The new stage, title and interaction list can therefore be presented with narrative copy from the previous scene until the player inspects another hotspot.

This is a deterministic source-backed visible-coherence defect. No browser fixture was executed during this documentation-only pass.

## Plan ledger

**Goal:** make scene entry publish one revision-bound narrative result so the title, opening copy, stage, hotspots, Notebook and save all describe the same accepted scene before the first scene-entry frame is acknowledged.

- [x] Compare the complete 11-repository Publish inventory with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only TheUnmappedHouse by the oldest synchronized central timestamp.
- [x] Inspect boot, inspection, completion, interlude, scene advancement, UI projection, stage loading and persistence.
- [x] Identify the complete interaction loop, active domains, all 24 implemented kits and every offered service.
- [x] Isolate the stale previous-scene narrative carryover path.
- [x] Define one parent narrative-projection authority and 17 coordinating surfaces.
- [x] Add timestamped architecture, render, gameplay, interaction, narrative, deployment, central-sync and turn-ledger records.
- [x] Keep runtime, authored content, rendering, persistence, package scripts and deployment unchanged.
- [ ] Implement and execute scene-entry narrative fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/TheUnmappedHouse
selection rule: oldest synchronized central timestamp
selected prior timestamp: 2026-07-16T09-58-49-04-00
next oldest: LuminaryLabs-Publish/PhantomCommand at 2026-07-16T10-38-36-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
page boot
  -> restore or create story state
  -> resolve currentScene
  -> construct StageKit
  -> load current scene descriptor
  -> render title, opening copy, hotspot list and Notebook
  -> save state

inspection
  -> select hotspot from canvas or DOM
  -> mark inspected
  -> grant clues
  -> replace scene-text with hotspot text
  -> append Notebook log
  -> render UI and save
  -> if complete, schedule interlude

scene advance
  -> Continue calls nextScene()
  -> resolve successor
  -> assign currentScene = successor
  -> mutate sceneId, route and log
  -> close interlude
  -> StageKit loads successor camera, geometry, materials and hotspots
  -> renderUi() updates title and hotspot list
  -> renderUi() preserves old scene-text because it is non-empty and not Loading
  -> save successor state
  -> RAF presents successor stage with predecessor hotspot copy

next inspection
  -> scene-text finally changes to successor hotspot text
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport
story content and scene descriptors
story state, clues, inspections, route, interlude, terminal and persistence
scene-entry narrative policy and story-panel projection
DOM controls, focus, keyboard, pointer, hover and canvas picking
Three.js camera, scene, geometry, materials, shaders, raycasting, targets and RAF
syntax validation, static artifact, Pages delivery and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label, interlude and initial Loading copy |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation and DOM frame placement |
| `story-data-kit` | Scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials and post descriptors |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, Continue, reset, UI projection and persistence calls |
| `scene-route-kit` | Scene ID resolution and authored-order advancement |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state |
| `clue-ledger-kit` | Clue grant and query |
| `notebook-log-kit` | Narrative log prepend and bounded retention |
| `interlude-timer-kit` | Delayed completion interlude |
| `terminal-route-kit` | Prototype-complete DOM projection |
| `localstorage-save-kit` | Parse, shallow merge, whole-slot replacement and delete |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | Procedural shader materials and elapsed-time animation |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | Coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks for four source modules |
| `static-pages-deploy-kit` | Static Pages delivery |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records |
| `central-ledger-sync-kit` | Central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned scene-entry narrative surfaces: 18
```

## Source-backed findings

1. `inspectHotspot()` assigns `text.textContent = hotspot.text`, so a completed scene normally ends with non-empty inspection copy.
2. `nextScene()` replaces `currentScene`, state identity, route, stage and hotspot projections before calling `renderUi()`.
3. `renderUi()` assigns `currentScene.openingText` only when `scene-text` is empty or exactly `Loading`.
4. The predecessor inspection copy therefore survives an ordinary accepted scene change.
5. The title and hotspot list describe the successor while the story paragraph can describe the predecessor.
6. The save records the successor scene, so reload can mask the transient mismatch by re-running boot with an initially empty paragraph.
7. The syntax-only package check cannot prove scene-entry narrative convergence.

## Required authority

`the-unmapped-house-scene-entry-narrative-projection-authority-domain`

```txt
SceneEntryCommand
  -> bind session, content, route, story, stage, UI and save revisions
  -> resolve accepted successor scene
  -> select opening-copy policy for boot, transition, resume or re-entry
  -> prepare title, opening text, hotspot list and Notebook entry
  -> publish immutable SceneEntryNarrativeResult

SceneEntryProjectionCommand
  -> require accepted scene and narrative revisions
  -> project title, opening copy, stage and hotspot list as one scene generation
  -> reject stale predecessor copy and stale UI work
  -> publish SceneEntryProjectionResult
  -> publish FirstSceneEntryFrameAck
```

## Planned surfaces

```txt
the-unmapped-house-scene-entry-narrative-projection-authority-domain
scene-entry-command-kit
scene-entry-generation-kit
scene-entry-copy-policy-kit
scene-opening-copy-selector-kit
story-panel-revision-kit
scene-title-projection-kit
scene-opening-text-projection-kit
hotspot-list-scene-binding-kit
notebook-scene-entry-projection-kit
interlude-retirement-receipt-kit
stage-scene-generation-binding-kit
scene-entry-narrative-result-kit
scene-entry-projection-result-kit
stale-narrative-revision-rejection-kit
first-scene-entry-frame-ack-kit
previous-scene-copy-leak-fixture-kit
source-artifact-pages-scene-entry-parity-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, authored story content, stage rendering, interaction behavior, persistence, package scripts, workflows and deployment were not changed. No browser scene-transition, reload, artifact or Pages fixture was executed.