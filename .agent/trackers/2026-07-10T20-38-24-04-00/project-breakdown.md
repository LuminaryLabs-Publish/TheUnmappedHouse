# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T20-38-24-04-00`

## Goal

Map the complete current interaction, domain, service and kit surface, then define the smallest safe render-host boundary that prevents partial scene replacement, stale hotspot admission and leaked Three.js resources without changing story content or visual output.

## Plan ledger

- [x] Compare the complete accessible Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm every eligible repo is tracked and has root `.agent` state.
- [x] Avoid `ZombieOrchard` because a newer repo-local documentation sequence was actively landing.
- [x] Select only `LuminaryLabs-Publish/TheUnmappedHouse` as the oldest stable eligible ledger entry.
- [x] Read `package.json`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/aspect-frame.js` and current `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify every active domain.
- [x] Identify all current kit services.
- [x] Identify current, next-cut and retained upstream kits.
- [x] Add architecture, render, gameplay, interaction, resource-lifecycle and deploy audits.
- [x] Update root routing documents and kit registry.
- [ ] Implement runtime changes. Not part of this pass.
- [ ] Run browser and fixture validation. Fixtures do not exist yet.

## Interaction loop

```txt
page load
  -> shallow-merge localStorage state
  -> resolve scene
  -> construct StageKit and start RAF
  -> load scene directly into live Three.js group
  -> render target pass
  -> post-process pass
  -> pointer hover raycast
  -> canvas click or side-panel inspection
  -> mutate inspection, clue and log state
  -> save and project UI
  -> completion schedules interlude
  -> continue replaces the live stage
  -> terminal copy or reset/reload
```

## Domain inventory

### Shell and layout

```txt
browser-shell
fixed-aspect-layout
static-dom-projection
```

### Story and state

```txt
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
localstorage-persistence
```

### Interaction

```txt
side-panel-input
raycast-input
keyboard-reset-input
hotspot-volume
raycast-picking
hover-state-lifecycle
```

### Render

```txt
stage-render-host
three-cdn-runtime
scene-descriptor-consumption
procedural-anime-material
post-process-pass
camera-parallax
render-target-composition
stage-resource-lifecycle
scene-replacement-policy
frame-loop-authority
resize-listener-lifecycle
pointer-listener-lifecycle
gpu-resource-disposal
stage-commit-identity
```

### Diagnostics and operations

```txt
debug-json-projection
repo-local-agent-ledger
central-ledger-sync
```

## Current kits and services

| Kit | Service surface |
|---|---|
| `static-page-shell-kit` | Stage, story panel, hotspot list, hover label, debug panel and interlude mounting. |
| `aspect-frame-kit` | Canonical 1920×1080 letterbox/pillarbox frame computation and DOM sizing. |
| `story-data-kit` | Three scene descriptors, nine hotspots, clue requirements, camera/fog/stage/material/post/interlude data. |
| `browser-story-runtime-kit` | Inspect, continue, reset, persistence, DOM projection and StageKit coordination. |
| `clue-ledger-kit` | Unique clue grants and requirement lookup. |
| `inspection-ledger-kit` | Scene-keyed hotspot inspection state. |
| `notebook-log-kit` | Bounded recent story log. |
| `scene-route-kit` | Active-scene lookup and visited route. |
| `interlude-timer-kit` | Delayed interlude opening. |
| `terminal-route-kit` | Final prototype-complete copy. |
| `localstorage-save-kit` | Parse, shallow merge, write and clear browser state. |
| `stage-render-kit` | Renderer, camera, scene, lights, target, post scene and recursive RAF. |
| `scene-descriptor-consumer-kit` | Direct construction of live layers, props and hotspot meshes. |
| `anime-material-kit` | FBM/toon ShaderMaterial construction and time updates. |
| `post-process-kit` | Grain, vignette, chromatic offset, distortion, memory warp and scan lines. |
| `hotspot-volume-kit` | Invisible box geometry carrying hotspot descriptors. |
| `hotspot-picking-kit` | Hover/click raycast and hotspot forwarding. |
| `camera-parallax-kit` | Pointer-driven camera offset. |
| `render-target-composition-kit` | Off-screen scene render followed by post pass. |
| `debug-json-projection-kit` | Aggregate story-state JSON. |
| `repo-local-agent-ledger-kit` | Timestamped local routing and findings. |
| `central-ledger-sync-kit` | Central selection and change-log record. |

## Render lifecycle finding

One complete route creates 28 scene-local meshes: 10 for scene one, 9 for scene two and 9 for scene three. `Group.clear()` only detaches prior meshes. Their geometries and materials remain undisposed, and hotspot materials are never included in `this.materials`.

Replacement is non-atomic. The current group is cleared before replacement resources finish building. No `StageBuildPlan`, resource ledger, commit result, scene identity or stage epoch exists. The constructor also owns anonymous listeners and an untracked recursive RAF with no teardown method.

## Next-cut kits

```txt
stage-build-plan-kit
stage-descriptor-validator-kit
stage-resource-ledger-kit
stage-resource-owner-kit
atomic-stage-commit-kit
stage-commit-result-kit
stage-epoch-kit
committed-scene-identity-kit
hotspot-stage-reference-kit
stale-pick-rejection-kit
hover-reset-kit
frame-loop-lifecycle-kit
event-listener-lifecycle-kit
render-target-lifecycle-kit
stage-disposal-kit
stage-journal-kit
headless-stage-plan-fixture-kit
browser-stage-lifecycle-smoke-kit
```

## Retained upstream kits

```txt
story-source-schema-kit
story-manifest-kit
story-source-fingerprint-kit
story-graph-validator-kit
versioned-save-envelope-kit
save-reconciliation-kit
canonical-hotspot-resolver-kit
story-command-result-kit
inspection-proof-kit
clue-derivation-kit
completion-proof-kit
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Commit + Resource Lifecycle Fixture Gate
```

## Validation status

```txt
runtime changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
new lifecycle fixtures: unavailable
push target: main
```
