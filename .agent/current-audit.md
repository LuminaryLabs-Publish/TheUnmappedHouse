# Current audit: The Unmapped House

Timestamp: `2026-07-11T18-38-45-04-00`

## Product read

A fixed-camera anime-horror point-and-click prototype with three authored scenes, three hotspots per scene, nine required clues, a 450 ms completion interlude, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js renderer.

## Plan ledger

**Goal:** define the application-owned authority required to suspend render-dependent behavior on WebGL context loss, rebuild every required context-bound resource under a new generation, and prove one recovered visible frame.

- [x] Trace renderer, target, post binding, scene resources, hotspot resources, resize, input, scene loading, persistence, and RAF submission.
- [x] Confirm no application `webglcontextlost` or `webglcontextrestored` listener exists.
- [x] Inventory all active domains, all 24 implemented kits, and their services.
- [x] Define context state, context/resource generation, suspension, rebuild, rollback, stale-result rejection, recovered-frame, observation, and fixture kits.
- [ ] Implement StoryManifest, StorySnapshot, inspection, transition, lifecycle, surface, context-recovery, and committed-frame authorities.
- [ ] Run context loss, recovery, resource generation, input suspension, repeated-cycle, and browser fixtures.

## Interaction loop

```txt
boot
  -> load mutable story state
  -> construct StageKit
       -> create WebGLRenderer and canvas
       -> allocate multisampled render target
       -> create post scene and bind target.texture
       -> install resize, mousemove and click listeners
       -> start recursive RAF
  -> build current scene geometry, materials and hotspots
  -> render UI and write browser state

normal frame
  -> update camera parallax
  -> update stage and post uniforms
  -> render scene into target
  -> render target through post pass
  -> present canvas

context loss
  -> no application context state transition
  -> no render-suspension result
  -> no input or callback fence
  -> RAF continues attempting frame work
  -> story inspection, clues, timers, Continue and persistence remain live

possible restoration
  -> no application context generation increment
  -> no complete resource rebuild plan
  -> no atomic restore commit or rollback
  -> no stale-generation rejection
  -> no first recovered frame acknowledgement
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed shell, stage mount, side panel, hotspot list, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Scene order, hotspots, clue requirements, stage descriptors, camera, materials, post settings, and interlude copy. |
| `src/game.js` | Raw load, mutable story state, inspection, completion, timeout scheduling, Continue, reset, projection, persistence, and StageKit calls. |
| `src/stage-kit.js` | Renderer, canvas/context ownership, scene, camera, lights, target, post pass, geometry/material/hotspot allocation, picking, resize, listeners, scene replacement, and recursive RAF. |
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
WebGL renderer, canvas and implicit context ownership
scene, camera, lights and stage group
renderer drawing buffer and multisampled post target
post-target texture binding and post composition
live scene replacement and procedural geometry allocation
procedural anime shader materials
hotspot volume creation and raycast picking
pointer camera parallax
resize event admission and render-surface mutation
recursive RAF and frame submission
runtime callback and resource lifecycle
WebGL context loss, restoration and resource-generation gap
syntax validation and static Pages deployment
repo-local and central audit tracking
```

Missing authority domains:

```txt
canonical context lifecycle state
context event admission
context generation and resource generation
render suspension and capability fencing
context-bound resource inventory
complete resource rebuild plan
restore candidate preparation and atomic commit
partial-rebuild rollback
stale context-result rejection
recovered frame acknowledgement
context observation and bounded journal
browser context-loss/recovery fixture authority
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
| `hotspot-picking-kit` | Raycast hover/click input and dispatch selected hotspots. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Submit stage-target and post-process passes. |
| `debug-json-projection-kit` | Project aggregate story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain current pointers and timestamped audits. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding: context lifecycle is implicit

### Context-bound resources are long lived

`StageKit` constructs one renderer, one multisampled render target, a post material bound to the target texture, live stage geometries and materials, hotspot geometries/materials, listeners, and one recursive RAF.

### No application context events exist

The canvas has no application-owned `webglcontextlost` or `webglcontextrestored` listener. No typed command, result, context state, or context generation is published.

### Render and story state can diverge

The application continues admitting side-panel inspection, canvas click, clue grants, completion timeouts, Continue, reset, persistence, resize work, and RAF callbacks without checking render availability. Story state can therefore advance without proof that the player saw the accepted scene or hotspot state.

### Restoration has no complete rebuild transaction

The application has no canonical inventory proving that renderer state, target storage, post texture binding, stage materials, post material, geometries, hotspot resources, surface dimensions, and picking state were rebuilt for one new generation.

### Recovery success has no visible-frame boundary

There is no first recovered frame id tying together story revision, stage epoch, surface revision, context generation, resource generation, target generation, camera, hotspot set, and visible canvas output.

## Required parent domain

```txt
the-unmapped-house-webgl-context-recovery-authority-domain
```

Candidate kits:

```txt
webgl-context-state-kit
webgl-context-generation-kit
webgl-context-event-adapter-kit
context-loss-admission-kit
render-suspension-kit
render-dependent-input-fence-kit
context-loss-result-kit
context-resource-registry-kit
context-resource-generation-kit
context-resource-rebuild-plan-kit
renderer-state-reinitialization-kit
render-target-rebuild-kit
material-program-rebind-kit
scene-resource-reupload-kit
context-restore-transaction-kit
context-restore-rollback-kit
stale-context-result-rejection-kit
recovered-frame-ack-kit
context-observation-kit
context-recovery-journal-kit
webgl-context-recovery-fixture-kit
browser-context-loss-restore-smoke-kit
```

## Required recovery result

```txt
ContextRecoveryResult
  status: duplicate | rejected | suspended | restoring | committed |
          rolled_back | failed | recovered_frame_acknowledged
  commandId
  sessionId
  sessionGeneration
  predecessorContextGeneration
  candidateContextGeneration?
  committedContextGeneration?
  candidateResourceGeneration?
  committedResourceGeneration?
  storyRevision
  stageEpoch
  surfaceRevision
  rebuildRows[]
  failureClassification?
  rollbackRows[]
  firstRecoveredFrameId?
```

## Required authority flow

```txt
context lost
  -> admit event under current session/context generation
  -> suspend ready-frame commits
  -> fence render-dependent input
  -> preserve canonical story, stage and surface descriptors
  -> publish loss result

context restored or retry admitted
  -> create candidate context generation
  -> prepare renderer, target, post binding, materials, geometries and hotspots
  -> reject stale candidates
  -> atomically install complete resource registry
  -> render and acknowledge one recovered visible frame
  -> transition to READY
```

## Ordered implementation queue

```txt
1. StoryManifest schema, canonical indexes, validation, deep freeze and fingerprint
2. StorySnapshot startup admission, migration, reconciliation and typed persistence
3. InspectionCommand, receipts, clue provenance and scene-completion proof
4. Atomic Continue transition and first-visible-frame acknowledgement
5. Runtime session lifecycle and scene-resource retirement
6. Render Surface Resolution Authority
7. WebGL Context Recovery Authority
8. Committed-frame diagnostics
```

## Current audit ledge

```txt
TheUnmappedHouse WebGL Context Recovery Authority
+ Context Generation / Resource Rebuild / Input Suspension / Recovered-Frame Fixture Gate
```

## Validation status

The authority is not implemented. No current test creates or loses a WebGL context, observes context state, rebuilds resources, proves story preservation, fences render-dependent input, rejects stale generations, verifies stable resource counts, or acknowledges a recovered visible frame.
