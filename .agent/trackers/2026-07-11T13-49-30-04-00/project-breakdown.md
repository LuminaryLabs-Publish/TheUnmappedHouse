# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T13-49-30-04-00`

## Summary

Selected `LuminaryLabs-Publish/TheUnmappedHouse` under the oldest eligible fallback rule after comparing the complete ten-repository Publish inventory with the central ledger and root `.agent` coverage. This run documents the missing atomic Continue transition boundary.

## Plan ledger

**Goal:** define how one completed scene advances to its successor without exposing partial story, stage, persistence, projection, or render state.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no eligible repository is new, ledger-missing, or root-undocumented.
- [x] Select only `TheUnmappedHouse` as the oldest eligible entry.
- [x] Trace completion, interlude, Continue, stage load, save, terminal, and frame behavior.
- [x] Inventory domains, kits, and services.
- [x] Define the atomic Continue parent domain and fixture gate.
- [x] Update required root `.agent` documents.
- [x] Add timestamped architecture, render, gameplay, interaction, transition, deploy, and ledger records.
- [x] Push directly to `main`; create no branch or pull request.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-11T12-08-47-04-00 selected
AetherVale         2026-07-11T12-18-42-04-00
IntoTheMeadow      2026-07-11T12-29-49-04-00
PrehistoricRush    2026-07-11T12-39-53-04-00
MyCozyIsland       2026-07-11T12-58-06-04-00
TheOpenAbove       2026-07-11T13-10-35-04-00
HorrorCorridor     2026-07-11T13-20-45-04-00
PhantomCommand     2026-07-11T13-28-37-04-00
ZombieOrchard      2026-07-11T13-41-23-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
completion
  -> global clue predicate
  -> anonymous timeout
  -> interlude projection

Continue
  -> direct callback
  -> mutate story identity and route
  -> clear live stage
  -> build successor resources in live ownership
  -> project successor DOM
  -> write raw persistence
  -> next independent RAF renders successor
```

## Domains

```txt
browser shell and aspect frame
story descriptors and scene order
mutable story, route, inspection, clue, and log state
completion and interlude timing
Continue and terminal routing
localStorage effects
DOM/debug projection
Three renderer, stage, camera, fog, materials, hotspots, post, and RAF
resource ownership and scene replacement
validation and deployment
missing manifest, snapshot, completion proof, transition, rollback, epoch, frame, retirement, and lifecycle authority
```

## Kits and services

Implemented kit surfaces:

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

These offer authored story/render data, mutable browser story state, inspection and clue mutation, completion/interlude routing, raw persistence, Three.js scene construction, hotspot picking, camera/post rendering, diagnostics, syntax checks, Pages deployment, and audit tracking.

## Main finding

Continue is not a transaction. It has no proof admission, transition identity, candidate state, detached stage preparation, persistence-before-commit, rollback, stage epoch, first-frame acknowledgement, predecessor retirement receipt, or durable terminal result.

## Required parent domain

```txt
the-unmapped-house-atomic-continue-transition-authority-domain
```

## Next safe ledge

```txt
Atomic Continue Transition Authority
+ Rollback, Resource Retirement, and First-Successor-Frame Fixture Gate
```