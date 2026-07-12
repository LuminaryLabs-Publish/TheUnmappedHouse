# START HERE: The Unmapped House

Last updated: `2026-07-12T01-41-56-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates Runtime Session Lifecycle and Scene Resource Retirement Authority. `StageKit` starts a recursive animation loop and installs resize, pointer and click listeners in its constructor, but retains no revocable leases and exposes no stop or dispose operation. Every scene transition calls `stageGroup.clear()` and then drops the old material references without disposing the detached geometries, materials or hotspot resources.

## Plan ledger

**Goal:** make one runtime session own every browser callback and Three.js resource so stop, reset, restart, scene replacement and page retirement are ordered, idempotent and observable.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible repository.
- [x] Trace module boot, StageKit construction, scene replacement, timeout work, RAF submission, input callbacks and page-lifetime ownership.
- [x] Identify all active domains, all 24 implemented kits and their services.
- [x] Define runtime identity, callback leases, scene-resource generations, retirement, rollback, observation and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [x] Push only to `main`; create no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement the authority and execute the documented fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T01-41-56-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-12T01-41-56-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-12T01-41-56-04-00-scene-resource-retirement-frame-loop-gap.md
.agent/gameplay-audit/2026-07-12T01-41-56-04-00-scene-transition-resource-leak-loop.md
.agent/interaction-audit/2026-07-12T01-41-56-04-00-callback-lease-command-result-map.md
.agent/lifecycle-audit/2026-07-12T01-41-56-04-00-session-generation-ordered-dispose-contract.md
.agent/deploy-audit/2026-07-12T01-41-56-04-00-runtime-lifecycle-resource-fixture-gate.md
```

## Main finding

```txt
module evaluation
  -> allocate one StageKit
  -> create renderer, target, post resources, scene and camera
  -> install resize, mousemove and click callbacks
  -> start recursive RAF without retaining the request id

scene transition
  -> stageGroup.clear()
  -> reset hotspots and materials arrays
  -> allocate successor geometries, materials and hotspot volumes
  -> predecessor GPU resources remain undisposed
```

The page also installs Continue and keyboard listeners and creates an unretained 450 ms timeout. No session id or generation exists to reject stale callbacks, and no pagehide path retires the renderer graph.

## Required parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-authority-domain
```

Required composition:

```txt
runtime-session-id-kit
runtime-session-generation-kit
runtime-lifecycle-state-kit
runtime-start-command-kit
runtime-stop-command-kit
callback-generation-fence-kit
animation-frame-lease-kit
event-listener-lease-kit
timeout-lease-kit
scene-resource-generation-kit
stage-resource-registry-kit
scene-resource-retirement-kit
three-resource-disposer-kit
renderer-resource-owner-kit
render-target-resource-owner-kit
hotspot-resource-owner-kit
runtime-dispose-plan-kit
runtime-dispose-result-kit
startup-rollback-kit
runtime-observation-kit
runtime-lifecycle-journal-kit
runtime-lifecycle-fixture-kit
scene-transition-resource-leak-fixture-kit
stale-callback-fixture-kit
restart-idempotence-fixture-kit
```

## Required invariant

```txt
Every callback and resource belongs to one runtime session generation.
Scene replacement retires the predecessor resource generation exactly once.
Stop cancels RAF before listeners, timers and GPU resources are retired.
Disposed or stale generations cannot inspect hotspots, mutate story state or submit frames.
Restart creates a fresh session and cannot multiply callbacks or retain prior GPU resources.
```

## Dependency order

```txt
1. StoryManifest Authority
2. StorySnapshot startup admission and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
```

## Validation status

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
runtime lifecycle fixtures: unavailable
resource retirement fixtures: unavailable
```

Do not claim restart safety, scene-resource retirement or callback isolation until executable fixtures prove one live session, one RAF chain and zero retained predecessor scene resources.
