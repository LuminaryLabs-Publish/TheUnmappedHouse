# START HERE: The Unmapped House

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Last updated:** `2026-07-12T08-10-36-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine required hotspots, browser persistence, a fixed 16:9 shell, side-panel inspection controls and a descriptor-driven Three.js stage.

The current audit isolates the 450 ms completion delay. `inspectHotspot()` schedules an unretained timeout with `setTimeout(() => showInterlude(currentScene), 450)`. The callback reads mutable `currentScene` when it fires, while `nextScene()` can replace the scene, hide the interlude, rebuild the stage and persist a successor before that callback runs. No timeout handle, timer generation, expected scene, completion-proof identity, transition barrier or stale-callback rejection exists.

A transition during the delay can therefore let a predecessor completion callback open the successor scene's interlude without successor completion. On the final scene, terminal copy can be written and then overwritten by the delayed scene interlude.

## Plan ledger

**Goal:** require one completion-timer authority so delayed interlude work is bound to the exact scene, completion proof, modal generation, transition revision and runtime session that admitted it.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest synchronized eligible repository.
- [x] Trace inspection, completion scheduling, scene mutation, terminal projection, stage replacement and persistence.
- [x] Preserve the complete 24-kit implemented inventory and service map.
- [x] Confirm the timeout handle is discarded and its callback reads mutable `currentScene`.
- [x] Confirm scene and terminal transitions do not cancel or fence pending completion callbacks.
- [x] Define timer identity, lease, cancellation, callback context, barriers, typed results, observations and fixture boundaries.
- [x] Refresh required root `.agent` files and add a timestamped audit family.
- [ ] Runtime implementation and executable timer-order fixtures remain future work.

## Current interaction loop

```txt
boot
  -> load mutable browser state
  -> construct StageKit and recursive RAF
  -> load current scene and project UI

inspection
  -> inspect one previously unseen hotspot
  -> mutate inspection, clues, log and narrative
  -> when sceneComplete(currentScene) becomes true
     schedule setTimeout(() => showInterlude(currentScene), 450)
  -> discard the timeout handle
  -> save state

during the 450 ms delay
  -> Continue or another transition source can call nextScene()
  -> currentScene mutates
  -> stage resources are replaced
  -> interlude is hidden
  -> successor state is saved

delayed callback
  -> reads the current value of mutable currentScene
  -> writes that scene's interlude copy
  -> opens the interlude
  -> performs no scene, proof, transition, modal or session admission
```

## Main finding

```txt
completion timer id: absent
timeout handle retained: no
expected scene id captured: no
completion proof id captured: no
runtime session id captured: no
transition revision captured: no
modal generation captured: no
scene transition cancellation: absent
terminal route cancellation: absent
stale callback rejection: absent
typed schedule/cancel/fire result: absent
timer observation or bounded journal: absent
browser timer-order fixture: absent
```

The source passes `currentScene` through an arrow callback, so the variable is resolved when the timeout fires rather than frozen when completion is detected.

## Domains in use

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
mutable story state and raw localStorage effects
scene routing, inspection, clues, log and completion
450 ms completion delay and interlude projection
modal visibility, native focus and Continue activation
DOM narrative, hotspot-button and debug projection
Three.js renderer, target, stage and post passes
live scene replacement and procedural resource allocation
hotspot volumes, picking and camera parallax
resize, pointer, keyboard, timeout and recursive RAF callbacks
syntax checks, Pages deployment and audit tracking
```

Missing or planned authority domains include:

```txt
completion timer identity and generation
immutable completion callback context
timeout lease ownership and cancellation
scene-transition and terminal-route timer barriers
stale callback rejection
schedule, cancel and fire results
timer observations and bounded journal
browser event-loop ordering fixtures
```

## Implemented kits

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Services cover shell composition, story descriptors, mutable progression, inspection, clue and route tracking, unretained completion delay, persistence, interlude and terminal projection, scene construction, materials, picking, parallax, two-pass rendering, diagnostics, validation, deployment and audit tracking.

## Required parent domain

```txt
the-unmapped-house-completion-timer-generation-authority-domain
```

## Required transaction

```txt
SceneCompletionProof
  -> submit ScheduleInterludeCommand
  -> validate runtime session, scene, proof and transition revision
  -> allocate one timer id and timer generation
  -> freeze immutable callback context
  -> retain a cancellable timeout lease
  -> publish CompletionTimerScheduledResult

scene transition, reset, terminal route or session stop
  -> cancel or invalidate every incompatible timer lease
  -> publish CompletionTimerCancelledResult

callback fire
  -> validate timer id, generation, scene, proof, transition and modal state
  -> reject stale or cancelled work with zero mutation
  -> emit one admitted OpenInterludeCommand
  -> retire the lease exactly once
  -> publish CompletionTimerFiredResult
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T08-10-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T08-10-36-04-00.md
.agent/architecture-audit/2026-07-12T08-10-36-04-00-completion-timer-generation-dsk-map.md
.agent/render-audit/2026-07-12T08-10-36-04-00-stale-delay-interlude-visible-scene-gap.md
.agent/gameplay-audit/2026-07-12T08-10-36-04-00-complete-transition-delayed-open-loop.md
.agent/interaction-audit/2026-07-12T08-10-36-04-00-completion-schedule-cancel-fire-result-map.md
.agent/timer-system-audit/2026-07-12T08-10-36-04-00-generation-lease-transition-barrier-contract.md
.agent/deploy-audit/2026-07-12T08-10-36-04-00-completion-timer-order-fixture-gate.md
```

Do not treat a 450 ms delay as harmless presentation work. It can mutate modal and narrative state after scene, stage, route or terminal ownership has changed.