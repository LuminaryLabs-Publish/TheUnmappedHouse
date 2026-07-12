# Project breakdown: The Unmapped House render-surface resolution authority

**Timestamp:** `2026-07-12T13-08-15-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

This documentation pass selected `TheUnmappedHouse` as the oldest eligible synchronized Publish repository. It preserves the complete product breakdown and isolates the render-surface boundary spanning fixed-aspect CSS layout, device pixel ratio, the default drawing buffer, a multisampled offscreen target, resize mutation and visible-frame proof.

## Plan ledger

**Goal:** document one bounded and revisioned render-surface authority without changing runtime behavior.

- [x] Compare the complete ten-repository Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state and central entries.
- [x] Choose only `TheUnmappedHouse` from the oldest eligible timestamp.
- [x] Inspect the root docs and current source.
- [x] Identify the full interaction loop.
- [x] Identify all active domains.
- [x] Identify all 24 implemented kits and services.
- [x] Trace renderer construction, DPR, target construction, resize and two-pass submission.
- [x] Define the missing DSK/domain authority and proof matrix.
- [x] Refresh all required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, render-surface and deploy audits.
- [x] Push directly to `main` and create no branch or pull request.
- [ ] Implement and execute the authority in a future runtime change.

## Organization comparison

```txt
TheUnmappedHouse   2026-07-12T10-30-00-04-00 selected
AetherVale         2026-07-12T10-48-19-04-00
TheOpenAbove       2026-07-12T11-15-16-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheCavalryOfRome   excluded
```

```txt
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
```

## Interaction loop

```txt
boot
  -> read and merge browser save
  -> resolve current scene
  -> construct StageKit
  -> allocate fixed-design renderer and target
  -> resize to live aspect frame
  -> load scene
  -> project UI and persist

inspection
  -> canvas raycast or side-panel action
  -> mutate inspected, clues and log
  -> evaluate completion
  -> schedule interlude when complete
  -> save

Continue
  -> advance scene and route
  -> replace stage resources
  -> project successor UI
  -> save

resize
  -> sample window dimensions and DPR
  -> calculate 16:9 CSS frame
  -> resize default framebuffer
  -> resize samples:2 offscreen target
  -> provide no surface result

render
  -> animate camera and materials
  -> submit stage into offscreen target
  -> submit post pass into default framebuffer
```

## Domains in use

```txt
browser shell
fixed-aspect layout
authored story and render descriptors
browser persistence and mutable story state
scene routing, inspection, clues, logs and completion
completion timer, interlude, Continue and terminal projection
keyboard, pointer, focus and button input
Three.js CDN runtime
WebGL renderer and default drawing buffer
DPR sampling and cap
fixed-design startup allocation
viewport and CSS aspect-frame application
multisampled offscreen target
stage and post-processing passes
procedural geometry and anime materials
hotspot volumes, raycasting and camera parallax
resize, timeout and recursive RAF callbacks
syntax validation and Pages deployment
audit tracking and central synchronization
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `static-page-shell-kit` | Stage, story, hotspot, debug, hover and interlude surfaces. |
| `aspect-frame-kit` | Fixed 16:9 viewport calculation and CSS application. |
| `story-data-kit` | Scene, hotspot, clue, camera, material, post and interlude descriptors. |
| `browser-story-runtime-kit` | Load, inspect, complete, Continue, reset, project and persist. |
| `scene-route-kit` | Resolve and mutate scene and route ids. |
| `inspection-ledger-kit` | Scene-keyed inspection state. |
| `clue-ledger-kit` | Clue grants and queries. |
| `notebook-log-kit` | Bounded latest-first story log. |
| `interlude-timer-kit` | Delayed completion callback. |
| `terminal-route-kit` | Prototype-complete projection. |
| `localstorage-save-kit` | Single-key parse, merge, write and delete. |
| `stage-render-kit` | Renderer, camera, lights, target, canvas, resize and RAF. |
| `scene-descriptor-consumer-kit` | Scene descriptors to live Three.js resources. |
| `anime-material-kit` | Procedural shader materials and time uniforms. |
| `post-process-kit` | Grain, vignette, chromatic, distortion and scan lines. |
| `hotspot-volume-kit` | Invisible pick volumes. |
| `hotspot-picking-kit` | Raycast hover and click selection. |
| `camera-parallax-kit` | Pointer-driven camera offset. |
| `render-target-composition-kit` | Stage-target and post-default-framebuffer passes. |
| `debug-json-projection-kit` | Story-state debug projection. |
| `package-syntax-check-kit` | JavaScript syntax checks. |
| `static-pages-deploy-kit` | Static Pages deployment. |
| `repo-local-agent-ledger-kit` | Root and timestamped audit routing. |
| `central-ledger-sync-kit` | Organization selection and finding history. |

## Main finding

`StageKit` creates the renderer at fixed design dimensions and the offscreen target at design dimensions multiplied by capped DPR before calling `resize()`. The live resize then reallocates both surfaces. Later resize events repeat allocation without a product pixel budget, sample budget, WebGL capability query, allocation readback, stale-generation rejection, rollback or frame acknowledgement.

```txt
4K aspect frame at DPR 2
  drawing buffer: 7680 x 4320
  offscreen target: 7680 x 4320
  pixels per surface: 33,177,600
  offscreen color sample positions at samples 2: 66,355,200
```

## Required parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

## Candidate kits

```txt
render-surface-id-kit
render-surface-revision-kit
viewport-observation-kit
device-pixel-ratio-policy-kit
render-pixel-budget-kit
webgl-capability-query-kit
render-surface-plan-kit
drawing-buffer-plan-kit
offscreen-target-plan-kit
multisample-budget-kit
surface-dimension-admission-kit
surface-allocation-kit
allocation-readback-kit
surface-commit-kit
surface-rollback-kit
stale-resize-rejection-kit
surface-resource-retirement-kit
surface-observation-kit
visible-surface-frame-ack-kit
render-surface-fixture-kit
browser-dpr-resize-smoke-kit
pages-render-surface-smoke-kit
```

## Documentation output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T13-08-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T13-08-15-04-00.md
.agent/architecture-audit/2026-07-12T13-08-15-04-00-render-surface-resolution-dsk-map.md
.agent/render-audit/2026-07-12T13-08-15-04-00-startup-dpr-offscreen-allocation-gap.md
.agent/gameplay-audit/2026-07-12T13-08-15-04-00-resize-scene-visible-cost-loop.md
.agent/interaction-audit/2026-07-12T13-08-15-04-00-viewport-observation-surface-result-map.md
.agent/render-surface-audit/2026-07-12T13-08-15-04-00-pixel-budget-capability-commit-contract.md
.agent/deploy-audit/2026-07-12T13-08-15-04-00-render-surface-browser-fixture-gate.md
```

## Validation boundary

This run changes documentation only. No runtime, rendering, dependency, script or deployment behavior changed. No high-DPR, allocation, resize, rollback, framebuffer or visible-frame claim is made.