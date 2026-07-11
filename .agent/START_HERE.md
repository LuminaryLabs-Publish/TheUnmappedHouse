# START HERE: The Unmapped House

Last updated: `2026-07-11T10-18-05-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, and a descriptor-driven Three.js stage.

The current documentation queue now has four concrete authority gates: canonical story/save admission, canonical inspection/completion proof, atomic Continue transition, and runtime-session lifecycle. This pass maps the fourth gate: the runtime owns callbacks and GPU resources only implicitly and cannot prove clean stop, reset, scene retirement, or full disposal.

## Plan ledger

**Goal:** preserve the existing story, 450 ms pacing, fixed 16:9 composition, shaders, and interaction while making each runtime session the sole owner of frame callbacks, listeners, timeouts, stage epochs, Three.js resources, and teardown results.

- [x] Compare all ten accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Detect the newer repo-local `10-12-03` transition audit that was not yet reflected centrally.
- [x] Select only `TheUnmappedHouse`.
- [x] Trace the full interaction, frame, listener, timeout, scene-resource, renderer-resource, reset, and disposal paths.
- [x] Identify all current and missing domains.
- [x] Catalog all implemented kits and services.
- [x] Define runtime-session lifecycle and resource-retirement kit boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, and deployment audits.
- [x] Push only to `main`; create no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection

```txt
AetherVale           2026-07-11T08-18-31-04-00
HorrorCorridor       2026-07-11T09-29-07-04-00
IntoTheMeadow        2026-07-11T08-31-33-04-00
MyCozyIsland         2026-07-11T09-08-59-04-00
PhantomCommand       2026-07-11T09-40-19-04-00
PrehistoricRush      2026-07-11T08-48-04-04-00
TheCavalryOfRome     excluded
TheOpenAbove         2026-07-11T09-21-50-04-00
TheUnmappedHouse     central 08-11-14; repo-local 10-12-03; selected
ZombieOrchard        2026-07-11T10-00-12-04-00
```

## Interaction loop

```txt
load `.v1` localStorage object
  -> shallow-merge into initial state
  -> resolve current scene
  -> construct StageKit
  -> create renderer, target, post resources, listeners, and recursive RAF
  -> load current scene into live Three.js objects
  -> inspect through side-panel or raycast descriptor
  -> mutate inspection, clues, log, DOM, and persistence
  -> completion schedules an unowned 450 ms timeout
  -> Continue mutates story and destructively replaces live stage resources
  -> RAF updates camera/material time and submits stage plus post passes
  -> R clears storage and reloads the page
```

## Main finding

No object owns the complete runtime session.

```txt
RAF handle                         not retained or cancelled
resize/mousemove/click listeners   anonymous and not removable
keyboard listener                  anonymous and not removable
interlude timeout                  not retained or cancelled
scene geometry/materials           detached but not disposed
hotspot materials                  never tracked for disposal
render target/post resources       never disposed
renderer/canvas/WebGL context       never explicitly retired
session generation                 absent
stop/dispose result                absent
```

`StageKit.loadScene()` calls `stageGroup.clear()` and then resets `this.materials` before replacement construction. The prior GPU resources are detached without disposal and their tracked material references are lost. The recursive RAF and listeners also survive until browser page destruction because `StageKit` has no `stop()` or `dispose()` method.

## Domains in use

```txt
browser shell and fixed-aspect layout
story, scene, hotspot, clue, camera, stage, material, and post descriptors
mutable story, route, inspection, clue, notebook, completion, interlude, and terminal state
side-panel, raycast, Continue, and reset input
localStorage load, write, and clear effects
story, hover, interlude, and debug projection
Three.js CDN runtime
stage renderer, render target, post pass, shaders, picking, and parallax
live scene replacement
frame-loop, listener, timeout, scene-resource, renderer-resource, and page lifecycle
syntax validation, static deployment, and audit ledgers
```

Missing authority domains:

```txt
versioned StoryManifest and StorySnapshot
save admission, migration, and reconciliation
inspection command and completion proof
atomic story/stage transition
runtime session and generation
frame, listener, and timeout leases
stage resource inventory and retirement
renderer and WebGL context disposal
lifecycle results, journals, and fixtures
```

## Implemented kit surfaces

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

## Required lifecycle parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-domain
```

Candidate kits:

```txt
runtime-session-authority-kit
runtime-session-generation-kit
frame-loop-lease-kit
listener-lease-kit
interlude-timeout-lease-kit
stage-resource-inventory-kit
scene-resource-retirement-kit
three-resource-disposal-kit
renderer-disposal-kit
webgl-context-retirement-kit
idempotent-session-stop-kit
session-disposal-result-kit
lifecycle-journal-kit
lifecycle-fixture-kit
browser-teardown-smoke-kit
```

## Ordered implementation queue

```txt
1. Versioned StoryManifest and StorySnapshot
2. Save admission, migration, and reconciliation
3. Inspection Command Authority and completion proof
4. Atomic Story/Stage Continue Transition
5. Runtime Session Lifecycle and Resource Retirement
6. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Runtime Session Lifecycle Authority
+ Scene Resource Retirement and Browser Teardown Fixture Gate
```