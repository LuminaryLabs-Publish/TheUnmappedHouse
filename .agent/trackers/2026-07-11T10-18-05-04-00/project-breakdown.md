# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T10-18-05-04-00`

## Summary

This pass selects only `LuminaryLabs-Publish/TheUnmappedHouse`. It maps the runtime-session and Three.js resource-lifecycle boundary that must follow the already documented story-manifest, inspection, and atomic Continue gates.

The current runtime starts one unowned recursive RAF, installs three browser listeners, creates long-lived renderer/post resources, creates scene-local geometry and materials on every scene load, and offers no idempotent stop or dispose operation. `stageGroup.clear()` detaches prior scene objects, while `this.materials = []` discards the only scene-material list before disposal.

## Plan ledger

**Goal:** define one runtime session that owns every frame callback, listener, timeout, scene resource, renderer resource, stage epoch, and disposal result so scene transitions and page teardown cannot leave live callbacks or GPU allocations behind.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Detect that `TheUnmappedHouse` has a newer repo-local transition audit than its central ledger entry.
- [x] Select only `TheUnmappedHouse` for reconciliation and further breakdown.
- [x] Trace startup, scene loading, interlude timeout, Continue, reset, frame scheduling, listeners, renderer resources, and scene resources.
- [x] Identify the complete interaction loop.
- [x] Identify current and missing domains.
- [x] Catalog all implemented kits and services.
- [x] Define runtime-session and resource-retirement kits.
- [x] Add architecture, render, gameplay, interaction, lifecycle, and deployment audits.
- [x] Refresh required root `.agent` documents.
- [x] Push only to `main` and create no branch or pull request.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` with a ledger update and internal change log.
- [ ] Runtime lifecycle implementation remains future work.
- [ ] Node and browser lifecycle fixtures remain future work.

## Selection comparison

```txt
AetherVale           2026-07-11T08-18-31-04-00
HorrorCorridor       2026-07-11T09-29-07-04-00
IntoTheMeadow        2026-07-11T08-31-33-04-00
MyCozyIsland         2026-07-11T09-08-59-04-00
PhantomCommand       2026-07-11T09-40-19-04-00
PrehistoricRush      2026-07-11T08-48-04-04-00
TheCavalryOfRome     excluded
TheOpenAbove         2026-07-11T09-21-50-04-00
TheUnmappedHouse     central 2026-07-11T08-11-14-04-00; repo-local 2026-07-11T10-12-03-04-00; selected
ZombieOrchard        2026-07-11T10-00-12-04-00
```

## Interaction loop

```txt
module boot
  -> parse and shallow-merge localStorage state
  -> resolve current scene
  -> construct StageKit
  -> create renderer, target, post scene, camera, lights, listeners, and recursive RAF
  -> load scene descriptors into live Three.js objects
  -> inspect via side-panel or raycast
  -> mutate story state and persist
  -> completion schedules an unowned 450 ms timeout
  -> Continue mutates story, clears/rebuilds live stage, projects DOM, and persists
  -> RAF continuously updates camera/materials and submits two render passes
  -> R removes storage and reloads the page
```

## Main finding

Current ownership is fragmented:

```txt
requestAnimationFrame handle     not retained
resize listener                  anonymous and not removable
mousemove listener               anonymous and not removable
click listener                   anonymous and not removable
interlude timeout handle         not retained
scene geometries                 detached but not disposed
scene shader materials           list discarded before disposal
hotspot geometries/materials     detached but not disposed
render target                    never disposed
post geometry/material           never disposed
renderer                         never disposed
WebGL context                    never explicitly released
StageKit                         no stop/dispose state
browser runtime                  no session generation or teardown result
```

## Required parent domain

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

## Validation statement

This pass changes documentation only. It does not claim that runtime leaks, teardown, transition atomicity, persistence, or lifecycle fixtures are implemented.