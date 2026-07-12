# Project breakdown: Completion Timer Generation Authority

**Timestamp:** `2026-07-12T08-10-36-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Scope:** documentation only

## Summary

The current story loop delays interlude opening by 450 ms after scene completion. The delay is implemented as an unretained browser timeout whose callback reads mutable `currentScene`. A scene transition or terminal projection can occur before the callback fires, after which the predecessor callback can mutate the successor modal/narrative state.

## Plan ledger

**Goal:** document the full repository and define one deterministic timer transaction that binds delayed interlude work to the exact completion proof and scene generation that scheduled it.

- [x] Compare the full `LuminaryLabs-Publish` repository inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are already tracked and root-documented.
- [x] Select only `TheUnmappedHouse` as the oldest synchronized eligible repository.
- [x] Inspect source ownership, interaction flow, domains, kits and services.
- [x] Trace timeout scheduling, callback capture, transition, terminal projection and stage replacement.
- [x] Define the missing parent domain and candidate DSK composition.
- [x] Define validation and browser fixture gates.
- [x] Modify documentation only.
- [ ] Implement and execute the authority later.

## Selection comparison

```txt
TheUnmappedHouse    2026-07-12T06-30-34-04-00 selected
AetherVale          2026-07-12T06-41-32-04-00
MyCozyIsland        2026-07-12T06-51-27-04-00
TheOpenAbove        2026-07-12T07-00-48-04-00
PrehistoricRush     2026-07-12T07-09-49-04-00
IntoTheMeadow       2026-07-12T07-19-47-04-00
PhantomCommand      2026-07-12T07-29-32-04-00
HorrorCorridor      2026-07-12T07-41-06-04-00
ZombieOrchard       2026-07-12T07-51-04-04-00
TheCavalryOfRome    excluded
```

## Product interaction loop

```txt
load persisted state
  -> choose current scene
  -> construct StageKit
  -> load descriptor-driven Three.js scene
  -> render story controls

inspect hotspot
  -> mark inspected
  -> grant clue
  -> update narrative and log
  -> derive scene completion
  -> when complete, schedule delayed interlude callback
  -> render and save

optional transition before timer fire
  -> mutate currentScene
  -> update route and log
  -> close interlude
  -> replace stage resources
  -> render and save successor

completion callback
  -> read mutable currentScene
  -> write its interlude title/text
  -> open interlude
```

## Source-backed defect

Current code:

```js
if (sceneComplete(currentScene)) {
  writeLog("The map accepts the room.");
  setTimeout(() => showInterlude(currentScene), 450);
}
```

The timeout handle is discarded. The callback closes over the mutable binding `currentScene`; it does not capture a scene id, completion proof, transition revision, modal generation or runtime session.

`nextScene()` can mutate `currentScene`, hide the interlude, call `stage.loadScene(currentScene)`, render and save before the callback executes. Neither transition nor terminal handling cancels or invalidates pending timers.

## Concrete stale-callback sequence

```txt
t=0 ms
scene A completion is detected
timer A is scheduled for t=450 ms

t=100 ms
nextScene() commits scene B
stage B becomes visible
route and persistence now cite B

t=450 ms
timer A fires
callback reads currentScene as B
showInterlude(B) opens B interlude without B completion
```

Final-scene variant:

```txt
completion timer is pending
nextScene() finds no successor
Prototype complete copy is written
pending timer fires
final scene interlude copy overwrites terminal copy
```

## Domains in use

```txt
browser shell and fixed-aspect composition
authored story and render descriptors
mutable story state and raw persistence
scene routing and progression
inspection, clues, logs and completion
completion delay scheduling
interlude and terminal projection
modal visibility and Continue input
Three.js scene construction and replacement
procedural material and post processing
hotspot picking and camera parallax
resize, pointer, keyboard, timeout and RAF callbacks
syntax validation and Pages deployment
repo-local and central audit ledgers
```

## Implemented kits and services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Fixed stage, story controls, interlude, Continue, hover and debug DOM. |
| `aspect-frame-kit` | Contained 16:9 layout calculation and application. |
| `story-data-kit` | Scene, hotspot, clue, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | State loading, inspection, completion, transitions, UI and persistence orchestration. |
| `scene-route-kit` | Current scene lookup, route mutation and successor selection. |
| `inspection-ledger-kit` | Scene-keyed hotspot inspection state. |
| `clue-ledger-kit` | Global clue grant and membership query. |
| `notebook-log-kit` | Bounded newest-first narrative log. |
| `interlude-timer-kit` | Raw 450 ms browser timeout scheduling. |
| `terminal-route-kit` | Prototype-complete copy projection. |
| `localstorage-save-kit` | Raw single-key JSON load, save and reset. |
| `stage-render-kit` | Renderer, camera, lights, target, listeners and RAF ownership. |
| `scene-descriptor-consumer-kit` | Live Three.js scene construction from descriptors. |
| `anime-material-kit` | Procedural shader material creation and time updates. |
| `post-process-kit` | Full-screen post material and effects. |
| `hotspot-volume-kit` | Invisible pick volume creation. |
| `hotspot-picking-kit` | Hover and click raycasting. |
| `camera-parallax-kit` | Pointer-derived fixed-camera offsets. |
| `render-target-composition-kit` | Stage target and final post-pass submission. |
| `debug-json-projection-kit` | Story state debug projection. |
| `package-syntax-check-kit` | Node syntax checks for four JavaScript files. |
| `static-pages-deploy-kit` | Static GitHub Pages delivery from `main`. |
| `repo-local-agent-ledger-kit` | Root and timestamped `.agent` audit routing. |
| `central-ledger-sync-kit` | Central repository ledger and change-log synchronization. |

## Required parent domain

```txt
the-unmapped-house-completion-timer-generation-authority-domain
```

## Candidate DSK composition

```txt
completion-delay-policy-kit
completion-timer-id-kit
completion-timer-generation-kit
completion-schedule-command-kit
completion-schedule-admission-kit
completion-callback-context-kit
completion-timer-lease-kit
completion-timer-cancel-kit
scene-transition-timer-barrier-kit
terminal-route-timer-barrier-kit
runtime-stop-timer-barrier-kit
stale-completion-callback-rejection-kit
completion-timer-scheduled-result-kit
completion-timer-cancelled-result-kit
completion-timer-fired-result-kit
interlude-open-intent-kit
completion-timer-observation-kit
completion-timer-journal-kit
delayed-interlude-fixture-kit
transition-before-delay-fixture-kit
terminal-before-delay-fixture-kit
browser-timer-order-smoke-kit
```

## Required invariants

```txt
one completion proof admits at most one live timer
all callback context is immutable
all timers belong to one runtime session and scene generation
transition invalidates predecessor timers before successor commit
terminal route invalidates all scene-interlude timers
cancelled or stale callbacks perform zero state or DOM mutation
each timer lease retires exactly once
timer results are detached and JSON-safe
timer journal count, byte size and age are bounded
visible interlude frame cites admitted timer and modal generations
```

## Validation boundary

Documentation only. No source, story, timer, transition, modal, render, dependency, package script or deployment behavior changed. Current syntax checks do not execute a browser event loop or prove timer cancellation and ordering.