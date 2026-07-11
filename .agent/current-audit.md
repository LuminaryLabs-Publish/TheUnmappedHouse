# Current audit: The Unmapped House

Timestamp: `2026-07-11T00-00-26-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes expose three hotspots each. First inspections grant nine required clues, completion opens a delayed interlude, Continue advances the route, and the final Continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> read localStorage and shallow-merge state
  -> resolve currentScene
  -> construct StageKit
     -> allocate renderer, target, listeners and RAF
  -> load current scene descriptors
  -> render stage, post pass, story UI and debug JSON
  -> write the current state to localStorage
  -> inspect through raycast or side-panel button
     -> mutate inspected, clues and notebook log
     -> optionally schedule interlude after 450 ms
     -> render UI
     -> write localStorage
  -> Continue
     -> mutate scene and route
     -> hide interlude
     -> replace StageKit scene
     -> render UI
     -> write localStorage
  -> KeyR clears storage and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes; nine hotspots; clue requirements; camera, fog, stage, material, post and interlude descriptors. |
| `src/game.js` | Save parse/write/clear, mutable story state, inspection, completion, timer, progression, terminal copy, DOM projection, reset and StageKit calls. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, render target, post pass, descriptor consumption, picking, resize and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 aspect-frame computation and DOM projection. |

## Current persisted state

```txt
sceneId
clues[]
flags{}
inspected{sceneId -> hotspotId -> boolean}
route[]
log[]
```

Missing durable authority:

```txt
schemaVersion
storyManifestId
storySourceFingerprint
storyPhase
completionProof
pendingInterlude
interludeReadyAt
commandId
transactionId
saveRevision
stateFingerprint
persistenceAttemptId
persistenceResult
pendingTransition
terminalState
stageCommitId
stageEpoch
```

## Domains in use

```txt
browser-shell
fixed-aspect-layout
story-source-descriptors
scene-order
scene-identity
hotspot-identity
clue-identity
story-state
scene-route-state
inspection-ledger
clue-ledger
notebook-log
scene-completion-policy
interlude-timer-policy
terminal-projection
side-panel-input
raycast-input
keyboard-reset-input
localstorage-read-effect
localstorage-write-effect
localstorage-clear-effect
story-copy-projection
interlude-projection
debug-json-projection
stage-render-host
three-cdn-runtime
scene-descriptor-consumption
procedural-anime-material
post-process-pass
hotspot-volume
raycast-picking
camera-parallax
render-target-composition
stage-resource-lifecycle
scene-replacement-policy
frame-loop-authority
resize-listener-lifecycle
pointer-listener-lifecycle
hover-state-lifecycle
gpu-resource-disposal
stage-commit-identity
package-syntax-validation
static-pages-deployment
repo-local-agent-ledger
central-ledger-sync
```

## Current kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Mount stage, story panel, hotspot list, hover label, debug panel and interlude. |
| `aspect-frame-kit` | Compute and apply the canonical fixed-aspect viewport. |
| `story-data-kit` | Supply scene, hotspot, clue, stage, camera, fog, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate inspect, Continue, reset, projection, persistence and StageKit. |
| `clue-ledger-kit` | Grant unique global clue strings and evaluate requirement membership. |
| `inspection-ledger-kit` | Track scene-keyed hotspot inspection flags. |
| `notebook-log-kit` | Prepend and cap recent story entries. |
| `scene-route-kit` | Resolve the active scene and retain visited scene ids. |
| `interlude-timer-kit` | Schedule delayed interlude projection through an unretained browser timer. |
| `terminal-route-kit` | Project terminal prototype copy without persisted terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, stringify, write and clear browser state without typed results. |
| `stage-render-kit` | Own renderer, camera, scene, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors directly into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible hotspot meshes and attach descriptor objects. |
| `hotspot-picking-kit` | Perform hover/click raycasts and forward selected hotspot objects. |
| `camera-parallax-kit` | Offset the locked camera from pointer movement. |
| `render-target-composition-kit` | Render stage to a target and pass it through the post shader. |
| `debug-json-projection-kit` | Project aggregate mutable story state. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the static project from `main`. |
| `repo-local-agent-ledger-kit` | Store current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirror selection, findings and next ledge centrally. |

## Durable commit finding

`localStorage` is an untyped terminal side effect even though the player experience treats it as story authority.

`inspectHotspot()` mutates state, schedules the completion timer and renders UI before `saveState()` calls `localStorage.setItem()`. If the write throws, the timer remains scheduled and the player can see a clue or interlude that was never durably committed.

`nextScene()` mutates the scene and route, hides the interlude, replaces the StageKit scene and renders UI before saving. A write failure can leave the visible stage and in-memory route ahead of the durable save; reload returns to the previous scene.

Boot constructs StageKit, appends the canvas, installs listeners, starts RAF, loads the scene and renders UI before the initial write. A denied write can abort module evaluation after resources are acquired, with no cleanup stack or `dispose()` path.

`KeyR` clears storage without a result boundary. Clear failure prevents reset but provides no typed outcome.

## Prior findings retained

- The save has no schema, source identity or field validation.
- Completion is saved without a persisted story phase, so reload can strand a complete scene with no interlude.
- Continue has no command identity, admission policy or typed result.
- Story state mutates before StageKit success is known.
- The final terminal state is DOM-only.
- StageKit clears committed resources before replacement preparation and does not dispose retired resources.

## Next-cut domains

```txt
story-source-schema
story-manifest
story-source-fingerprint
versioned-save-envelope
save-shape-validation
save-reconciliation
story-phase-state-machine
story-command-admission
story-command-result
completion-proof
interlude-readiness
terminal-state
persistence-capability-admission
persistence-load-result
persistence-write-result
persistence-clear-result
save-revision
committed-story-snapshot
pending-story-transaction
story-persistence-commit-protocol
projection-from-commit
persistence-recovery
startup-cleanup-stack
story-stage-transition-composition
story-state-fingerprint
persistence-and-command-journal
injected-storage-fixture
browser-storage-failure-smoke
```

## Next-cut kits

```txt
story-source-schema-kit
story-manifest-kit
story-source-fingerprint-kit
versioned-save-envelope-kit
save-shape-validator-kit
save-reconciliation-kit
story-phase-state-machine-kit
story-command-kit
story-command-admission-kit
story-command-result-kit
completion-proof-kit
interlude-readiness-kit
terminal-state-kit
persistence-capability-admission-kit
persistence-load-result-kit
persistence-write-result-kit
persistence-clear-result-kit
save-revision-kit
committed-story-snapshot-kit
pending-story-transaction-kit
story-persistence-commit-protocol-kit
projection-from-commit-kit
persistence-recovery-kit
startup-cleanup-stack-kit
story-transition-transaction-kit
story-stage-transition-adapter-kit
story-state-fingerprint-kit
persistence-journal-kit
injected-storage-fixture-kit
browser-storage-failure-smoke-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Durable Story Commit Authority
+ Persistence Failure and Recovery Fixture Gate
```

The goal is to make every visible story revision attributable to a durable save revision or an explicit recoverable transaction, while preserving the current scenes, copy, pacing and visual output.