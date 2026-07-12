# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T19-11-01-04-00`

## Goal

Preserve the authored scenes and visual output while making scene replacement and stage shutdown deterministic, reversible and resource-safe.

## Plan ledger

### 1. Resource ownership
- [ ] Add stage-session, scene-resource-set and scene-resource-revision identities.
- [ ] Track every geometry, material, hotspot volume, post geometry, render target, listener and RAF handle through one owner.
- [ ] Make lease ownership and transfer explicit.

### 2. Detached preparation and commit
- [ ] Build successor scene resources in a detached group.
- [ ] Validate the complete candidate before changing the live group.
- [ ] Return typed prepare, commit and rollback results.
- [ ] Reset hover and pointer-derived scene state during commit.
- [ ] Reject stale scene-load commands.

### 3. Retirement and shutdown
- [ ] Traverse predecessor resources and dispose each unique geometry and material exactly once.
- [ ] Retain named listener callbacks and remove them on stop.
- [ ] Retain the RAF ID and cancel it on stop.
- [ ] Dispose post resources, render target and renderer.
- [ ] Make repeated `stop()` idempotent.

### 4. Presentation proof
- [ ] Publish active scene-resource revision in diagnostics.
- [ ] Acknowledge the first visible frame after commit.
- [ ] Retire the predecessor only after candidate-frame success, or define a tested earlier-retirement policy.

### 5. Fixtures
- [ ] Mock geometry/material disposal counters.
- [ ] Test scene 1 to 2 to 3 replacement.
- [ ] Test candidate allocation failure and rollback.
- [ ] Test repeated load of the same scene.
- [ ] Test stale load rejection.
- [ ] Test hover-label reset.
- [ ] Test stop before first frame and stop after terminal copy.
- [ ] Test repeated stop.
- [ ] Run local browser and Pages lifecycle smoke.

## Implementation order

```txt
1. ResourceSet and lease types
2. Detached scene builder
3. Atomic swap and rollback
4. Exact-once disposer
5. Hover reset
6. RAF/listener stop ownership
7. Visible-frame receipt
8. Browser and Pages fixtures
```

## Retained downstream work

```txt
story manifest and snapshot admission
storage revision and cross-tab convergence
completion timer and modal admission
Notebook/player diagnostics separation
render-surface pixel budgeting and context recovery
committed-frame diagnostics
```

## Do not do first

```txt
new scenes
shader redesign
camera retuning
new interactions
audio
inventory
visual polish
```
