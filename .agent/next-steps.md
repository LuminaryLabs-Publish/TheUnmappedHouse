# Next steps: The Unmapped House

Timestamp: `2026-07-12T01-41-56-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path and Three.js presentation while making content, state, picking, transitions, narrative, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace the raw save with typed parse, migration, reconciliation and commit results.

### 3. Pointer observation and hotspot-pick authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.

### 4. Inspection and completion proof
- [ ] Record immutable inspection receipts and derive one scene-completion proof.

### 5. Atomic Continue transition
- [ ] Prepare successor story, stage, hotspot, narrative and persistence candidates before mutation.

### 6. Narrative Projection Authority
- [ ] Make DOM and aria-live output consume a typed, revisioned narrative projection.

### 7. Runtime Session Lifecycle and Scene Resource Retirement Authority
- [ ] Add runtime session identity, generation and lifecycle state.
- [ ] Construct the runtime through a startup transaction with reverse-order rollback.
- [ ] Retain exactly one RAF request id and cancel it before resource retirement.
- [ ] Represent resize, pointer, click, Continue and keyboard listeners as revocable leases.
- [ ] Retain and cancel completion timeouts.
- [ ] Add callback generation fences and stale-callback results.
- [ ] Build each scene into a resource generation with an explicit inventory.
- [ ] Keep the predecessor generation until the first successor-frame acknowledgement.
- [ ] Dispose predecessor geometries, materials and hotspot resources exactly once.
- [ ] Dispose post geometry/material, render target, renderer, context and canvas in order.
- [ ] Add idempotent stop, reset, restart and dispose results.
- [ ] Publish detached lifecycle and resource observations with a bounded journal.

### 8. Render Surface Resolution Authority
- [ ] Separate CSS composition from internal GPU resolution and commit surface revisions.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed-frame diagnostics
- [ ] Correlate manifest, snapshot, story, narrative, runtime, resource, surface, context and frame identities.

## Required lifecycle fixture rows

```txt
one-runtime-session-id
one-live-raf-chain
stop-cancels-next-frame
listeners-retired-on-stop
timeout-retired-on-stop
stale-timeout-rejected
stale-pointer-rejected
scene-load-creates-new-resource-generation
predecessor-retained-until-successor-frame
predecessor-geometries-disposed
predecessor-materials-disposed
predecessor-hotspot-resources-disposed
render-target-disposed
post-resources-disposed
renderer-and-canvas-retired
partial-startup-rolls-back
partial-scene-build-rolls-back
stop-idempotent
dispose-idempotent
restart-creates-one-canvas
restart-creates-one-raf
repeated-scene-transitions-bounded
observation-detached-json-safe
journal-bounded
```

## Browser lifecycle smoke

```txt
boot and record session/resource observation
transition A -> B -> C
verify each predecessor generation retires after successor-frame acknowledgement
stop runtime
verify no later frame, pointer, resize or timeout work commits
restart runtime
verify one canvas, one RAF chain and one active session
repeat transitions and compare bounded resource counts
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Runtime Session Lifecycle Authority
+ Ordered Callback and Three Resource Disposal
+ Scene Transition Leak and Restart Idempotence Gate
```

## Do not do first

```txt
new story rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
