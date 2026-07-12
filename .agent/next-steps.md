# Next steps: The Unmapped House

Timestamp: `2026-07-11T20-11-26-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path, and visible rendering while making story admission, pointer picking, inspection, transitions, lifecycle, internal resolution, WebGL recovery, and committed-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest

- [ ] Add stable manifest id, schema version, and fingerprint.
- [ ] Validate unique scene ids and scene-scoped hotspot ids.
- [ ] Validate known clues, requirements, stage descriptors, and canonical successors.
- [ ] Build canonical scene, hotspot, clue, requirement, and successor indexes.
- [ ] Deep-freeze admitted definitions.

### 2. Versioned StorySnapshot startup authority

- [ ] Replace the raw `.v1` object with a versioned envelope.
- [ ] Separate read, parse, migration, structural admission, semantic admission, reconciliation, and commit results.
- [ ] Add manifest/save/story identities, revisions, phase, and fingerprint.
- [ ] Retain malformed or rejected raw input without automatic overwrite.
- [ ] Delay StageKit allocation until a snapshot candidate is accepted.
- [ ] Prepare stage and UI off-line under one bootstrap generation.
- [ ] Roll back candidate resources on preparation, persistence, projection, or first-frame failure.
- [ ] Publish typed load, save, clear, reset, rollback, and first-frame results.

### 3. Pointer observation and hotspot-pick authority

- [ ] Replace `mousemove` and ambient click picking with one pointer-event adapter.
- [ ] Capture activation coordinates from the activation event itself.
- [ ] Add monotonic pointer sample ids and explicit input modality.
- [ ] Normalize client coordinates against one admitted canvas rectangle.
- [ ] Bind every sample to session generation, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, resource generation, and visible frame id.
- [ ] Separate hover samples from activation samples.
- [ ] Reject predecessor samples after resize, scene change, camera change, hotspot replacement, context recovery, restart, or disposal.
- [ ] Return typed hit, miss, stale, rejected, unsupported, and failed pick results.
- [ ] Return canonical hotspot ids rather than mutable descriptors.
- [ ] Clear hover and parallax on pointer leave, cancel, blur, suspension, and disposal.
- [ ] Support declared mouse, touch, pen, keyboard, and assistive-technology capabilities.
- [ ] Make side-panel and canvas activation produce one shared command/result semantic shape.
- [ ] Publish detached pointer/pick observations and a bounded journal.

### 4. Inspection and completion proof

- [ ] Replace descriptor ingress with id-only `InspectionCommand` values.
- [ ] Resolve canonical hotspots after admission.
- [ ] Require an accepted canvas pick result or side-panel activation result.
- [ ] Record immutable inspection receipts and clue provenance.
- [ ] Derive one `SceneCompletionProof` from current-scene receipts.
- [ ] Prove dual-ingress parity and stale-observation rejection.

### 5. Atomic Continue transition

- [ ] Add command, proof, revision, transition, and stage identities.
- [ ] Build successor story and stage candidates without mutating live state.
- [ ] Persist and commit story, UI, stage, camera, fog, hotspots, and post settings atomically.
- [ ] Invalidate all predecessor pointer samples and hover state.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor resources only after acknowledgement.
- [ ] Roll back to predecessor authority on failure.
- [ ] Persist an explicit terminal phase when no successor exists.

### 6. Runtime lifecycle and scene-resource retirement

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence boot, pointer, inspection, timeout, reset, retry, resize, context, and frame work.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, target, and context leases.
- [ ] Inventory and dispose stage geometries, materials, hotspot resources, post resources, target, renderer, canvas, and context state.
- [ ] Add ordered idempotent stop, reset, restart, and dispose results.

### 7. Render Surface Resolution Authority

- [ ] Separate CSS aspect-frame composition from internal render resolution.
- [ ] Add immutable quality tiers with DPR, long-edge, pixel-count, sample, and fallback limits.
- [ ] Query renderer and target capabilities before candidate allocation.
- [ ] Convert boot, resize, DPR change, retry, and fallback into one `ResizeCommand` path.
- [ ] Coalesce duplicate resize observations and reject stale generations.
- [ ] Produce one immutable `RenderSurfacePlan` with requested and admitted values.
- [ ] Prepare renderer and post-target dimensions under candidate ownership.
- [ ] Keep the predecessor surface committed during preparation.
- [ ] Classify allocation failures and step through declared fallback tiers.
- [ ] Commit CSS frame, camera projection, renderer buffer, target, post binding, and pointer-surface revision as one surface revision.
- [ ] Read back actual applied dimensions.
- [ ] Acknowledge the first visible frame for each committed surface revision.
- [ ] Retire superseded allocations only after frame acknowledgement.

### 8. WebGL Context Recovery Authority

- [ ] Add canonical context states and monotonic context/resource generations.
- [ ] Install revocable context-loss and restoration adapters.
- [ ] Suspend ready-frame commits and pointer-pick admission after accepted loss.
- [ ] Preserve canonical story, stage, surface, camera, post, and hotspot descriptors.
- [ ] Build a complete context-bound resource registry.
- [ ] Prepare and atomically commit one complete replacement generation.
- [ ] Reject stale session, stage, surface, context, resource, and pointer samples.
- [ ] Render and acknowledge one recovered visible frame before returning to ready.
- [ ] Prove repeated loss/restore cycles keep resource and listener counts bounded.

### 9. Committed-frame diagnostics

- [ ] Correlate frame id, story snapshot, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, resource generation, pointer sample, pick result, and post settings.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, activation, transition, resize, context-loss, recovered-frame, rollback, and resource-retirement acknowledgements.

## Required pointer-pick fixture rows

```txt
event-local-click-coordinate-used
click-before-first-move-correct
touch-activation-does-not-require-mousemove
pen-activation-does-not-require-mousemove
hover-sample-never-authorizes-activation
pointer-leave-clears-hover
window-blur-clears-hover
zero-size-canvas-rejected
nonfinite-coordinates-rejected
resize-invalidates-predecessor-sample
stage-change-invalidates-predecessor-sample
camera-change-invalidates-predecessor-sample
hotspot-set-change-invalidates-predecessor-sample
context-change-invalidates-predecessor-sample
miss-does-not-mutate-story
hit-resolves-one-canonical-hotspot-id
all-nine-hotspots-dual-ingress-parity
accepted-pick-cites-visible-frame
pointer-observation-detached-json-safe
pointer-journal-bounded
```

## Browser pointer smoke

```txt
boot and capture session, stage, surface, camera, hotspot-set, context and frame identities
click a hotspot before any mousemove
hover hotspot A, resize, click hotspot B
hover in scene one, Continue, activate in scene two
activate through touch without prior mouse movement
activate through pen without prior mouse movement where available
leave the canvas and verify hover clears
blur the page and verify hover clears
activate all nine hotspots through canvas and side-panel paths
compare inspection, clue, completion, persistence and visible-frame parity
verify misses and stale results do not mutate story state
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence authority
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof authority
5. Atomic Continue transition authority
6. Runtime session lifecycle and scene-resource retirement
7. Render Surface Resolution Authority
8. WebGL Context Recovery Authority
9. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Pointer Observation and Hotspot Pick Authority
+ Event-Local Coordinate / Revision Provenance / Input-Modality / Dual-Ingress Fixture Gate
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
