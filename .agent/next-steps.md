# Next steps: The Unmapped House

Timestamp: `2026-07-11T18-38-45-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, and visible rendering while making story admission, transitions, lifecycle, internal resolution, WebGL context recovery, and committed-frame proof deterministic.

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

### 3. Inspection and completion proof

- [ ] Replace descriptor ingress with id-only `InspectionCommand` values.
- [ ] Resolve canonical hotspots after admission.
- [ ] Record immutable inspection receipts and clue provenance.
- [ ] Derive one `SceneCompletionProof` from current-scene receipts.
- [ ] Prove side-panel/raycast parity and stale-observation rejection.

### 4. Atomic Continue transition

- [ ] Add command, proof, revision, transition, and stage identities.
- [ ] Build successor story and stage candidates without mutating live state.
- [ ] Persist and commit story, UI, stage, camera, fog, hotspots, and post settings atomically.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor resources only after acknowledgement.
- [ ] Roll back to predecessor authority on failure.
- [ ] Persist an explicit terminal phase when no successor exists.

### 5. Runtime lifecycle and scene-resource retirement

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence boot, interaction, timeout, reset, retry, resize, context, and frame work.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, target, and context leases.
- [ ] Inventory and dispose stage geometries, materials, hotspot resources, post resources, target, renderer, canvas, and context state.
- [ ] Add ordered idempotent stop, reset, restart, and dispose results.

### 6. Render Surface Resolution Authority

- [ ] Separate CSS aspect-frame composition from internal render resolution.
- [ ] Add immutable quality tiers with DPR, long-edge, pixel-count, sample, and fallback limits.
- [ ] Query relevant renderer and target capabilities before candidate allocation.
- [ ] Convert boot, resize, DPR change, retry, and fallback into one `ResizeCommand` path.
- [ ] Coalesce duplicate resize observations and reject stale generations.
- [ ] Produce one immutable `RenderSurfacePlan` with requested and admitted values.
- [ ] Prepare renderer and post-target dimensions under candidate ownership.
- [ ] Keep the predecessor surface committed during preparation.
- [ ] Classify allocation failures and step through declared fallback tiers.
- [ ] Commit CSS frame, camera projection, renderer buffer, target, and post binding as one surface revision.
- [ ] Read back actual applied dimensions.
- [ ] Acknowledge the first visible frame for each committed surface revision.
- [ ] Retire superseded allocations only after frame acknowledgement.
- [ ] Publish detached observations and a bounded render-surface journal.

### 7. WebGL Context Recovery Authority

- [ ] Add canonical context states: `UNINITIALIZED`, `INITIALIZING`, `READY`, `LOST`, `RESTORING`, `FAILED`, and `DISPOSED`.
- [ ] Add monotonic `contextGeneration` and `resourceGeneration` identities.
- [ ] Install revocable `webglcontextlost` and `webglcontextrestored` adapters through runtime lifecycle ownership.
- [ ] Suspend ready-frame commits immediately after accepted context loss.
- [ ] Fence raycast-dependent and story-mutating input under an explicit context policy.
- [ ] Preserve canonical story, stage, surface, camera, post, and hotspot descriptors through loss.
- [ ] Build a complete context-bound resource registry.
- [ ] Prepare renderer state, target storage, post binding, materials, geometries, and hotspots under candidate ownership.
- [ ] Reject stale session, stage, surface, context, and resource generations.
- [ ] Roll back and dispose every partial candidate resource on failure.
- [ ] Commit one complete resource generation atomically.
- [ ] Render and acknowledge one recovered visible frame before returning to `READY`.
- [ ] Prove repeated loss/restore cycles keep resource and listener counts bounded.
- [ ] Reject late context events after disposal.

### 8. Committed-frame diagnostics

- [ ] Correlate frame id, story snapshot, stage epoch, surface revision, context generation, resource generation, camera, hotspot set, and post settings.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, successor-frame, resize-frame, context-loss, recovered-frame, rollback, and resource-retirement acknowledgements.

## Required WebGL context fixture rows

```txt
context-state-transition-table
loss-command-idempotent
context-generation-monotonic
resource-generation-bound-to-context
loss-suspends-ready-frame-commit
raycast-input-rejected-while-lost
story-state-preserved-through-loss
restore-rebuilds-complete-resource-registry
same-surface-revision-cannot-skip-resource-rebuild
stale-restore-result-cannot-commit
partial-rebuild-rolls-back-and-disposes
first-recovered-frame-cites-active-generations
post-material-samples-rebuilt-target
hotspot-picking-resumes-on-recovered-frame
repeated-loss-restore-resource-count-stable
late-context-event-after-dispose-rejected
context-observation-detached-json-safe
context-journal-bounded
```

## Browser WebGL recovery smoke

```txt
boot and capture baseline story, stage, surface, context, resource and frame identities
force WebGL context loss
verify state becomes LOST and no ready frame commits
verify render-dependent input is fenced
verify story state remains stable
restore context under declared policy
verify context and resource generations advance once
verify target, post binding, scene resources and hotspots rebuild
verify first recovered frame cites all active identities
repeat loss/restore three times and compare live resource counts
lose context during resize
lose context during interlude
lose context during transition preparation
verify late events after disposal are rejected
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence authority
3. Inspection and scene-completion proof authority
4. Atomic Continue transition authority
5. Runtime session lifecycle and scene-resource retirement
6. Render Surface Resolution Authority
7. WebGL Context Recovery Authority
8. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse WebGL Context Recovery Authority
+ Context Generation / Resource Rebuild / Input Suspension / Recovered-Frame Fixture Gate
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
