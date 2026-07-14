# Project breakdown: The Unmapped House page lifecycle suspension and resume

**Timestamp:** `2026-07-14T11-59-13-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `page-lifecycle-suspension-resume-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, localStorage persistence, a fixed 16:9 shell, a DOM story panel and a descriptor-driven Three.js stage.

The current runtime has no application-owned page lifecycle authority. `StageKit.animate()` recursively requests frames forever, `THREE.Clock` owns animation time, completion interludes use raw `setTimeout`, and startup installs listeners without `visibilitychange`, `pagehide`, `pageshow`, `freeze` or `resume` handling. A hidden, frozen or BFCache-restored page therefore has no explicit render lease, timer policy, clock rebase, resource revalidation or first resumed-frame evidence.

## Plan ledger

**Goal:** preserve story truth across hidden, frozen and restored browser states while suspending disposable work and admitting exactly one resumed stage generation.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Find no new, ledger-missing, root-agent-missing or runtime-ahead eligible repository.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized central timestamp.
- [x] Inspect document boot, RAF, Three.js clock, resize, pointer, click, delayed interlude, save and reload behavior.
- [x] Preserve all 24 implemented kit surfaces and offered services.
- [x] Define the page lifecycle suspension/resume authority and fixture boundary.
- [x] Add a new timestamped tracker and audit family.
- [x] Change documentation and machine audit state only.
- [ ] Implement lifecycle admission and executable browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: TheUnmappedHouse
prior central timestamp: 2026-07-14T06-00-41-04-00
selection reason: oldest synchronized documented timestamp
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` is modified in the Publish organization for this run.

## Complete interaction loop

```txt
boot
  -> load and shallow-merge saved story state
  -> resolve current scene
  -> construct StageKit
  -> allocate renderer, target, scene graph and listeners
  -> start recursive RAF
  -> load scene and render DOM controls

active play
  -> pointer updates raycast and camera parallax
  -> canvas or DOM hotspot inspection mutates story state
  -> ordinary state is written to localStorage
  -> scene completion schedules a 450 ms interlude timeout
  -> RAF advances shader and post-process time continuously

page hidden or frozen
  -> no lifecycle command is admitted
  -> no render-submission lease is retired
  -> no explicit clock pause or timer policy exists
  -> no input, resize or interlude participant receipt exists

page visible or restored
  -> existing objects continue implicitly
  -> elapsed shader time may jump
  -> pending interlude may already have fired
  -> renderer, context, viewport and scene revisions are not revalidated
  -> no first resumed-stage frame acknowledgement is published
```

## Main findings

### Recursive rendering has no owner-visible lease

`StageKit.animate()` calls `requestAnimationFrame(() => this.animate())` on every frame and stores no request ID. The host cannot suspend, cancel, supersede or prove ownership of one active frame generation.

### Time resumes without an application policy

The stage and post-process shaders consume `THREE.Clock.getElapsedTime()`. No lifecycle listener pauses or rebases the clock, so visual time after a long suspension is not tied to a typed resume result or accepted simulation policy.

### Story timers and presentation are not correlated

Scene completion schedules `showInterlude(currentScene)` with raw `setTimeout`. The ordinary story save occurs immediately, but the delayed presentation has no timer identity, cancellation policy, hidden-page rule or resumed-frame acknowledgement.

### BFCache and restoration are unclassified

The runtime does not handle `pagehide` or `pageshow`, does not inspect `event.persisted`, and does not validate the WebGL context, render target, viewport, listeners or current scene before continuing.

### Validation cannot exercise lifecycle behavior

`npm run check` performs syntax checks only. There is no browser fixture for hidden tabs, frozen pages, BFCache restore, clock rebasing, timer carryover, duplicate RAF prevention or first resumed-frame convergence.

## Domains in use

```txt
browser document boot and lifecycle
page visibility, pagehide/pageshow and BFCache restoration
fixed-aspect viewport shell
story manifest, state, clues, inspections, route and Notebook
scene completion and delayed interlude scheduling
localStorage persistence and reset
DOM and canvas interaction
Three.js provider and WebGL renderer
scene, camera, lighting and descriptor consumption
procedural shader and post-process time
hotspot volumes, raycasting and dispatch
camera parallax
recursive RAF and render-submission ownership
lifecycle suspension, checkpoint, resume and supersession
context and viewport revalidation
first resumed visible-frame evidence
syntax validation and static Pages delivery
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation and DOM frame placement. |
| `story-data-kit` | Scene descriptors, hotspots, clue grants, completion rules, camera, materials and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI projection and persistence calls. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Narrative log mutation and bounded retention. |
| `interlude-timer-kit` | Delayed completion interlude. |
| `terminal-route-kit` | Prototype-complete DOM projection. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post-process construction. |
| `anime-material-kit` | Procedural shader materials and elapsed-time updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Coordinate normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing. |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | Static Pages delivery from repository content. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection mirror and findings history. |

```txt
implemented source-backed kits: 24
planned page lifecycle coordinating surfaces: 22
```

## Required authority

```txt
the-unmapped-house-page-lifecycle-suspension-resume-authority-domain
```

```txt
PageLifecycleEvent
  -> bind DocumentGeneration, LifecycleAttemptId and prior StageGeneration
  -> classify hidden, visible, pagehide, pageshow, freeze and resume
  -> retire the accepted render-submission lease when suspension begins
  -> pause or explicitly continue shader time
  -> snapshot pending interlude and interaction participants
  -> checkpoint accepted story truth without creating new gameplay effects
  -> on restore validate document, WebGL context, renderer, target,
     scene, viewport, listeners, timer state and current story revision
  -> prepare replacements only for invalid participants
  -> reject stale, duplicate and superseded resume work
  -> atomically adopt one resumed participant set
  -> publish PageLifecycleResult
  -> resume one RAF generation with rebased time
  -> publish FirstResumedStageFrameAck
```

## Required lifecycle statuses

```txt
SuspendAccepted
SuspendDuplicate
SuspendStale
RenderLeaseRetired
ClockPaused
TimerCheckpointed
PageRestored
RestoreValidationPassed
RestoreRebuildRequired
ResumeAccepted
ResumeRejected
ResumeSuperseded
FirstResumedFrameAcknowledged
```

## Validation boundary

This run changes documentation only. It does not implement lifecycle listeners, RAF cancellation, clock rebasing, timer checkpointing, BFCache admission, resource revalidation, resumed-frame proof or production readiness.