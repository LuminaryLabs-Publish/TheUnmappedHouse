# Project Breakdown: The Unmapped House WebGL Context Recovery Authority

**Timestamp:** `2026-07-11T18-38-45-04-00`

## Summary

`TheUnmappedHouse` owns a long-lived Three.js renderer, a multisampled render target, procedural shader materials, scene geometries, hotspot volumes, a post-process material, browser listeners, and a recursive RAF. The application has no explicit `webglcontextlost` or `webglcontextrestored` handling, no context generation, no render suspension state, no resource-rebuild transaction, and no first-recovered-frame acknowledgement.

The result is an unproved boundary between story authority and visible rendering. Story inspection, clues, interludes, Continue, persistence, resize, pointer input, and animation can continue while the renderer is unavailable or recovering, yet no typed result states whether the visible stage matches the current story, stage, surface, or context generation.

## Plan ledger

**Goal:** define one application-owned WebGL context recovery authority that suspends rendering and render-dependent input during loss, rebuilds all context-bound resources under a new generation, preserves story state, acknowledges the first recovered frame, and retires stale generations exactly once.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse` as the oldest eligible documented repository.
- [x] Trace renderer, target, material, geometry, listener, resize, picking, scene-load, and RAF ownership.
- [x] Identify the interaction loop, all active domains, all 24 implemented kits, and their services.
- [x] Define context state, generation, suspension, resource rebuild, restore commit, stale-result rejection, observation, and fixture contracts.
- [x] Add timestamped architecture, render, gameplay, interaction, WebGL-context, deploy, tracker, and turn-ledger records.
- [x] Refresh required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the authority and run executable context-loss/recovery fixtures.

## Repository selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

TheUnmappedHouse   2026-07-11T17-10-50-04-00 selected
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheOpenAbove       2026-07-11T18-01-38-04-00
HorrorCorridor     2026-07-11T18-11-21-04-00
PhantomCommand     2026-07-11T18-21-09-04-00
ZombieOrchard      2026-07-11T18-28-40-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` is in scope for this Publish-repository run.

## Interaction loop

```txt
boot
  -> parse mutable browser state
  -> construct StageKit
       -> create WebGLRenderer and canvas
       -> allocate multisampled render target
       -> create post scene, post material and target texture binding
       -> install resize, mousemove and click listeners
       -> start recursive RAF
  -> build the current scene's geometry, materials and hotspot volumes
  -> project story UI and persist state

normal frame
  -> update camera parallax
  -> update stage and post material time uniforms
  -> render stage into the current target
  -> render target texture through the post pass
  -> present the canvas

context loss
  -> no application context event admission
  -> no render-suspension state
  -> no callback or input fence
  -> RAF continues attempting frame submission
  -> story inspection, clue grants, timers, Continue and persistence remain admitted

possible context restoration
  -> no application context generation increment
  -> no detached resource-rebuild plan
  -> no atomic renderer/target/material/geometry restore commit
  -> no stale-generation rejection
  -> no first recovered frame acknowledgement
```

## Source ownership

