# Project breakdown: The Unmapped House

Timestamp: `2026-07-12T01-41-56-04-00`  
Repository: `LuminaryLabs-Publish/TheUnmappedHouse`  
Branch: `main`  
Scope: documentation only

## Summary

The selected repository has one ambient page-lifetime runtime. `StageKit` owns a recursive RAF, browser listeners and a retained WebGL graph without lifecycle controls. Scene changes detach predecessor objects and lose cleanup references instead of producing a resource-retirement transaction.

## Plan ledger

**Goal:** document one runtime-session authority across startup, callbacks, scene-resource generations, ordered disposal, restart and proof.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Confirm no new, ledger-missing or root-undocumented eligible repository.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse`, the oldest eligible ledger entry.
- [x] Read the root `.agent` state and active source.
- [x] Identify the interaction loop, domains, kits and kit services.
- [x] Trace RAF, listeners, timeouts, scene replacement and GPU resource ownership.
- [x] Add the required timestamped audit set.
- [x] Refresh current root `.agent` routing.
- [x] Push only to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs`.
- [ ] Implement or execute runtime behavior.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

TheUnmappedHouse   2026-07-12T00-01-25-04-00 selected
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
PhantomCommand     2026-07-12T01-20-00-04-00
ZombieOrchard      2026-07-12T01-30-07-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheUnmappedHouse` was modified in the Publish organization.

## Interaction loop

```txt
boot
  -> module creates story state and StageKit
  -> StageKit allocates renderer graph
  -> installs listeners
  -> starts recursive RAF
  -> loads scene resources

play
  -> pointer and side-panel inspection
  -> optional completion timeout
  -> Continue loads successor scene

scene load
  -> clear predecessor group
  -> discard cleanup arrays
  -> allocate successor resources
  -> continue same RAF and listeners

page end
  -> no explicit stop or dispose
```

## Domains

```txt
browser shell and fixed-aspect layout
authored story and render descriptors
mutable story, route, clue, inspection and log state
DOM narrative, interlude and debug projection
browser persistence
runtime session and callback ownership
Three.js renderer and render target
scene-resource construction and replacement
shader material and geometry allocation
hotspot picking and camera parallax
resize and recursive frame submission
validation, deployment and audit tracking
```

## Implemented kits

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

## Services

The implemented kits offer shell composition, fixed-frame fitting, story descriptors, state mutation, scene routing, inspection and clue tracking, logs, timeout-driven completion, terminal copy, localStorage effects, Three.js renderer construction, scene materialization, procedural shaders, post processing, hotspot picking, parallax, render submission, debug projection, syntax checking, Pages deployment and audit synchronization.

## Main findings

1. `animate()` does not retain the RAF id and has no stop fence.
2. Listener callbacks are not represented as revocable leases.
3. The completion timeout is not retained or session-scoped.
4. `stageGroup.clear()` detaches predecessor meshes without disposing resources.
5. Resetting `materials` and `hotspots` loses deterministic cleanup references.
6. Renderer, target, post resources, context and canvas have no ordered disposer.
7. No runtime identity or frame receipt proves which session/resource generation is visible.

## Proposed parent domain

```txt
the-unmapped-house-runtime-session-lifecycle-authority-domain
```

## Proposed kits

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

## Validation boundary

```txt
runtime changed: no
npm run check: not run
browser smoke: not run
lifecycle fixtures: unavailable
```
