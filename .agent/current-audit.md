# Current audit: The Unmapped House

Timestamp: `2026-07-11T20-11-26-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, side-panel inspection buttons, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** define the application-owned authority required to sample activation coordinates from the activation event, bind a pick to one committed render state, reject stale observations, and preserve semantic parity between canvas and side-panel inspection.

- [x] Trace browser mouse observation, normalized coordinates, camera parallax, hover raycasting, click raycasting, side-panel activation, inspection, clue grants, completion, persistence, scene loading, resize, and RAF presentation.
- [x] Confirm the click listener ignores click coordinates and uses ambient mutable pointer state.
- [x] Inventory all active domains, all 24 implemented kits, and their services.
- [x] Define pointer sample, modality, coordinate, revision, pick plan, pick result, stale-rejection, activation parity, observation, journal, and fixture kits.
- [ ] Implement StoryManifest, pointer/pick, inspection, transition, lifecycle, surface, context-recovery, and committed-frame authorities.
- [ ] Run coordinate, revision, stale-pick, modality, parity, and browser fixtures.

## Interaction loop

```txt
boot
  -> load mutable story state
  -> construct StageKit
       -> initialize pointer and mouse vectors at zero
       -> install mousemove listener
       -> install click listener that discards its event
       -> create renderer, camera, target and RAF
  -> load current scene and hotspot meshes
  -> render side-panel buttons and persist state

mousemove
  -> sample client coordinates
  -> normalize against the current canvas rect
  -> mutate shared pointer and parallax vectors
  -> raycast current hotspot meshes
  -> mutate hover label

canvas click
  -> receive event with client coordinates
  -> discard event coordinates and modality
  -> raycast with the last shared pointer
  -> dispatch a full descriptor from mesh.userData
  -> mutate inspection, clues, completion, UI and persistence

side-panel click
  -> invoke a closure over a full descriptor
  -> mutate the same story state without pick evidence
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side panel, hotspot list, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Scene order, hotspots, clue requirements, stage descriptors, camera, materials, post settings, and interlude copy. |
| `src/game.js` | Raw load, mutable story state, inspection, completion, timeout scheduling, Continue, reset, projection, persistence, and StageKit calls. |
| `src/stage-kit.js` | Renderer, scene, camera, target, materials, hotspot volumes, pointer vectors, mousemove/click listeners, hover, raycasting, resize, scene replacement, and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and CSS frame fitting. |
| `package.json` | Syntax-only source checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, geometry, material, post and copy descriptors
raw browser storage and mutable story state
scene route, inspection, clue, flags and notebook log
scene completion, interlude timing, Continue and terminal projection
DOM, hover, interlude and debug projection
Three.js CDN runtime
WebGL renderer, scene, camera, lights, target and post composition
live scene replacement and procedural geometry allocation
procedural anime shader materials
hotspot volume creation
mousemove coordinate observation
normalized-device-coordinate mutation
hover raycast picking
canvas click activation
side-panel button activation
pointer camera parallax
resize event admission and render-surface mutation
recursive RAF and visible frame submission
runtime callback and resource lifecycle
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical browser input event envelope
pointer sample identity and modality
coordinate normalization result
stage epoch and surface revision provenance
camera and hotspot-set revisions
context and visible-frame correlation
activation-local coordinate sampling
stale sample and stale result rejection
hover leave, cancel and blur policy
canonical hit identity
canvas and side-panel activation parity
typed pick and activation results
detached pointer/pick observation
bounded pointer/pick journal
browser input-modality fixtures
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
| `stage-render-kit` | Create renderer, camera, lights, target, post scene, canvas, listeners, and recursive RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js resources. |
| `anime-material-kit` | Build procedural shader materials. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Build invisible pick meshes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input using ambient pointer state and dispatch selected descriptors. |
| `camera-parallax-kit` | Apply mouse-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: click authority is ambient

### Pointer state is shared and mutable

`StageKit` constructs `this.pointer` and `this.mouse` once. `handlePointer(event)` mutates both during `mousemove` and performs hover picking.

### The activation event is ignored

The canvas click listener calls `this.clickHotspot()` without passing the event. `clickHotspot()` invokes `pick()`, which uses the existing pointer value. The actual click coordinates never enter the decision.

### Input modality is implicit

The canvas path is wired with `mousemove` and `click`, not a canonical pointer-event adapter. Touch and pen behavior is not admitted, classified, or proven. A generated click can depend on a pointer sample that was never produced for that modality.

### Render-state provenance is absent

The stored pointer has no session id, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, resource generation, or visible frame id. A resize, scene transition, camera replacement, hotspot replacement, context recovery, or lifecycle restart cannot invalidate it explicitly.

### Hover cannot authorize activation

Hover and click need separate samples. Hover is presentation state; it must not become ambient authority for a later activation.

### Side-panel and canvas parity is unproven

Both paths currently dispatch complete hotspot descriptors, but neither yields a typed activation result. There is no proof that both sources resolve the same canonical hotspot id, inspection receipt, clue receipts, completion proof, persistence candidate, or visible-frame result.

## Required parent domain

```txt
the-unmapped-house-pointer-pick-authority-domain
```

Candidate kits:

```txt
pointer-event-adapter-kit
pointer-sample-id-kit
pointer-modality-kit
pointer-coordinate-observation-kit
pointer-coordinate-normalization-kit
pointer-surface-revision-kit
pointer-stage-epoch-kit
pointer-camera-revision-kit
hotspot-set-revision-kit
hotspot-pick-plan-kit
hotspot-pick-result-kit
stale-pointer-observation-rejection-kit
stale-hotspot-pick-rejection-kit
hover-state-kit
pointer-leave-cancel-kit
canvas-activation-command-kit
side-panel-activation-command-kit
activation-parity-result-kit
pointer-pick-observation-kit
pointer-pick-journal-kit
pointer-pick-fixture-kit
browser-input-modality-smoke-kit
```

## Required pick result

```txt
HotspotPickResult
  status: hit | miss | rejected | stale | unsupported | failed
  sampleId
  sessionId
  sessionGeneration
  stageEpoch
  surfaceRevision
  cameraRevision
  hotspotSetRevision
  contextGeneration
  resourceGeneration
  visibleFrameId
  modality
  hotspotId?
  rejectionReason?
```

## Required authority flow

```txt
browser event
  -> capture event-local coordinates immediately
  -> admit lifecycle and input modality
  -> bind current stage, surface, camera, hotspot, context and frame identities
  -> normalize against the admitted canvas rect
  -> build an immutable pick plan
  -> raycast once
  -> reject stale results
  -> return a canonical hotspot id or miss
  -> submit an id-only activation and inspection command
  -> publish typed results and a bounded detached journal
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. InspectionCommand, receipts, clue provenance and scene-completion proof
5. Atomic Continue transition and first-visible-frame acknowledgement
6. Runtime session lifecycle and scene-resource retirement
7. Render Surface Resolution Authority
8. WebGL Context Recovery Authority
9. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse Pointer Observation and Hotspot Pick Authority
+ Event-Local Coordinates / Revision Provenance / Input-Modality and Dual-Ingress Fixture Gate
```

## Validation status

The authority is not implemented. No current test proves click-local coordinates, touch or pen activation, leave/cancel reset, stale sample rejection, stage/surface/camera/hotspot/frame provenance, canvas/side-panel parity, or miss-without-mutation behavior.
