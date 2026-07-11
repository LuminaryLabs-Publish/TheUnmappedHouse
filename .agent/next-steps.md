# Next steps: The Unmapped House

Timestamp: `2026-07-11T15-30-50-04-00`

## Goal

Preserve the current three-scene story, copy, 450 ms pacing, fixed composition, and visible rendering while making manifest admission, startup persistence, inspection, completion, Continue, resource ownership, and frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest

- [ ] Add stable manifest id, schema version, and fingerprint.
- [ ] Validate unique scene ids and scene-scoped hotspot ids.
- [ ] Validate known clues, requirements, stage descriptors, and canonical successors.
- [ ] Build canonical scene, hotspot, clue, requirement, and successor indexes.
- [ ] Deep-freeze admitted definitions.

### 2. Versioned StorySnapshot startup authority

- [ ] Replace the raw `.v1` object with a versioned envelope.
- [ ] Separate raw read, parse, migration, structural admission, semantic admission, reconciliation, and commit results.
- [ ] Add `manifestId`, `manifestFingerprint`, `saveId`, `saveRevision`, `storyRevision`, explicit story phase, and snapshot fingerprint.
- [ ] Validate scene, route, inspection, clue, flag, log, phase, and proof coherence.
- [ ] Require clue provenance from admitted inspection receipts.
- [ ] Retain malformed or rejected raw input without auto-overwrite.
- [ ] Add explicit quarantine, retry, temporary-default, clear, and reset commands.
- [ ] Delay StageKit allocation until a snapshot candidate is accepted.
- [ ] Prepare stage and UI off-line under one bootstrap generation.
- [ ] Roll back and dispose all candidate resources on stage, projection, storage, render, or frame-ack failure.
- [ ] Publish typed load, save, clear, reset, rollback, and first-frame results.
- [ ] Add a bounded persistence journal and detached read model.

### 3. Inspection and completion proof

- [ ] Replace descriptor ingress with id-only `InspectionCommand` values.
- [ ] Resolve canonical hotspots after admission.
- [ ] Record immutable inspection receipts and clue provenance.
- [ ] Derive one `SceneCompletionProof` from current-scene receipts.
- [ ] Persist proof identity and consumption state.
- [ ] Prove side-panel/raycast parity and stale-observation rejection.

### 4. Atomic Continue transition

- [ ] Add `ContinueCommand` identity, sequence, source, scene id, proof id, expected story revision, and expected stage epoch.
- [ ] Reject incomplete, stale, duplicate, cross-scene, and already-consumed proof commands.
- [ ] Reserve a transition id and completion proof before preparation.
- [ ] Build a successor StorySnapshot candidate without mutating live state.
- [ ] Prepare successor Three.js resources in detached ownership.
- [ ] Persist the candidate snapshot before publishing live successor state.
- [ ] Atomically commit story identity, route, DOM projection, stage group, camera, fog, hotspots, post settings, story revision, and stage epoch.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor resources only after acknowledgement.
- [ ] Consume the completion proof only on successful commit.
- [ ] Dispose detached successor resources and restore predecessor authority on failure.
- [ ] Persist an explicit terminal phase when no successor exists.

### 5. Runtime lifecycle

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence boot, interaction, timeout, reset, retry, and frame work to the current generation.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, and context leases.
- [ ] Add ordered idempotent stop, reset, and dispose results.

### 6. Committed-frame diagnostics

- [ ] Correlate frame id, load result, snapshot fingerprint, story revision, stage epoch, transition id, camera, hotspot set, and post settings.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, successor-frame, rollback, and resource-retirement acknowledgements.

## Required StorySnapshot fixture rows

```txt
absent-save-default-result
malformed-json-rejected-without-overwrite
wrong-top-level-type-rejected
unknown-version-rejected
known-version-migrated-once
manifest-mismatch-rejected
unknown-scene-rejected
route-prefix-and-current-scene-invariant
unknown-inspection-id-rejected
clue-provenance-required
invalid-field-types-rejected-before-stage-allocation
log-budget-enforced
snapshot-fingerprint-stable
storage-read-failure-reported
storage-write-failure-rolls-back-bootstrap
stage-prepare-failure-disposes-candidate-resources
ui-projection-failure-disposes-candidate-resources
first-bootstrap-frame-correlates-snapshot
retry-creates-one-generation-one-canvas-one-raf
clear-result-published-before-reload
load-save-results-detached-json-safe
persistence-journal-bounded
```

## Browser startup smoke

```txt
boot a valid current save and capture manifest/snapshot/stage/frame identities
seed malformed JSON and verify the raw save is retained
verify rejection leaves no candidate canvas, listener, RAF or WebGL resource
seed valid JSON with invalid field types and reject before StageKit allocation
inject stage preparation failure and verify complete disposal
inject UI projection failure and verify complete disposal
inject storage write failure and verify no committed bootstrap or revision advance
retry and verify exactly one committed generation
verify first visible frame matches the accepted snapshot and stage epoch
reset and verify a typed clear result before reload
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence authority
3. Inspection and scene-completion proof authority
4. Atomic Continue transition authority
5. Runtime session lifecycle
6. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse StorySnapshot Startup Admission Authority
+ Migration, Reconciliation, Bootstrap Rollback, and First-Frame Fixture Gate
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