| Source | Current responsibilities |
|---|---|
| `index.html` | Fixed 16:9 shell, stage mount, story panel, hotspot list, hover label, debug panel, interlude, and Continue button. |
| `src/story-data.js` | Three scene descriptors, nine hotspots, clue requirements, camera, geometry descriptors, material presets, post settings, and interlude copy. |
| `src/game.js` | Raw persistence, mutable story state, inspection, clue grants, completion, interlude timer, Continue, reset, UI projection, and StageKit calls. |
| `src/stage-kit.js` | Three.js renderer, scene, camera, lights, target, post pass, geometries, materials, hotspots, picking, resize, listeners, scene replacement, and recursive RAF. |
| `src/aspect-frame.js` | Fixed 1920×1080 composition and contained CSS-frame calculation. |
| `package.json` | Syntax-only checks and local static serving. |

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, geometry, material, post and copy descriptors
raw localStorage effects and mutable story state
scene route, inspection ledger, clue ledger, flags and notebook log
scene completion, interlude timing, Continue and terminal projection
DOM, hover, interlude and debug projection
Three.js CDN runtime
WebGL renderer, canvas and implicit context ownership
scene, camera, lights and stage group
renderer drawing buffer and multisampled post target
post-target texture binding and full-screen post pass
live scene replacement and procedural geometry allocation
procedural anime shader materials
hotspot volumes, raycast picking and pointer camera parallax
resize event admission and render-surface mutation
recursive RAF and frame submission
runtime callback and resource lifecycle
WebGL context loss, restoration and resource-generation gap
syntax validation and static Pages deployment
repo-local and central audit tracking
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | Stage, side panel, hotspot list, hover label, debug panel, interlude, and Continue shell. |
| `aspect-frame-kit` | Compute and apply the fixed 16:9 CSS frame. |
| `story-data-kit` | Scene, hotspot, clue, stage, camera, material, post, and interlude descriptors. |
| `browser-story-runtime-kit` | Coordinate load, inspection, completion, Continue, reset, projection, persistence, and stage calls. |
| `scene-route-kit` | Resolve and mutate current scene and route ids. |
| `inspection-ledger-kit` | Track scene-keyed hotspot observations. |
| `clue-ledger-kit` | Grant and query clue strings. |
| `notebook-log-kit` | Prepend and cap story log rows. |
| `interlude-timer-kit` | Schedule the 450 ms completion callback. |
| `terminal-route-kit` | Project prototype-complete copy. |
| `localstorage-save-kit` | Parse, shallow-merge, write, and clear browser state. |
| `stage-render-kit` | Create renderer, canvas, camera, lights, target, post scene, listeners, and RAF. |
| `scene-descriptor-consumer-kit` | Convert one scene descriptor into live Three.js objects. |
| `anime-material-kit` | Build procedural shader materials and animate their time uniform. |
| `post-process-kit` | Apply grain, vignette, chromatic offset, distortion, memory warp, and scan lines. |
| `hotspot-volume-kit` | Create invisible pick volumes and attach hotspot descriptors. |
| `hotspot-picking-kit` | Raycast hover/click input and dispatch hotspot selection. |
| `camera-parallax-kit` | Apply pointer-driven fixed-camera offsets. |
| `render-target-composition-kit` | Render stage-to-target and target-to-canvas passes. |
| `debug-json-projection-kit` | Project story state into the debug panel. |
| `package-syntax-check-kit` | Syntax-check four JavaScript sources. |
| `static-pages-deploy-kit` | Deploy the static route from `main`. |
| `repo-local-agent-ledger-kit` | Maintain root pointers and timestamped audit history. |
| `central-ledger-sync-kit` | Maintain central selection and findings history. |

## Main finding

The application has no authoritative context lifecycle despite owning context-bound rendering state.

```txt
WebGL context generation: absent
context state: absent
context-loss listener: absent
context-restored listener: absent
render suspension result: absent
resource inventory by generation: absent
resource rebuild plan: absent
restore commit/rollback result: absent
stale generation rejection: absent
first recovered frame acknowledgement: absent
context observation/journal: absent
```

Application behavior is therefore delegated to implicit renderer/browser behavior without evidence that current story state, current scene resources, current post target, current render-surface revision, and the first visible recovered frame agree.

## Required parent domain

```txt
the-unmapped-house-webgl-context-recovery-authority-domain
```

Candidate composition:

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

## Required authority flow

```txt
webglcontextlost
  -> prevent application render admission
  -> advance context-loss observation
  -> freeze or reject render-dependent pointer commands
  -> retain story snapshot and predecessor render metadata
  -> publish ContextLostResult

webglcontextrestored
  -> create a new context generation
  -> inventory required renderer, target, post, material, geometry and hotspot resources
  -> prepare all generation-bound resources under candidate ownership
  -> reject stale generation work
  -> atomically commit the recovered resource registry
  -> render one frame carrying story, stage, surface and context identities
  -> acknowledge the first recovered visible frame
  -> retire predecessor generation metadata exactly once
```

## Required invariants

```txt
No frame may be reported ready while context state is LOST, RESTORING or FAILED.
No render-dependent inspection may commit from a frame that predates the active context generation.
No restored generation may become authoritative until renderer, target, post binding,
scene resources, hotspot resources and one visible frame all cite the same generation.
Story state must survive context loss without being advanced by failed render-dependent input.
```

## Ordered implementation queue

```txt
1. StoryManifest and StorySnapshot startup authority
2. Inspection command and scene-completion proof authority
3. Atomic Continue transition authority
4. Runtime session lifecycle and scene-resource retirement
5. Render Surface Resolution Authority
6. WebGL Context Recovery Authority
7. Committed-frame diagnostics
```

## Validation boundary

Current `npm run check` parses JavaScript only. It does not create a WebGL context, lose or restore one, rebuild resources, prove input suspension, prove story preservation, or acknowledge a recovered frame.

Required focused rows:

```txt
context-loss-enters-suspended-state
context-loss-is-idempotent
raf-does-not-commit-ready-frames-while-lost
render-dependent-input-rejected-while-lost
story-snapshot-preserved-through-loss
restore-advances-context-generation-once
all-required-resources-rebuilt-for-generation
same-surface-revision-cannot-bypass-resource-rebuild
stale-restore-result-cannot-commit
partial-rebuild-rolls-back
first-recovered-frame-cites-active-generations
repeated-loss-restore-does-not-leak-resources-or-listeners
dispose-rejects-late-context-events
```
