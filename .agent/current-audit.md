# Current audit: The Unmapped House

Timestamp: `2026-07-11T12-08-47-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** identify the exact authority and fixture boundary required to turn side-panel and raycast observations into canonical, scene-scoped, revision-fenced inspection transactions and explicit completion proof.

- [x] Trace side-panel button creation and callback capture.
- [x] Trace StageKit hotspot-volume creation, raycast selection, and callback dispatch.
- [x] Trace inspection, duplicate handling, clue grants, notebook mutation, completion, timeout scheduling, UI projection, and persistence.
- [x] Trace stale-descriptor behavior across scene transitions.
- [x] Inventory all current domains, kits, and services.
- [x] Define inspection-command, canonical resolution, completion-proof, journal, and fixture kits.
- [ ] Implement StoryManifest admission and inspection authority.
- [ ] Run deterministic Node and browser parity fixtures.

## Interaction loop

```txt
module boot
  -> shallow-load mutable story state
  -> resolve current scene
  -> construct StageKit and current scene hotspot meshes
  -> render side-panel buttons from current scene descriptors

side-panel path
  -> button closure captures a full hotspot descriptor
  -> click calls inspectHotspot(descriptor)

raycast path
  -> invisible mesh stores a full hotspot descriptor in userData
  -> click raycasts current hotspot meshes
  -> StageKit calls inspectHotspot(descriptor)

inspection mutation
  -> select inspection ledger using currentScene.id at callback time
  -> trust caller-supplied hotspot.id, grants, label, text, and changesText
  -> mark inspection or treat duplicate as a re-read
  -> grant global clue strings
  -> derive scene completion from global clue strings
  -> schedule an unretained 450 ms interlude callback
  -> mutate DOM, notebook, debug projection, and localStorage
  -> return no command receipt or typed result
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, hotspot list, hover label, debug panel, interlude, and Continue controls. |
| `src/story-data.js` | Three scene descriptors, nine hotspot descriptors, clue grants, completion requirements, stage, camera, material, post, and copy data. |
| `src/game.js` | Mutable story state, side-panel ingress, inspection mutation, clue grants, completion, timeout scheduling, DOM projection, persistence, Continue, and reset. |
| `src/stage-kit.js` | Hotspot-volume construction, descriptor storage in `userData`, hover/click raycasts, callback dispatch, camera parallax, and rendering. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and browser fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell
fixed-aspect layout
story source descriptors
scene order and identity
hotspot identity and descriptor payloads
clue identity and global clue ledger
mutable story state
scene-keyed inspection ledger
notebook log
scene completion policy
implicit story phase
side-panel input
raycast input
hotspot volume and pick observation
inspection mutation
duplicate inspection and re-read behavior
completion timeout and interlude projection
Continue and terminal routing
localStorage load/write/clear effects
story, hover, interlude, and debug projection
Three.js CDN runtime
stage rendering and scene descriptor consumption
anime shader materials and post-processing
camera parallax and render-target composition
runtime callbacks and scene resources
syntax validation and Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
versioned StoryManifest and canonical indexes
versioned StorySnapshot and persistence admission
inspection command identity and sequence
scene/story/stage revision admission
canonical hotspot resolution
pick observation separate from mutation command
scene-scoped clue provenance
exactly-once inspection transaction
scene completion proof identity
completion-proof consumption and duplicate guard
typed inspection and no-op results
bounded inspection journal
dual-ingress parity validation
stale descriptor and stale callback rejection
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 viewport. |
| `story-data-kit` | Scene, hotspot, clue, camera, fog, stage, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and StageKit calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot-id booleans. |
| `clue-ledger-kit` | Grant and query global clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the unretained 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy without durable terminal state. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear raw browser state without typed results. |
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert scene descriptors into live Three.js resources. |
| `anime-material-kit` | Build FBM/toon shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach full hotspot descriptors to `userData`. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch the selected descriptor. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project current scene, clues, route, inspection flags, completion, and log rows. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: observation payloads are treated as mutation authority

### Full descriptor ingress

The side-panel closure and raycast mesh both pass the complete hotspot descriptor to `inspectHotspot()`. The mutation function does not resolve `sceneId + hotspotId` through a canonical manifest. It trusts the incoming descriptor's id, grants, label, text, and log copy.

### Current-scene rebinding

`inspectHotspot()` does not receive or validate a scene id. It reads `currentScene.id` when the callback executes. A stale scene-one descriptor invoked after Continue can therefore be recorded in scene two's inspection ledger while granting scene-one clues and projecting scene-one copy.

### Global clue completion

Completion is `requiresToComplete.every(hasClue)`, where `hasClue` searches the global clue-string array. It does not prove which accepted inspection granted each clue, which story revision produced it, or whether the clue belongs to the current scene. Loaded or forged clue strings can satisfy completion independently of canonical inspection receipts.

### Duplicate and scheduling behavior

A duplicate inspection still mutates text, log, UI, and persistence but returns no typed `duplicate` or `re_read` result. A newly accepted descriptor after completion schedules another interlude timeout because there is no completion-proof id or exactly-once consumption guard.

### No result or journal

Inspection returns `undefined`. Callers cannot distinguish applied, duplicate, stale scene, stale story revision, stale stage epoch, unknown hotspot, persistence failure, or completion produced. Debug output shows aggregate mutable state but no command/result correlation.

## Required parent domain

```txt
the-unmapped-house-inspection-completion-authority-domain
```

Candidate kits:

```txt
hotspot-manifest-index-kit
inspection-command-envelope-kit
inspection-command-admission-kit
hotspot-pick-observation-kit
canonical-hotspot-resolution-kit
inspection-result-kit
scene-scoped-inspection-ledger-kit
scene-scoped-clue-grant-kit
scene-completion-proof-kit
completion-proof-consumption-kit
inspection-transaction-kit
inspection-journal-kit
inspection-authority-fixture-kit
browser-dual-ingress-parity-smoke-kit
```

## Required command and result contract

```txt
InspectionCommand
  commandId
  inputSequence
  source: side-panel | raycast | replay | automation
  sceneId
  hotspotId
  expectedStoryRevision
  expectedStageEpoch
  observedFrameId?

InspectionResult
  status: applied | duplicate | stale_scene | stale_story_revision |
          stale_stage_epoch | unknown_hotspot | rejected | failed
  commandId
  sceneId
  hotspotId
  storyRevisionBefore
  storyRevisionAfter
  grantedClues[]
  inspectionReceiptId?
  completionProofId?
  completionProduced
  persistenceResult?
```

## Required authority flow

```txt
input observation
  -> construct id-only InspectionCommand
  -> admit session, scene, story revision, stage epoch, and sequence
  -> resolve canonical hotspot from StoryManifest index
  -> reject stale, unknown, or cross-scene commands
  -> detect exact duplicate without mutation
  -> apply one inspection receipt
  -> grant canonical scene-owned clues exactly once
  -> derive scene completion from accepted receipts
  -> create one immutable completion proof
  -> commit StorySnapshot and persistence transaction
  -> project DOM and diagnostics from committed state
  -> publish typed result and bounded journal row
```

## Ordered implementation queue

```txt
1. Versioned StoryManifest and canonical scene/hotspot/clue indexes
2. StorySnapshot and save admission/migration/reconciliation
3. Inspection Command Authority and scene completion proof
4. Atomic Continue transition and first-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene Completion Proof and Dual-Ingress Parity Fixture Gate
```
