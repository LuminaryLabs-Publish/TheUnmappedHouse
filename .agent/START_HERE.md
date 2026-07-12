# START HERE: The Unmapped House Stage Resource Lifecycle Authority

Last updated: `2026-07-12T19-11-01-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates scene-resource and runtime lifecycle ownership. `StageKit.loadScene()` removes the previous scene from the graph with `stageGroup.clear()`, then drops geometry and material handles without explicit disposal. The recursive RAF, anonymous listeners, renderer, render target, post resources and hover state also have no stop or retirement contract.

## Plan ledger

**Goal:** make each scene replacement and stage shutdown a revisioned transaction that prepares one candidate resource set, commits it atomically, retires the predecessor exactly once and proves the first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse` by the oldest eligible central timestamp.
- [x] Trace scene construction, Continue, `loadScene`, hover state, RAF, listeners, render targets and page lifetime.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits and their services.
- [x] Quantify the normal progression retirement set.
- [x] Define prepare, commit, rollback, disposal, stop, observation and visible-frame contracts.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable browser lifecycle fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T17-20-42-04-00 selected
AetherVale         2026-07-12T17-35-48-04-00
TheOpenAbove       2026-07-12T17-41-25-04-00
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheCavalryOfRome   excluded
```

## Active lifecycle loop

```txt
boot
  -> construct StageKit
  -> allocate renderer, target, post mesh, lights and listeners
  -> start self-scheduling RAF
  -> load scene 1 resources

Continue
  -> mutate current scene
  -> stageGroup.clear()
  -> replace hotspot and material arrays
  -> allocate successor geometries, materials and hotspot volumes
  -> render successor
  -> no predecessor disposal result

page lifetime
  -> resize, pointer and click callbacks remain attached
  -> RAF schedules itself forever
  -> no StageStopCommand or dispose result exists
```

## Main finding

Normal three-scene progression retires 10 meshes from scene 1 and 9 meshes from scene 2. Each owns one geometry and one material, so at least 19 geometries and 19 materials are removed from the live graph without explicit disposal. The shader-material handles are discarded when `this.materials = []`; hotspot materials are never tracked in that array.

`loadScene()` also does not clear `hovered` or hide the hover label. The stage has no scene-resource revision, resource-set receipt, rollback, RAF handle, listener lease, stop state or first-visible-scene-frame acknowledgement.

## Required authority

```txt
the-unmapped-house-stage-resource-lifecycle-authority-domain
```

It must own stage-session identity, scene-resource revisions, detached candidate construction, atomic swap, rollback, geometry/material/hotspot leases, hover reset, exact-once predecessor retirement, RAF and listener leases, typed stop results, observations, bounded journals and first-visible-frame proof.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T19-11-01-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T19-11-01-04-00-stage-resource-lifecycle-dsk-map.md`
5. `stage-lifecycle-audit/2026-07-12T19-11-01-04-00-resource-lease-dispose-stop-contract.md`
6. `render-audit/2026-07-12T19-11-01-04-00-scene-replacement-resource-retirement-gap.md`
7. `gameplay-audit/2026-07-12T19-11-01-04-00-continue-scene-replacement-loop.md`
8. `interaction-audit/2026-07-12T19-11-01-04-00-scene-load-retire-commit-result-map.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Add a pure scene-resource plan and a `StageKit.disposeSceneResourceSet()` helper before changing presentation. Retain every allocated geometry, material and listener through one owner, then prove exact-once disposal with a mocked Three.js fixture.