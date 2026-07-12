# Current audit: The Unmapped House

**Timestamp:** `2026-07-12T08-10-36-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The current audit isolates the completion-to-interlude delay in `src/game.js`. When the last required clue is granted, `inspectHotspot()` calls `setTimeout(() => showInterlude(currentScene), 450)`. The timeout handle is discarded, and the callback references the mutable module variable `currentScene`. `nextScene()` can change that variable, replace stage resources, hide the interlude and save the successor before the timeout fires. The callback then opens whichever scene is current at fire time without validating the scene or completion proof that admitted the delay.

## Plan ledger

**Goal:** define one authoritative delayed-interlude transaction from scene completion through timer scheduling, cancellation, callback admission, modal opening and visible projection.

- [x] Compare the full Publish inventory against central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` from the oldest synchronized eligible timestamp.
- [x] Inspect `src/game.js`, `src/story-data.js`, `src/stage-kit.js`, package checks and prior lifecycle/modal boundaries.
- [x] Trace completion, timer scheduling, scene transition, terminal copy and delayed interlude projection.
- [x] Confirm the timeout handle and immutable callback context are absent.
- [x] Confirm transitions and terminal handling do not cancel or fence pending callbacks.
- [x] Inventory all active domains, all 24 implemented kits and offered services.
- [x] Define timer generation, lease, callback context, barriers, results, observation and fixture kits.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

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

## Product and interaction loop

```txt
module boot
  -> load raw localStorage snapshot
  -> resolve currentScene from mutable state
  -> construct StageKit
  -> load the scene, project UI and save

inspection
  -> canvas or side-panel activation calls inspectHotspot()
  -> mutate inspected map, clues, log and narrative
  -> if the scene is complete, schedule one 450 ms timeout
  -> timeout handle is not retained
  -> callback context is not frozen
  -> render UI and persist state

transition during delay
  -> Continue or another caller invokes nextScene()
  -> currentScene changes
  -> interlude is hidden
  -> StageKit replaces live scene resources
  -> successor state is rendered and saved

callback fire
  -> arrow callback resolves mutable currentScene
  -> showInterlude() writes that scene's copy
  -> interlude opens without scene/proof/timer/transition admission
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, story panel, mounted interlude and Continue control. |
| `src/styles.css` | Interlude appearance and pointer routing. |
| `src/game.js` | Mutable story state, completion test, unretained timeout, interlude projection, transition, terminal copy and persistence. |
| `src/story-data.js` | Three scenes, nine hotspots, nine required clues and interlude descriptors. |
| `src/stage-kit.js` | Three.js resource graph, scene replacement, pointer input, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920 by 1080 composition. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect composition
authored story, scene, hotspot and render descriptors
raw localStorage read, write and reset effects
mutable story snapshot ownership
scene route, inspection, clue, flags and log
scene-completion derivation
unretained 450 ms completion timeout
interlude and terminal narrative projection
modal visibility, native focus and Continue activation
Three.js CDN runtime
WebGL renderer, target, scene, camera, lights and post composition
live scene replacement and procedural resource allocation
hotspot volumes, raycasting and camera parallax
resize, input, timeout and recursive RAF callbacks
syntax validation, Pages deployment and audit tracking
```

Missing authority domains:

```txt
completion timer identity and generation
completion schedule command admission
immutable callback context
timeout lease ownership
scene-transition timer barrier
terminal-route timer barrier
session-stop timer barrier
stale callback rejection
typed schedule, cancel and fire results
timer observations and bounded journal
event-loop ordering fixture gate
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, mounted interlude and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspection, completion, Continue, reset-by-reload, projection, persistence and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule an unretained 450 ms callback against mutable `currentScene`. |
| `terminal-route-kit` | Write terminal copy without durable terminal state or timer barrier. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Allocate procedural shader materials and advance time uniforms. |
| `post-process-kit` | Allocate and render grain, vignette, chromatic, distortion, memory and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the notebook panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding

### The completion delay has no identity or owner

`setTimeout()` returns a handle, but the source does not retain it. There is no timer id, generation, expected scene id, completion-proof id, runtime session id or transition revision.

### The callback reads mutable scene state

The callback is `() => showInterlude(currentScene)`. JavaScript closes over the binding, so `currentScene` is read when the callback runs. It is not a frozen reference to the scene that completed.

### Scene transition does not fence the callback

`nextScene()` mutates `currentScene`, hides the interlude, calls `stage.loadScene(currentScene)`, renders UI and saves. It does not cancel or invalidate a pending completion timeout.

### Reachable stale projection

```txt
complete scene A
  -> timer A scheduled for +450 ms
  -> before fire, transition to scene B
  -> currentScene becomes B
  -> stage B and story B are committed
  -> timer A fires
  -> callback resolves currentScene as B
  -> B interlude opens without B completion
```

The currently documented hidden Continue path makes the race source-reachable. The timer defect remains independently relevant because future programmatic transitions, restart flows or modal fixes also require explicit callback ownership.

### Terminal copy can be overwritten

On the final scene, `nextScene()` writes `Prototype complete` copy but does not establish a terminal state or cancel pending timers. A delayed callback can subsequently rewrite the interlude title and text with the final scene's normal interlude copy.

## Required parent domain

```txt
the-unmapped-house-completion-timer-generation-authority-domain
```

Candidate kits:

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

## Required transaction

```txt
SceneCompletionProof
  -> create ScheduleInterludeCommand
  -> validate runtime session, scene, proof and transition revision
  -> allocate timer id and generation
  -> freeze callback context
  -> retain timeout lease
  -> publish CompletionTimerScheduledResult

transition, terminal route, reset or stop
  -> enumerate incompatible live timer leases
  -> cancel or invalidate them
  -> publish one cancellation result per lease or aggregate result

callback fire
  -> admit by timer id and generation
  -> validate frozen scene, proof, transition, modal and runtime identities
  -> reject stale or cancelled callbacks with zero mutation
  -> submit one OpenInterludeCommand
  -> retire lease exactly once
  -> publish CompletionTimerFiredResult
```

## Ordered implementation queue

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
3. Pointer and Hotspot-Pick Authority
4. Inspection and Completion Authority
4a. Completion Timer Generation Authority
4b. Modal Focus and Continue Admission Authority
5. Atomic Continue Transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
```

## Validation boundary

Documentation only. Runtime source, story content, timer behavior, modal behavior, transitions, rendering, package scripts, dependencies and deployment were not changed. No current executable fixture proves timer identity, cancellation, stale callback rejection, transition barriers, terminal-copy stability or event-loop ordering.