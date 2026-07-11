# Next steps: The Unmapped House

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, and visible rendering while making story admission, transitions, lifecycle, internal resolution, and committed-frame proof deterministic.

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

### 5. Runtime lifecycle

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence boot, interaction, timeout, reset, retry, resize, and frame work.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, target, and context leases.
- [ ] Add ordered idempotent stop, reset, and dispose results.

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

### 7. Committed-frame diagnostics

- [ ] Correlate frame id, story snapshot, stage epoch, surface revision, camera, hotspot set, and post settings.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, successor-frame, resize-frame, rollback, and resource-retirement acknowledgements.

## Required render-surface fixture rows

```txt
aspect-frame-wide-window
aspect-frame-tall-window
fractional-frame-canonicalization
dpr-admission-policy-bounded
pixel-budget-selects-highest-valid-tier
oversized-plan-falls-back
resize-generation-monotonic
duplicate-resize-idempotent
rapid-resize-coalesced
stale-preparation-cannot-commit
renderer-and-target-match-plan
post-texture-binds-current-target
allocation-failure-preserves-predecessor
partial-candidate-resources-disposed
fallback-result-reports-actual-dimensions
hotspot-picking-matches-committed-frame
first-visible-frame-has-surface-revision
superseded-surface-retires-after-ack
surface-observation-detached-json-safe
surface-journal-bounded
```

## Browser render-surface smoke

```txt
boot at 1280x720 DPR 1
boot at 1920x1080 DPR 2
boot at 3840x2160 DPR 2 and verify budgeted internal resolution
resize through wide, tall, portrait, and fractional layouts
simulate rapid resize storm and verify only latest generation commits
simulate DPR change and verify one new surface revision
inject target allocation failure and verify explicit fallback
exhaust fallback tiers and verify predecessor remains visible
click a hotspot after resize and verify committed geometry parity
verify first visible frame reports actual renderer and target dimensions
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence authority
3. Inspection and scene-completion proof authority
4. Atomic Continue transition authority
5. Runtime session lifecycle
6. Render Surface Resolution Authority
7. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Render Surface Resolution Authority
+ Pixel Budget / Resize Generation / Fallback / Rollback / Visible-Frame Fixture Gate
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
