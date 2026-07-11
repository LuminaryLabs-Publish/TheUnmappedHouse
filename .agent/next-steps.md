# Next steps: The Unmapped House

Timestamp: `2026-07-10T20-38-24-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Atomic Stage Commit + Resource Lifecycle Fixture Gate
```

## Goal

Preserve the current three-scene route and visual output while making every stage replacement transactional, source-identifiable, observable, and leak-free. The old committed scene must remain visible until a complete replacement is ready, every created Three.js resource must have one owner, and the host must support idempotent teardown.

## Plan ledger

### Stage build plan

- [ ] Convert a scene descriptor into a pure JSON-safe `StageBuildPlan` before touching live Three.js state.
- [ ] Validate camera, fog, post, layer, prop and hotspot rows.
- [ ] Count expected meshes, geometries, materials, hotspot volumes and lights.
- [ ] Include requested scene id, source revision and request id.
- [ ] Reject invalid descriptors before clearing or mutating the committed stage.

### Resource ownership

- [ ] Create one scene-local resource ledger for geometries, materials, textures and object roots.
- [ ] Track hotspot materials as well as anime materials.
- [ ] Track persistent host resources separately from scene-local resources.
- [ ] Define one owner for renderer, render target, post geometry, post material and post mesh.
- [ ] Make ledger disposal idempotent and return structured counts.
- [ ] Prevent duplicate disposal across shared resources.

### Atomic scene transaction

- [ ] Build the replacement scene under a detached group.
- [ ] Keep the previous committed group alive if preparation fails.
- [ ] Commit group, camera, fog and post settings in one transaction.
- [ ] Increment `stageEpoch` only after successful commit.
- [ ] Record requested scene id, committed scene id and resource counts.
- [ ] Dispose the previous scene ledger only after the replacement commits.
- [ ] Return typed `committed`, `rejected`, `failed` or `no_op` results.

### Hotspot and interaction admission

- [ ] Store canonical `{sceneId, hotspotId, stageEpoch, sourceRevision}` refs on hotspot meshes.
- [ ] Clear hover state and hide the hover label on each successful stage commit.
- [ ] Reject picks from stale epochs.
- [ ] Correlate click results with the committed stage result.
- [ ] Preserve side-panel and raycast behavior through the same story-command path.

### Host lifecycle

- [ ] Replace anonymous listeners with retained handler references.
- [ ] Retain the RAF id and running/disposed state.
- [ ] Add explicit `start()`, `pause()`, `resume()` and `dispose()` semantics.
- [ ] Cancel RAF during disposal.
- [ ] Remove resize, mousemove and click listeners during disposal.
- [ ] Dispose scene-local and persistent resources exactly once.
- [ ] Make repeated `dispose()` calls safe and observable.

### Diagnostics

- [ ] Expose a bounded JSON-safe stage journal.
- [ ] Record build request, validation, preparation, commit, disposal and failure rows.
- [ ] Expose current stage epoch and committed scene identity.
- [ ] Expose live resource counts and cumulative disposed counts.
- [ ] Keep raw Three.js objects out of diagnostics.

### Validation

- [ ] Add `scripts/validate-stage-build-plan.mjs`.
- [ ] Add `scripts/validate-atomic-stage-commit.mjs`.
- [ ] Add `scripts/validate-resource-ledger.mjs`.
- [ ] Add `scripts/validate-hotspot-stage-epoch.mjs`.
- [ ] Add `scripts/validate-stage-host-disposal.mjs`.
- [ ] Wire fixtures into `npm run check` after existing syntax checks.
- [ ] Add a browser lifecycle smoke for repeated scene loads and final teardown.

## Required fixture rows

```txt
valid-scene-plan-counts
invalid-descriptor-rejected-before-live-mutation
old-scene-retained-on-build-failure
commit-increments-stage-epoch-once
committed-scene-identity-matches-request
previous-ledger-disposed-after-commit
hotspot-ref-includes-stage-epoch
stale-pick-rejected
hover-cleared-on-commit
three-scene-route-has-one-live-stage-ledger
all-retired-geometries-disposed
all-retired-materials-disposed
raf-cancelled-on-dispose
listeners-removed-on-dispose
render-target-disposed-once
renderer-disposed-once
second-dispose-is-no-op
stage-journal-json-safe
```

## First implementation slice

```txt
pure StageBuildPlan
  -> descriptor validation
  -> expected resource counts
  -> headless fixture
```

## Second implementation slice

```txt
detached scene preparation
  -> resource ledger
  -> atomic commit
  -> previous-ledger disposal
  -> typed StageCommitResult
```

## Third implementation slice

```txt
stage epoch and canonical hotspot refs
  -> stale-pick rejection
  -> host start/pause/resume/dispose
  -> browser lifecycle smoke
```

## Validation target

```txt
npm run check
```

## Dependency note

The existing story-source manifest and save-reconciliation plan remains required for canonical gameplay authority. The stage transaction should accept source identity fields additively so the two boundaries compose without coupling render resource ownership to save mutation.

## Do not do first

```txt
new story rooms or branches
inventory
sound or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
