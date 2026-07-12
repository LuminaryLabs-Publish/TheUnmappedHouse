# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path and Three.js presentation while making content, startup, persistence, interaction, transitions, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace raw object spread with typed parse, migration, reconciliation and startup results.

### 2a. Browser Storage Commit and Cross-Tab Convergence Authority
- [ ] Observe storage capability and support explicit volatile mode.
- [ ] Add writer session identity and monotonic snapshot revisions.
- [ ] Require expected predecessor revisions for commits.
- [ ] Add stale-writer rejection and a named manifest-aware conflict policy.
- [ ] Return typed read, commit and reset results.
- [ ] Add `storage` event admission and cross-tab reconciliation.
- [ ] Add a reset barrier so stale tabs cannot resurrect deleted progress.
- [ ] Publish detached storage observations and a bounded effect journal.
- [ ] Correlate durable or volatile revision with narrative and future frames.

### 3. Pointer observation and hotspot-pick authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.

### 4. Inspection and completion proof
- [ ] Record immutable inspection receipts and derive one scene-completion proof.

### 5. Atomic Continue transition
- [ ] Prepare successor story, stage, hotspot, narrative and persistence candidates before mutation.

### 6. Narrative Projection Authority
- [ ] Make DOM and aria-live output consume a typed, revisioned narrative projection.

### 7. Runtime Session Lifecycle and Scene Resource Retirement Authority
- [ ] Add session identity, callback leases, scene-resource generations and ordered disposal.
- [ ] Retain predecessor resources until the first accepted successor frame.

### 8. Render Surface Resolution Authority
- [ ] Separate CSS composition from internal GPU resolution and commit surface revisions.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed Frame Diagnostics Authority
- [ ] Add monotonic frame identity and immutable frame inputs.
- [ ] Return typed stage and post pass results.
- [ ] Commit public frame state only after visible canvas acknowledgement.
- [ ] Correlate story, narrative, durable snapshot and screenshots with frame ids.

## Storage result contract

```txt
StorageCommitResult
  commandId
  writerSessionId
  manifestFingerprint
  expectedRevision
  observedRevision
  committedRevision
  status
  conflictPolicy
  changedKeys
  storageMode
  reason
  resolvedAtMs
```

## Required fixture rows

```txt
storage-capability-available
storage-capability-unavailable-volatile-mode
snapshot-revision-monotonic
expected-predecessor-required
stale-writer-rejected
manifest-mismatch-rejected
clue-merge-policy-explicit
ordered-route-conflict-rejected
write-failure-does-not-claim-durable-success
reset-barrier-prevents-resurrection
storage-event-reconciles-newer-revision
storage-observation-detached-json-safe
storage-journal-bounded
```

## Browser convergence smoke

```txt
open two tabs at revision R0
Tab A commits one inspection
Tab B attempts a stale full-state commit
verify no silent lost update
verify explicit reject or reconcile result
verify both tabs converge on one accepted revision
reset in Tab A
verify Tab B observes the reset barrier
verify Tab B cannot recreate predecessor progress
block writes and verify explicit volatile mode
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime Session Lifecycle and Scene Resource Retirement Authority
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
```
