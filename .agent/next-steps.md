# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Goal

Preserve the current three-scene story and anime-horror presentation while making content, persistence, interaction, notebook projection, lifecycle and rendering deterministic, bounded and observable.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace raw object spread with typed parse, migration, reconciliation and startup results.

### 3. Browser storage and reset authority
- [ ] Add writer identity, monotonic revisions, expected-predecessor checks and conflict policy.
- [ ] Replace raw `KeyR` deletion with confirmed reset admission and a durable tombstone.

### 4. Interaction and progression authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.
- [ ] Record immutable inspection receipts and derive one scene-completion proof.
- [ ] Replace raw completion timers with identity, generation, leases and stale rejection.
- [ ] Make modal controls inert while closed and require a current completion proof.
- [ ] Atomically commit successor story, stage, narrative and persistence candidates.

### 5. Narrative projection authority
- [ ] Make title, body, hotspot controls, aria-live output and terminal copy consume one typed revisioned projection.

### 6. Notebook Observability Projection Authority
- [ ] Add `NotebookSurfaceId`, projection id and projection revision.
- [ ] Define player, developer and support/export channel kinds.
- [ ] Admit developer diagnostics only through explicit build and capability policy.
- [ ] Classify story fields as player-safe, developer-only or prohibited.
- [ ] Add immutable redaction profiles with versioned internal-id mapping.
- [ ] Project authored player notebook entries independently from diagnostics.
- [ ] Build diagnostic models without reusing the public Notebook contract.
- [ ] Reject stale story and projection revisions.
- [ ] Commit one typed projection result.
- [ ] Publish detached observations and a bounded journal.
- [ ] Acknowledge the first visible notebook frame.

### 7. Runtime lifecycle authority
- [ ] Add session identity, callback leases, resource generations and ordered disposal.

### 8. Render Surface Resolution Authority
- [ ] Add surface identity, bounded planning, WebGL capability admission, allocation readback, rollback, retirement and first-visible-frame proof.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed Frame Diagnostics Authority
- [ ] Commit public frame state only after visible canvas acknowledgement.

## Notebook projection contracts

```txt
NotebookProjectionCommand
  commandId
  expectedStoryRevision
  expectedProjectionRevision
  sceneGeneration
  requestedChannel
  capabilityToken
  requestedProfileId
  requestedAtMs
```

```txt
NotebookProjectionPlan
  planId
  storyRevision
  sceneGeneration
  channel
  classificationRevision
  redactionProfileId
  redactionProfileRevision
  includedFields
  redactedFields
  omittedFields
  playerEntries
  diagnosticModel
```

```txt
NotebookProjectionResult
  resultId
  planId
  status
  priorProjectionRevision
  committedProjectionRevision
  channel
  appliedProfileId
  includedFields
  redactedFields
  omittedFields
  firstVisibleFrameId
```

## Required fixture rows

```txt
public-player-build-renders-authored-notebook-only
developer-channel-requires-explicit-admission
public-channel-rejects-developer-only-fields
internal-scene-and-clue-ids-map-or-redact
unknown-field-classification-rejected
stale-story-revision-rejected
stale-projection-revision-rejected
player-and-developer-models-are-independent
projection-result-is-detached-and-json-safe
first-visible-frame-cites-story-and-projection-revisions
projection-journal-is-bounded
pages-public-build-contains-no-unadmitted-debug-json
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
3. Browser Storage and Reset Authority
4. Interaction and Progression Authorities
5. Narrative Projection Authority
6. Notebook Observability Projection Authority
7. Runtime Lifecycle Authority
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed Frame Diagnostics Authority
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
adding more raw fields to #state-debug
```

The next notebook-specific implementation should begin with a pure field-classification and projection function before changing the DOM or public Pages build.