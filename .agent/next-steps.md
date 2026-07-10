# Next steps: The Unmapped House

Timestamp: `2026-07-10T17-29-23-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Scene Commit + Resource Lifetime Fixture Gate
```

## Goal

Make scene replacement deterministic and failure-safe without changing the visible route. A story scene transition must preflight descriptors, build replacement resources off to the side, atomically commit one scene epoch, dispose the retired epoch, and acknowledge the first rendered frame before the transition is considered fully presented.

## Plan ledger

### Descriptor preflight

- [ ] Add stable scene descriptor schema/version metadata.
- [ ] Validate camera vectors, FOV, fog, layers, props, hotspot ids, geometry dimensions, materials, and post values before touching the live stage.
- [ ] Reject duplicate hotspot ids and unsupported prop kinds.
- [ ] Return typed validation rows with stable reason codes.
- [ ] Keep the current authored descriptor format compatible.

### Build plan and resource registry

- [ ] Convert validated descriptors into a detached `StageBuildPlan`.
- [ ] Assign `sceneEpochId`, `sourceSceneId`, and `buildPlanId`.
- [ ] Track every geometry, material, mesh, hotspot volume, listener, render target, and frame-loop handle in a resource registry.
- [ ] Record created resource counts and descriptor-to-resource mappings.
- [ ] Ensure build failure disposes all provisional resources.

### Atomic stage commit

- [ ] Build the next stage under a detached group without clearing the active group.
- [ ] Apply background, fog, camera, and post settings only at commit.
- [ ] Swap the active group and active epoch in one commit step.
- [ ] Retain the prior epoch until the new epoch commits successfully.
- [ ] Return typed `accepted`, `rejected`, `failed`, and `rolled_back` load results.
- [ ] Preserve the existing visual output and scene order.

### Disposal and teardown

- [ ] Dispose retired geometries and materials exactly once.
- [ ] Clear hotspot references only after epoch retirement.
- [ ] Count created, retained, retired, disposed, and leaked resources.
- [ ] Add `StageKit.dispose()` to cancel RAF, remove listeners, and dispose renderer targets/materials/geometries.
- [ ] Make repeated `dispose()` idempotent.

### Story/render correlation

- [ ] Add a story transition id for every scene advance.
- [ ] Pass `sceneId`, transition id, and expected epoch id into the StageKit load request.
- [ ] Do not treat scene presentation as complete until StageKit returns a committed load result.
- [ ] Emit a first-frame acknowledgement containing scene id, epoch id, frame id, viewport, camera fingerprint, and resource counts.
- [ ] Expose JSON-safe story/stage correlation through diagnostics.

### Interaction and picking

- [ ] Tag hotspot pick observations with active scene id and scene epoch id.
- [ ] Return hit/miss observations instead of callback-only behavior.
- [ ] Reject stale picks from retired epochs.
- [ ] Preserve side-panel and raycast inspection parity.

### Validation

- [ ] Add `scripts/validate-stage-preflight.mjs`.
- [ ] Add `scripts/validate-stage-atomic-commit.mjs`.
- [ ] Add `scripts/validate-stage-resource-lifetime.mjs`.
- [ ] Add `scripts/validate-story-stage-correlation.mjs`.
- [ ] Wire the fixtures into `npm run check` after syntax validation.
- [ ] Prove valid loads for all three authored scenes.
- [ ] Inject invalid layer, prop, camera, hotspot, and shader inputs.
- [ ] Prove the active stage survives every rejected/failed replacement.
- [ ] Prove retired resources are disposed exactly once.
- [ ] Prove first-frame acknowledgement matches story scene and committed epoch.

## First implementation slice

```txt
scene descriptor preflight
  -> detached StageBuildPlan
  -> provisional resource registry
  -> typed build result
  -> no live-stage mutation
```

## Second implementation slice

```txt
atomic group/camera/fog/post commit
  -> prior epoch retirement
  -> resource disposal ledger
  -> rollback on injected failure
```

## Third implementation slice

```txt
story transition correlation
  -> first-frame acknowledgement
  -> stale hotspot rejection
  -> JSON-safe GameHost projection
```

## Validation target

```txt
npm run check
```

## Do not do first

```txt
new rooms
inventory
audio
renderer replacement
new shaders
camera retuning
visual polish
```
