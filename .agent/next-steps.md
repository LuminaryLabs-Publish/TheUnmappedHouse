# Next steps: The Unmapped House

Timestamp: `2026-07-11T10-18-05-04-00`

## Goal

Preserve the current three-scene story, copy, 450 ms interlude pacing, fixed composition, and visual output while making story authority, scene transitions, runtime callbacks, and Three.js resources deterministic, recoverable, and fixture-backed.

## Plan ledger

### Prerequisite 1: canonical story and persistence

- [ ] Add a stable `StoryManifest` id, schema version, canonical indexes, and deterministic fingerprint.
- [ ] Replace the raw save object with an admitted versioned `StorySnapshot`.
- [ ] Add typed load admission, v1 migration, canonical reconciliation, save revisions, and persistence results.
- [ ] Reconstruct clue and completion proof from canonical inspection receipts.

### Prerequisite 2: inspection authority

- [ ] Replace full descriptor ingress with canonical scene/hotspot command ids.
- [ ] Add command sequence, expected story revision, expected stage epoch, and typed results.
- [ ] Make side-panel and raycast ingress share one authority path.
- [ ] Make completion proof explicit and scene-scoped.

### Prerequisite 3: atomic Continue transition

- [ ] Admit Continue against completion proof, story revision, and stage epoch.
- [ ] Prepare the successor stage in a detached group.
- [ ] Build and durably persist a candidate `StorySnapshot`.
- [ ] Commit the successor stage atomically and acknowledge its first frame.
- [ ] Roll back or recover explicitly on failure.

### Runtime session authority

- [ ] Add a stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Add lifecycle states: `created`, `starting`, `running`, `stopping`, `stopped`, `disposing`, `disposed`, and `failed`.
- [ ] Route all interaction, timeout, and frame work through current-generation admission.
- [ ] Expose detached, immutable, JSON-safe session snapshots.

### Frame-loop lease

- [ ] Retain the active RAF id.
- [ ] Schedule at most one successor frame per running session.
- [ ] Cancel pending RAF work during stop.
- [ ] Reject stale queued callbacks after generation retirement.
- [ ] Prevent stale callbacks from scheduling successors.

### Listener leases

- [ ] Replace anonymous resize, mousemove, canvas click, keydown, and Continue handlers with named functions.
- [ ] Store exact target/type/function/options tuples.
- [ ] Remove all listeners during stop or dispose.
- [ ] Fence old hotspot-button closures by session generation and story revision.
- [ ] Make retirement idempotent.

### Timeout leases

- [ ] Retain the interlude timeout id.
- [ ] Correlate it to session generation, scene id, story revision, and completion proof.
- [ ] Allow one active interlude lease per completion proof.
- [ ] Cancel it on reset, transition, stop, or dispose.
- [ ] Reject stale timeout callbacks without DOM mutation.

### Stage resource inventory

- [ ] Assign each committed scene a `stageEpoch`.
- [ ] Register every geometry, material, mesh, group, target, and renderer-owned resource.
- [ ] Include hotspot materials, which are currently outside `this.materials`.
- [ ] Seal prepared resource counts before live commit.
- [ ] Expose current and retired counts through detached diagnostics.

### Scene resource retirement

- [ ] Commit the successor stage epoch before retiring the predecessor.
- [ ] Acknowledge the first rendered successor frame.
- [ ] Traverse and dispose predecessor geometries and materials exactly once.
- [ ] Return a typed retirement receipt with counts and failures.
- [ ] Keep the predecessor live if successor preparation fails.

### Full renderer disposal

- [ ] Dispose all remaining scene resource graphs.
- [ ] Dispose the render target, post-plane geometry, and post material.
- [ ] Dispose the renderer and remove its canvas.
- [ ] Make WebGL context retirement an explicit result.
- [ ] Clear owned references after disposal.
- [ ] Return `disposed`, `already_disposed`, `partially_disposed`, or `failed`.

### Reset transaction

- [ ] Replace direct storage removal plus reload with a typed reset request.
- [ ] Stop and dispose the active session before creating the next generation.
- [ ] Clear or replace persistence through a typed result.
- [ ] Commit the initial scene and first frame under the new generation.
- [ ] Reject all old-generation callbacks.
- [ ] Permit page reload only after a disposal receipt, not as the lifecycle mechanism.

### Lifecycle journal and validation

- [ ] Record session transitions, callback leases, stage epochs, resource counts, retirement receipts, and failures.
- [ ] Keep all observations bounded, detached, and JSON-safe.
- [ ] Add `validate-runtime-session.mjs`.
- [ ] Add `validate-frame-loop-lease.mjs`.
- [ ] Add `validate-listener-retirement.mjs`.
- [ ] Add `validate-timeout-retirement.mjs`.
- [ ] Add `validate-stage-resource-retirement.mjs`.
- [ ] Add `validate-renderer-disposal.mjs`.
- [ ] Add `validate-reset-generation.mjs`.
- [ ] Wire lifecycle fixtures into `npm run check` after syntax checks.
- [ ] Add a real browser teardown smoke.

## Required lifecycle fixture rows

```txt
single-active-frame-loop
stop-cancels-pending-raf
stale-raf-does-not-recurse
all-window-and-canvas-listeners-retired
pending-interlude-timeout-cancelled
stale-interlude-callback-no-op
old-button-closure-cannot-mutate-new-generation
successor-stage-commits-before-predecessor-retirement
failed-successor-keeps-current-stage-live
all-layer-prop-hotspot-geometries-disposed
all-scene-and-hotspot-materials-disposed
render-target-and-post-resources-disposed
renderer-disposed-and-canvas-removed
context-retirement-result-explicit
dispose-idempotent
reset-creates-new-generation
old-generation-callbacks-no-op
zero-live-resources-after-full-dispose
lifecycle-journal-json-safe-and-bounded
```

## Implementation order

```txt
1. StoryManifest, StorySnapshot, and persistence admission
2. Inspection command and completion proof
3. Atomic Continue transition and first-frame acknowledgement
4. Session identity, generation, and lifecycle state machine
5. Frame/listener/timeout lease registries
6. Stage resource inventory and retirement
7. Renderer, canvas, and context disposal
8. Typed stop/dispose/reset results and lifecycle journal
9. Node lifecycle fixtures and browser teardown smoke
```

## Next safe ledge

```txt
TheUnmappedHouse Runtime Session Lifecycle Authority
+ Scene Resource Retirement and Browser Teardown Fixture Gate
```

## Do not do first

```txt
new rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```