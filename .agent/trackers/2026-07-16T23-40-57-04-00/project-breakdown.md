# Project breakdown: The Unmapped House runtime frame fault containment

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `runtime-frame-fault-containment-backoff-authority-audited`

## Summary

All ten eligible Publish repositories were tracked, root-agent-covered, and synchronized with their central ledgers. `TheUnmappedHouse` had the oldest eligible timestamp and was the only selected project.

The focused finding is in `StageKit.animate()`: the next RAF is requested before camera updates, material updates, offscreen rendering, or post presentation. If any frame phase throws, a successor callback is already queued. A deterministic failure can therefore repeat every browser frame without a terminal fault result, retry budget, backoff, runtime retirement, safe fallback, or restart acknowledgement.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-16T16-58-39-04-00 selected
PhantomCommand     2026-07-16T17-40-04-04-00
AetherVale         2026-07-16T18-00-35-04-00
TheLongHaul        2026-07-16T19-39-24-04-00
PrehistoricRush    2026-07-16T20-01-41-04-00
TheOpenAbove       2026-07-16T20-40-58-04-00
IntoTheMeadow      2026-07-16T21-01-07-04-00
MyCozyIsland       2026-07-16T21-38-30-04-00
HorrorCorridor     2026-07-16T22-00-47-04-00
ZombieOrchard      2026-07-16T22-59-23-04-00
TheCavalryOfRome   excluded
```

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
```

## Complete interaction loop

```txt
boot
  -> load and merge saved story state
  -> resolve current scene
  -> construct StageKit and WebGL resources
  -> load scene descriptors
  -> render story UI and persist state

interaction
  -> pointer movement updates cached pick and parallax evidence
  -> canvas or DOM inspection mutates clues, log and inspected state
  -> completed scene schedules interlude
  -> Continue advances route and loads the successor scene

StageKit RAF
  -> request successor RAF first
  -> read elapsed time
  -> derive parallax camera pose
  -> update animated material uniforms
  -> update post-process time
  -> render scene to offscreen target
  -> render post scene to the canvas

frame failure
  -> any camera, material or renderer phase throws
  -> current callback exits without a typed result
  -> already-requested successor callback still runs
  -> no retry budget, backoff, retirement or fallback is settled
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport and resize projection
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, shaders and raycasting
WebGL renderer, render target, post processing and recursive RAF
runtime frame attempt, phase execution, failure classification and retirement
safe diagnostic projection, retry/backoff and restart admission
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude and initial Loading copy |
| `aspect-frame-kit` | fixed design aspect, window-fit calculation and DOM frame placement |
| `story-data-kit` | scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials and post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, Continue, reset, UI projection and persistence calls |
| `scene-route-kit` | scene ID resolution and authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant and clue query |
| `notebook-log-kit` | prepend narrative log and bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement and delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | procedural shader materials and elapsed-time animation |
| `post-process-kit` | animated grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | offscreen stage pass, post pass and target sizing |
| `debug-json-projection-kit` | story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers and timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned runtime-frame-fault surfaces: 20
```

## Source-backed finding

```txt
successor RAF requested before frame work: present
camera phase after successor request: present
material phase after successor request: present
offscreen render after successor request: present
post render after successor request: present

frame try/catch boundary: absent
FrameAttemptId and FrameGeneration: absent
phase-specific fault classification: absent
bounded retry budget: absent
retry backoff: absent
runtime retirement result: absent
safe visible fallback: absent
restart command/result: absent
FirstSafeFaultFrameAck: absent
browser fault fixtures: 0
```

No production crash loop was reproduced. This is a source-backed lifecycle and executable-proof gap.

## Required authority

`the-unmapped-house-runtime-frame-fault-containment-backoff-authority-domain`

```txt
FrameAttemptCommand
  -> bind runtime, scene, renderer, target and frame generations
  -> execute named camera, material, scene-render and post-render phases
  -> publish FrameAttemptResult

FrameFaultSettlementCommand
  -> classify phase, cause, retryability and recurrence
  -> consume a bounded retry budget
  -> apply backoff or retire the runtime exactly once
  -> suspend stale interaction and renderer work
  -> publish FrameFaultSettlementResult

FrameRecoveryCommand
  -> validate expected generations and renderer health
  -> replace or resume resources exactly once
  -> publish FrameRecoveryResult
  -> publish FirstRecoveredFrameAck

SafeFaultProjectionCommand
  -> project one bounded public failure state
  -> expose an explicit restart action
  -> publish FirstSafeFaultFrameAck
```

## Planned authority surfaces

```txt
the-unmapped-house-runtime-frame-fault-containment-backoff-authority-domain
frame-attempt-command-kit
frame-generation-kit
frame-phase-plan-kit
frame-phase-execution-kit
frame-attempt-result-kit
frame-fault-classifier-kit
frame-fault-deduplication-kit
frame-retry-budget-kit
frame-retry-backoff-kit
runtime-retirement-kit
interaction-suspension-kit
renderer-health-kit
stage-resource-settlement-kit
safe-fault-projection-kit
restart-command-kit
frame-recovery-result-kit
first-safe-fault-frame-ack-kit
runtime-frame-fault-browser-fixture-kit
source-artifact-pages-frame-fault-parity-fixture-kit
```

## Required proof

```txt
camera-phase throw fixture
material-phase throw fixture
offscreen-render throw fixture
post-render throw fixture
persistent-fault retry-budget fixture
transient-fault recovery fixture
stale-callback rejection fixture
runtime retirement fixture
safe fallback and restart fixture
source/build/Pages parity fixture
```

## Boundary

Documentation only. Runtime JavaScript, HTML, CSS, story content, interaction, rendering, persistence, package scripts, workflows and deployment are unchanged. No executable browser or deployed-origin fixture was run.