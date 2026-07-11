# Current audit: The Unmapped House

Timestamp: `2026-07-10T22-21-17-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype. Three authored scenes expose three hotspots each. First inspections grant nine required clues, completion opens a delayed interlude, Continue advances the route, and the final Continue projects a prototype-complete message.

## Current interaction loop

```txt
open index.html
  -> import src/game.js
  -> parse localStorage and shallow-merge state
  -> resolve currentScene
  -> construct StageKit and load the scene
  -> render stage to target and post-process to canvas
  -> inspect by raycast or side-panel button
  -> mutate inspected/clues/log
  -> evaluate completion from global clue membership
  -> save completed state
  -> schedule interlude after 450 ms
  -> Continue mutates sceneId/route and loads the next scene
  -> final Continue changes interlude copy only
  -> KeyR clears storage and reloads
```

## Source and runtime ownership

| Source | Current responsibilities |
|---|---|
| `src/story-data.js` | Three scenes; nine hotspots; clue requirements; camera, fog, stage, material, post and interlude descriptors. |
| `src/game.js` | Save parse/write, mutable story state, inspection, completion, timer, progression, terminal copy, DOM projection, reset and StageKit calls. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, render target, post pass, descriptor consumption, picking, resize and RAF. |
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

Missing persisted authority:

```txt
schemaVersion
storyManifestId
storySourceFingerprint
storyPhase
completionProof
pendingInterlude
interludeReadyAt
transitionRequestId
terminalState
stateFingerprint
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
localstorage-persistence
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
| `browser-story-runtime-kit` | Coordinate inspect, continue, reset, projection, persistence and StageKit. |
| `clue-ledger-kit` | Grant unique global clue strings and evaluate requirement membership. |
| `inspection-ledger-kit` | Track scene-keyed hotspot inspection flags. |
| `notebook-log-kit` | Prepend and cap recent story entries. |
| `scene-route-kit` | Resolve the active scene and retain visited scene ids. |
| `interlude-timer-kit` | Schedule delayed interlude projection through an unretained browser timer. |
| `terminal-route-kit` | Project terminal prototype copy without persisted terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write and clear browser state. |
| `stage-render-kit` | Own renderer, camera, scene, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors directly into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Build invisible hotspot meshes and attach descriptor objects. |
| `hotspot-picking-kit` | Perform hover/click raycasts and forward selected hotspot objects. |
| `camera-parallax-kit` | Offset the locked camera from pointer movement. |
| `render-target-composition-kit` | Render stage to a target and pass it through the post shader. |
| `debug-json-projection-kit` | Project aggregate story state. |
| `package-syntax-check-kit` | Syntax-check the four JavaScript sources. |
| `static-pages-deploy-kit` | Publish the static project from `main`. |
| `repo-local-agent-ledger-kit` | Store current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Mirror selection, findings and next ledge centrally. |

## Resume failure finding

`inspectHotspot()` writes the final clue, marks the hotspot inspected, renders the UI and persists the completed state. `showInterlude()` is not part of that state transaction; it is scheduled 450 ms later and only changes DOM classes and text.

A reload after the final clue restores a complete scene with every required hotspot already seen, but the interlude is hidden. Re-inspecting any hotspot enters the already-seen branch and does not schedule the interlude. The route is therefore stuck even though the save says the scene is complete.

## Save reconciliation finding

`loadState()` shallow-merges arbitrary parsed JSON over the initial state. It does not validate field types, scene ids, hotspot ids, route order, clue ownership or source compatibility. Corrupt arrays can make `includes`, `unshift` or `slice` fail. Future-scene clue strings can satisfy an earlier scene because completion reads one global clue set.

## Transition transaction finding

`nextScene()` mutates `currentScene`, `state.sceneId`, `state.route` and interlude visibility before `stage.loadScene()` completes. It returns no accepted/rejected/failed result and has no request identity, source fingerprint, previous/next state fingerprints or stage commit correlation.

The final route has no persisted terminal phase. The terminal message is DOM-only and disappears on reload.

## Render-host companion finding

The prior audit remains valid: `StageKit.loadScene()` clears the live group before replacement preparation, does not dispose retired resources, and returns no stage epoch or typed commit result. Story transition authority and stage commit authority must compose through explicit results rather than direct mutation.

## Next-cut domains

```txt
story-source-schema
story-manifest
story-source-fingerprint
versioned-save-envelope
save-shape-validation
save-reconciliation
scene-scoped-clue-derivation
story-phase-state-machine
story-command-admission
story-command-result
completion-proof
interlude-readiness
resume-projection
terminal-state
story-transition-transaction
story-stage-transition-composition
story-state-fingerprint
story-command-result-event-journal
headless-resume-fixture
browser-route-resume-smoke
```

## Next-cut kits

```txt
story-source-schema-kit
story-manifest-kit
story-source-fingerprint-kit
versioned-save-envelope-kit
save-shape-validator-kit
save-reconciliation-kit
scene-clue-derivation-kit
story-phase-state-machine-kit
story-command-kit
story-command-admission-kit
story-command-result-kit
completion-proof-kit
interlude-readiness-kit
resume-projection-kit
terminal-state-kit
story-transition-transaction-kit
story-stage-transition-adapter-kit
story-state-fingerprint-kit
story-journal-kit
headless-resume-fixture-kit
browser-route-resume-smoke-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Resume-Safe Story Phase Authority + Transition Fixture Gate
```

The goal is to make every persisted state resumable and every inspect/continue transition explicit, deterministic and observable while preserving the current scenes, copy, pacing and visual output.
