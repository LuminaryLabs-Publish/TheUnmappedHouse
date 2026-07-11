# Current audit: The Unmapped House

Timestamp: `2026-07-11T13-49-30-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** identify the authority and fixture boundary required to make Continue an atomic transaction across completion proof, story state, stage resources, persistence, projection, and first visible frame.

- [x] Trace scene completion and interlude scheduling.
- [x] Trace Continue through scene selection, route mutation, stage replacement, DOM projection, and save.
- [x] Trace terminal behavior when no successor scene exists.
- [x] Trace stage clearing, material/geometry ownership, and first-frame submission.
- [x] Inventory all domains, kits, and services.
- [x] Define Continue admission, detached preparation, atomic commit, rollback, retirement, result, journal, and fixture kits.
- [ ] Implement prerequisite manifest, persistence, and completion-proof authority.
- [ ] Implement and run transition failure, rollback, duplicate, and first-frame fixtures.

## Interaction loop

```txt
boot
  -> shallow-load raw state
  -> select current scene
  -> construct StageKit
  -> load current scene directly into live stage
  -> project UI and write state

completion
  -> derive from global clue strings
  -> schedule anonymous 450 ms timeout
  -> timeout reads mutable currentScene when it fires
  -> open interlude without proof identity

Continue click
  -> call nextScene directly
  -> find successor from mutable currentScene
  -> mutate currentScene and state.sceneId
  -> append route and log
  -> hide interlude
  -> StageKit.loadScene(successor)
  -> render UI
  -> write raw localStorage state
  -> next RAF eventually renders successor
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side-panel, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Scene order, hotspots, clue requirements, stage descriptors, camera, materials, post settings, and interlude copy. |
| `src/game.js` | Mutable story state, completion, timeout scheduling, Continue, terminal copy, UI projection, and persistence. |
| `src/stage-kit.js` | Live stage replacement, Three.js resource construction, hotspot meshes, input, camera parallax, and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and browser fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
story and scene descriptors
mutable story state and scene route
scene-keyed inspection and global clue state
completion and interlude timing
Continue and terminal routing
localStorage effects
DOM and debug projection
Three.js runtime and renderer
live stage-group replacement
scene geometry, material, hotspot, camera, fog, and post resources
raycast input and pointer parallax
render-target composition and recursive RAF
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
versioned StoryManifest and canonical indexes
versioned StorySnapshot and typed persistence
scene-completion proof and proof consumption
Continue command identity and sequence
transition admission and duplicate guard
transition id and revision fences
successor story candidate
successor stage detached preparation
stage preparation result
atomic story/stage/persistence commit
transition rollback and recovery
stage epoch and resource inventory
predecessor resource retirement
first-successor-frame acknowledgement
transition result and bounded journal
terminal phase persistence
runtime session lifecycle
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, render target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: Continue is a partial mutation sequence

### No admission or proof consumption

`continueButton` always calls `nextScene()`. The function does not require a completion proof, expected story revision, stage epoch, command id, sequence, or transition lock. A duplicate or programmatic Continue can advance more than once.

### Story mutates before stage preparation

`nextScene()` replaces `currentScene`, writes `state.sceneId`, appends route/log state, and hides the interlude before `stage.loadScene()` returns. There is no candidate state or rollback snapshot.

### Stage replacement is destructive and incremental

`StageKit.loadScene()` assigns the successor descriptor, clears the live group, resets hotspot/material arrays, then creates layers, props, and hotspots directly in the active group. A construction failure can leave a partial successor while story state already names that successor.

### Persistence happens last

The raw `localStorage.setItem()` occurs after story mutation, stage replacement, and DOM projection. A storage exception can leave the visible successor live while the persisted snapshot remains on the predecessor.

### No visible-frame proof

`loadScene()` returns no stage epoch or preparation/commit receipt. The recursive RAF is independent of transition identity. Continue cannot prove which story revision, stage resource set, camera, hotspots, or post settings produced the first visible successor frame.

### Terminal state is projection-only

When no successor exists, `nextScene()` changes only interlude copy. It does not persist an explicit terminal phase, proof consumption, or terminal transition result.

## Required parent domain

```txt
the-unmapped-house-atomic-continue-transition-authority-domain
```

Candidate kits:

```txt
continue-command-envelope-kit
continue-admission-kit
completion-proof-consumption-kit
scene-transition-id-kit
scene-transition-plan-kit
successor-story-candidate-kit
detached-stage-preparation-kit
stage-preparation-result-kit
transition-persistence-kit
atomic-story-stage-commit-kit
transition-rollback-kit
stage-epoch-kit
predecessor-resource-retirement-kit
first-successor-frame-ack-kit
transition-result-kit
transition-journal-kit
continue-transition-fixture-kit
browser-transition-failure-smoke-kit
```

## Required command and result contract

```txt
ContinueCommand
  commandId
  inputSequence
  source
  sceneId
  completionProofId
  expectedStoryRevision
  expectedStageEpoch

ContinueResult
  status: committed | duplicate | incomplete | stale_scene |
          stale_story_revision | stale_stage_epoch | proof_consumed |
          prepare_failed | persistence_failed | commit_failed | rolled_back |
          terminal_committed
  commandId
  transitionId
  predecessorSceneId
  successorSceneId?
  storyRevisionBefore
  storyRevisionAfter?
  predecessorStageEpoch
  successorStageEpoch?
  completionProofId
  firstVisibleFrameId?
  retiredResourceReceiptId?
  rollbackResult?
```

## Required authority flow

```txt
Continue observation
  -> construct ContinueCommand
  -> admit session, scene, proof, story revision, stage epoch, and sequence
  -> reserve proof and transition id
  -> build successor StorySnapshot candidate
  -> prepare successor stage in detached ownership
  -> validate stage preparation result
  -> persist candidate snapshot with typed result
  -> atomically publish story and stage commit
  -> advance stage epoch and story revision
  -> acknowledge first visible successor frame
  -> retire predecessor resources
  -> consume proof and publish immutable result/journal row

any failure before commit
  -> keep predecessor story, stage, DOM, and persistence authoritative
  -> dispose detached successor resources
  -> release proof reservation
  -> publish typed failed or rolled-back result
```

## Ordered implementation queue

```txt
1. StoryManifest schema, indexes, validation, and fingerprint
2. StorySnapshot schema, migration, reconciliation, and persistence results
3. InspectionCommand, receipts, clue provenance, and completion proof
4. Atomic Continue transition and first-visible-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Atomic Continue Transition Authority
+ Rollback, Resource Retirement, and First-Successor-Frame Fixture Gate
```