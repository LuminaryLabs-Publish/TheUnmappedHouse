# Project breakdown: The Unmapped House terminal completion settlement and resume

**Timestamp:** `2026-07-14T06-00-41-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Scope:** documentation only

## Summary

The final scene can become complete, but completion is represented only by transient interlude DOM text. No terminal outcome is added to story state or durably committed. After reload, the final scene remains complete while the interlude is hidden, and re-reading an inspected hotspot returns before completion is reconsidered. The player can therefore lose the only visible completion path and remain stranded in an already-complete scene.

## Plan ledger

**Goal:** make final-scene completion one durable, idempotent outcome transaction that can be resumed and visibly proven after reload.

- [x] Compare all 11 current Publish repositories with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible repositories are centrally tracked and root-documented.
- [x] Select only `TheUnmappedHouse` by the oldest eligible documented timestamp.
- [x] Trace final-clue admission, delayed interlude, Continue, terminal projection, save, reload and re-inspection.
- [x] Identify all domains, kits and offered services.
- [x] Preserve the 24 implemented kit surfaces.
- [x] Define a terminal completion settlement and resume authority.
- [x] Add this timestamped tracker and audit family.
- [ ] Implement runtime outcome settlement and executable fixtures.

## Complete interaction loop

```txt
boot
  -> load saved story fields
  -> resolve currentScene
  -> create StageKit and UI
  -> load scene and render hotspot controls

normal inspection
  -> canvas raycast or DOM button
  -> inspectHotspot(hotspot)
  -> update inspected, clues and Notebook
  -> save state

final completion
  -> final required clue is granted
  -> sceneComplete(finalScene) becomes true
  -> setTimeout(showInterlude(currentScene), 450)
  -> terminal interlude becomes visible
  -> player presses Continue
  -> nextScene() finds no successor
  -> only interlude title and text are replaced
  -> no outcome state, revision or durable commit is created

reload after completion
  -> saved sceneId, clues and inspected fields restore
  -> final scene is complete
  -> interlude starts hidden
  -> re-reading an inspected hotspot returns before completion handling
  -> no route reopens terminal presentation
  -> player remains in the completed final scene
```

## Domains in use

```txt
browser document, history and page lifecycle
fixed-aspect viewport shell
story manifest and authored scene order
story state, clue and inspection ledgers
scene completion predicates
interlude scheduling and presentation
terminal outcome classification and settlement
localStorage read, write and reset
DOM and canvas interaction
Three.js scene and post-processing presentation
hotspot volumes, picking and dispatch
camera parallax and RAF submission
terminal resume and visible-frame evidence
syntax validation and Pages deployment
repo-local and central audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage mount, story panel, hotspot list, Notebook, hover label and interlude. |
| `aspect-frame-kit` | Fixed design aspect, window-fit calculation and DOM frame placement. |
| `story-data-kit` | Scene descriptors, hotspots, clue grants, completion rules, cameras, materials and post descriptors. |
| `browser-story-runtime-kit` | State boot, scene resolution, inspection, continue, reset, UI projection and persistence calls. |
| `scene-route-kit` | Scene ID resolution and authored-order advancement. |
| `inspection-ledger-kit` | Scene-keyed inspected-hotspot state. |
| `clue-ledger-kit` | Clue grant and query. |
| `notebook-log-kit` | Narrative log mutation and bounded retention. |
| `interlude-timer-kit` | Delayed completion interlude scheduling. |
| `terminal-route-kit` | Prototype-complete DOM projection. |
| `localstorage-save-kit` | Parse, shallow merge, replace and delete save. |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF. |
| `scene-descriptor-consumer-kit` | Camera, geometry, material, hotspot and post construction. |
| `anime-material-kit` | Procedural shader materials and time updates. |
| `post-process-kit` | Grain, vignette, chromatic shift, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible raycast volumes and descriptor attachment. |
| `hotspot-picking-kit` | Coordinate normalization, raycast and hotspot dispatch. |
| `camera-parallax-kit` | Pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Offscreen stage pass, post pass and target sizing. |
| `debug-json-projection-kit` | Story-field serialization and Notebook projection. |
| `package-syntax-check-kit` | Node syntax checks. |
| `static-pages-deploy-kit` | Static Pages delivery from `main`. |
| `repo-local-agent-ledger-kit` | Root pointers and timestamped audit records. |
| `central-ledger-sync-kit` | Central selection and findings mirror. |

```txt
implemented source-backed kit surfaces: 24
planned terminal outcome coordinating surfaces: 20
```

## Concrete findings

1. `nextScene()` treats the absence of a successor as a DOM copy change, not a state transition.
2. No `outcome`, `completed`, `completionRevision`, `settledAt` or equivalent field exists in the persisted state.
3. Terminal presentation is not reconstructed during boot from final-scene completion.
4. The inspected-hotspot early return prevents completion handling from reopening after reload.
5. Continue remains a live generic command after terminal copy is shown.
6. No durable commit/readback result distinguishes visible completion from saved completion.
7. No first terminal frame acknowledgement correlates outcome, scene, save and visible interlude revisions.
8. `npm run check` is syntax-only and cannot execute the completion/reload loop.

## Required authority

```txt
the-unmapped-house-terminal-completion-settlement-resume-authority-domain
```

```txt
TerminalCompletionCommand
  -> bind StoryManifestRevision, StoryStateRevision and FinalSceneId
  -> validate final-scene completion and reject premature or duplicate commands
  -> prepare one immutable TerminalOutcomeCandidate
  -> atomically settle outcome, route, Notebook and interaction state
  -> stage and verify a versioned durable save generation
  -> publish TerminalOutcomeSettlementResult
  -> project terminal presentation from accepted outcome state
  -> admit reload through TerminalResumeCommand
  -> disable or replace generic Continue with authored terminal commands
  -> publish FirstTerminalOutcomeFrameAck
```

## Planned coordinating kits

```txt
the-unmapped-house-terminal-completion-settlement-resume-authority-domain
story-outcome-manifest-kit
terminal-outcome-identity-kit
final-scene-completion-admission-kit
terminal-completion-command-kit
terminal-outcome-candidate-kit
terminal-outcome-settlement-kit
terminal-outcome-idempotency-kit
terminal-outcome-save-schema-kit
durable-outcome-commit-kit
outcome-readback-verification-kit
terminal-resume-admission-kit
terminal-presentation-projection-kit
terminal-interaction-admission-kit
terminal-command-manifest-kit
terminal-restart-reset-kit
terminal-outcome-diagnostics-kit
first-terminal-outcome-frame-ack-kit
terminal-outcome-fixture-matrix-kit
terminal-source-build-pages-parity-kit
```

## Validation boundary

Runtime JavaScript, HTML, CSS, story descriptors, persistence behavior, rendering, package scripts, dependencies and deployment were not changed. No browser or Pages fixture was run.