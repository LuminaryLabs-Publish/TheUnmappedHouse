# Next steps: The Unmapped House

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Preserve the current three-scene story, copy, 450 ms pacing, fixed composition, and visible rendering while making manifest admission, persistence, inspection, completion, Continue, resource ownership, and first-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest

- [ ] Add stable manifest id, schema version, and fingerprint.
- [ ] Validate unique scene ids and scene-scoped hotspot ids.
- [ ] Build canonical scene, hotspot, clue, requirement, and successor indexes.
- [ ] Deep-freeze admitted definitions.

### 2. Versioned StorySnapshot

- [ ] Replace the raw `.v1` object with a versioned envelope.
- [ ] Add typed load, migration, reconciliation, save, and clear results.
- [ ] Add `storyRevision`, `saveRevision`, explicit story phase, and state fingerprint.
- [ ] Keep live state unchanged on load/save failure.

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
- [ ] Reserve a transition id and the completion proof before preparation.
- [ ] Build a successor StorySnapshot candidate without mutating live state.
- [ ] Prepare successor Three.js resources in a detached stage group.
- [ ] Return a typed stage-preparation result with resource inventory and candidate stage epoch.
- [ ] Persist the candidate snapshot before publishing live successor state.
- [ ] Atomically commit story identity, route, DOM projection, stage group, camera, fog, hotspots, post settings, story revision, and stage epoch.
- [ ] Acknowledge the first visible successor frame.
- [ ] Retire predecessor geometry, materials, hotspots, and scene resources only after acknowledgement.
- [ ] Consume the completion proof only on successful commit.
- [ ] Dispose detached successor resources and restore predecessor authority on failure.
- [ ] Publish typed immutable `ContinueResult` and bounded transition journal rows.
- [ ] Persist an explicit terminal phase when no successor scene exists.

### 5. Runtime lifecycle

- [ ] Add stable `sessionId` and monotonic `sessionGeneration`.
- [ ] Fence interaction, timeout, and frame work to the current generation.
- [ ] Retain RAF, listener, timeout, stage, renderer, canvas, and context leases.
- [ ] Add ordered idempotent stop, reset, and dispose results.

### 6. Committed-frame diagnostics

- [ ] Correlate frame id, story revision, stage epoch, transition id, camera, hotspot set, and post settings.
- [ ] Expose detached clone-safe observations.
- [ ] Record first-frame and resource-retirement acknowledgements.

## Required transition fixture rows

```txt
continue-requires-unconsumed-completion-proof
continue-rejects-incomplete-scene
continue-rejects-stale-story-revision
continue-rejects-stale-stage-epoch
continue-rejects-duplicate-sequence
continue-reserves-one-transition-id
successor-story-built-off-line
successor-stage-prepared-detached
stage-prepare-failure-keeps-predecessor-live
partial-successor-resources-disposed-on-failure
persistence-failure-keeps-predecessor-story-stage-dom
atomic-commit-advances-story-and-stage-once
completion-proof-consumed-once-after-commit
first-successor-frame-correlates-transition
predecessor-retired-after-frame-ack
repeat-continue-cannot-skip-scene
terminal-transition-persists-terminal-phase
continue-result-detached-and-json-safe
transition-journal-bounded
```

## Browser failure smoke

```txt
complete scene one and capture predecessor identities
inject successor geometry construction failure
click Continue and verify scene one remains visible and persisted
retry after removing failure and verify one successor commit
verify first visible scene-two frame matches transition id and stage epoch
verify predecessor resource retirement occurs after frame acknowledgement
double-click Continue and verify scene three is not skipped
complete final scene and verify durable terminal phase
```

## Implementation order

```txt
1. StoryManifest authority
2. StorySnapshot and persistence authority
3. Inspection and scene-completion proof authority
4. Atomic Continue transition authority
5. Runtime session lifecycle
6. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Atomic Continue Transition Authority
+ Rollback, Resource Retirement, and First-Successor-Frame Fixture Gate
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