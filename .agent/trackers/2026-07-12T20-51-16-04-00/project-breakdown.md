# Project breakdown: The Unmapped House

**Timestamp:** `2026-07-12T20-51-16-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Selection:** oldest eligible centrally tracked repository  
**Audit:** scene progression and interlude authority

## Summary

The project is a static three-scene point-and-click horror slice. Its story facts are persisted, but the transition phase is implicit in a timer and DOM classes. Continue can bypass completion, stale callbacks can target the wrong scene, and reload can lose the visible continuation path.

## Plan ledger

**Goal:** record the full interaction loop, domain map, kit/service census and the exact missing authority for one repository only.

- [x] Compare the complete Publish repository list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse`.
- [x] Read the browser shell, story runtime, styles, descriptors, StageKit, checks and deployment.
- [x] Identify all interaction loops and domains.
- [x] Identify all 24 implemented kits and their services.
- [x] Define the next DSK composition and fixture gates.
- [x] Update the root `.agent` entrypoints and machine registry.
- [ ] Implement the runtime authority.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T19-11-01-04-00 selected
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
IntoTheMeadow      2026-07-12T19-49-41-04-00
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
ZombieOrchard      2026-07-12T20-31-27-04-00
MyCozyIsland       2026-07-12T20-40-56-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
boot
  -> state parse/merge
  -> current scene resolution
  -> StageKit construction and scene load
  -> UI/Notebook projection
  -> save

inspect
  -> canvas raycast or DOM button
  -> inspection/clue/log mutation
  -> completion evaluation
  -> optional delayed interlude scheduling
  -> UI projection and save

interlude
  -> delayed callback opens overlay
  -> no phase commit or focus transfer

Continue
  -> no admission check
  -> route/scene mutation
  -> StageKit scene replacement
  -> save

terminal
  -> DOM copy only
  -> no durable terminal state
```

## Domains in use

```txt
application shell
aspect composition
story manifest descriptors
browser snapshot persistence
inspection and clue progression
scene completion
completion timing
interlude presentation
scene routing and terminal projection
DOM pointer and keyboard interaction
focus and modal behavior
Three.js scene presentation
hotspot picking
camera parallax
procedural materials
post-processing
browser callback lifetime
syntax checking
Pages deployment
audit tracking
```

## Implemented kit and service inventory

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Mount the stage, story panel, hotspot list, Notebook, hover label and interlude surfaces. |
| `aspect-frame-kit` | Compute and apply the fixed 1920 × 1080 design frame. |
| `story-data-kit` | Provide three scenes, nine hotspots, clue grants, completion rules, camera, material and post settings. |
| `browser-story-runtime-kit` | Boot state, resolve a scene, inspect, complete, continue, reset, project UI and persist. |
| `scene-route-kit` | Resolve scene IDs and advance through authored array order. |
| `inspection-ledger-kit` | Track scene-keyed inspected hotspot booleans. |
| `clue-ledger-kit` | Grant and query clue identifiers. |
| `notebook-log-kit` | Prepend and cap narrative log rows. |
| `interlude-timer-kit` | Schedule the delayed completion interlude through `setTimeout`. |
| `terminal-route-kit` | Project prototype-complete terminal copy into the interlude. |
| `localstorage-save-kit` | Parse, shallow-merge, write and delete one browser save key. |
| `stage-render-kit` | Create the Three.js renderer, scene, camera, lights, target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into camera state, geometry, materials, hotspot volumes and post settings. |
| `anime-material-kit` | Allocate procedural shader materials and update time uniforms. |
| `post-process-kit` | Apply grain, vignette, chromatic shift, distortion and scan-line effects. |
| `hotspot-volume-kit` | Allocate invisible raycast volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Normalize pointer input, raycast and dispatch a hotspot. |
| `camera-parallax-kit` | Apply pointer-driven locked-camera offsets. |
| `render-target-composition-kit` | Render the stage to an offscreen target and the post pass to the canvas. |
| `debug-json-projection-kit` | Serialize story aggregate fields into the visible Notebook. |
| `package-syntax-check-kit` | Run Node syntax checks over the four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the repository root to GitHub Pages after pushes to `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Mirror selection, findings and history into the central ledger. |

## Current counts

```txt
authored scenes: 3
authored hotspots: 9
authored layers: 6
authored props: 13
implemented kit surfaces: 24
planned progression authority kits: 30
explicit scene phases: 0
owned completion timer leases: 0
typed Continue results: 0
visible progression acknowledgements: 0
```

## Main findings

```txt
hidden Continue is still keyboard-reachable
Continue does not require completion or an open interlude
completion callback is not bound to predecessor identity/revision
complete scene reload does not restore the interlude
open interlude does not own focus or background inertness
terminal state is not persisted
```

## Required domain

```txt
the-unmapped-house-scene-progression-interlude-authority-domain
```

## Candidate services

```txt
story-run-id-kit
story-run-generation-kit
scene-phase-kit
scene-revision-kit
completion-candidate-kit
completion-result-kit
completion-timer-lease-kit
stale-completion-callback-rejection-kit
interlude-open-command-kit
interlude-open-result-kit
continue-command-kit
continue-admission-kit
exact-once-scene-advance-kit
route-revision-kit
interlude-focus-lease-kit
modal-inertness-kit
gameplay-input-context-kit
persisted-progression-phase-kit
startup-phase-reconciliation-kit
terminal-outcome-kit
scene-transition-result-kit
first-visible-interlude-frame-ack-kit
first-visible-successor-frame-ack-kit
progression-observation-kit
progression-journal-kit
keyboard-hidden-control-fixture-kit
reload-after-completion-fixture-kit
stale-timer-transition-fixture-kit
browser-progression-smoke-kit
pages-progression-smoke-kit
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T20-51-16-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T20-51-16-04-00.md
.agent/architecture-audit/2026-07-12T20-51-16-04-00-scene-progression-interlude-dsk-map.md
.agent/render-audit/2026-07-12T20-51-16-04-00-interlude-phase-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T20-51-16-04-00-completion-continue-reload-loop.md
.agent/interaction-audit/2026-07-12T20-51-16-04-00-hidden-continue-focus-admission-map.md
.agent/progression-audit/2026-07-12T20-51-16-04-00-completion-timer-phase-persistence-contract.md
.agent/deploy-audit/2026-07-12T20-51-16-04-00-progression-fixture-gate.md
```

## Validation boundary

This run changes documentation only. It does not claim runtime correction, accessibility compliance, exact-once transition behavior or deployed progression readiness.
