# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T10-30-00-04-00`

## Goal

Preserve the current three-scene story and Three.js presentation while making content, persistence, interaction, reset, delayed completion, modal focus, transitions, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest
- [ ] Add stable manifest identity, versions, indexes, validation, freeze and fingerprint.

### 2. Versioned StorySnapshot startup authority
- [ ] Replace raw object spread with typed parse, migration, reconciliation and startup results.

### 2a. Browser Storage Commit and Cross-Tab Convergence Authority
- [ ] Add writer identity, monotonic revisions, expected-predecessor checks and conflict policy.
- [ ] Add typed read, commit and reset effects.
- [ ] Add reset tombstones so stale tabs cannot resurrect deleted progress.
- [ ] Correlate durable or volatile revision with narrative and frames.

### 2b. Destructive Reset Admission Authority
- [ ] Replace the global raw `KeyR` effect with a typed `ResetStoryCommand`.
- [ ] Explicitly reject `Ctrl+R`, `Meta+R` and unsupported modifier chords.
- [ ] Reject repeated, untrusted, hidden-page and invalid-focus events.
- [ ] Require an explicit confirmation capability.
- [ ] Include expected story and storage revisions.
- [ ] Allocate one reset command id and generation.
- [ ] Install a durable reset tombstone and stale-writer barrier.
- [ ] Cancel completion timers and retire runtime ownership before storage deletion.
- [ ] Return typed storage-reset and reload results.
- [ ] Acknowledge the first clean boot and visible frame.
- [ ] Publish detached observations and a bounded reset journal.

### 3. Pointer observation and hotspot-pick authority
- [ ] Unify canvas and side-panel activation around canonical id-only commands.

### 4. Inspection and completion proof
- [ ] Record immutable inspection receipts and derive one scene-completion proof.

### 4a. Completion Timer Generation Authority
- [ ] Replace raw delayed callbacks with identity, generation, leases and stale rejection.

### 4b. Modal Focus and Continue Admission Authority
- [ ] Make closed controls inert and require a current unconsumed completion proof.

### 5. Atomic Continue transition
- [ ] Prepare and atomically commit successor story, stage, narrative and persistence candidates.

### 6. Narrative Projection Authority
- [ ] Make DOM and aria-live output consume one typed revisioned projection.

### 7. Runtime Session Lifecycle and Scene Resource Retirement Authority
- [ ] Add session identity, callback leases, resource generations and ordered disposal.

### 8. Render Surface Resolution Authority
- [ ] Separate CSS composition from internal GPU resolution and commit surface revisions.

### 9. WebGL Context Recovery Authority
- [ ] Coordinate context loss, restoration and replacement resource generations.

### 10. Committed Frame Diagnostics Authority
- [ ] Commit public frame state only after visible canvas acknowledgement.

## Reset command contract

```txt
ResetStoryCommand
  commandId
  resetGeneration
  sourceKind
  trustedEvent
  modifierState
  confirmationCapabilityId
  expectedSceneId
  expectedStoryRevision
  expectedStorageRevision
  requestedAtMs
```

```txt
ResetStoryResult
  commandId
  resetGeneration
  status
  reason
  priorStoryRevision
  priorStorageRevision
  tombstoneRevision
  timerRetirementResult
  runtimeRetirementResult
  storageEffectResult
  reloadResult
  firstCleanFrameId
```

## Required fixture rows

```txt
plain-r-without-confirmation-rejected
ctrl-r-classified-as-browser-refresh
meta-r-classified-as-browser-refresh
browser-refresh-performs-zero-storage-mutation
repeat-keydown-rejected
untrusted-event-rejected
hidden-page-reset-rejected
stale-story-revision-rejected
stale-storage-revision-rejected
confirmed-reset-installs-tombstone
stale-tab-cannot-resurrect-reset-save
storage-remove-failure-does-not-report-success
pending-timers-retired-before-reset
runtime-retired-before-reload
first-clean-frame-cites-reset-generation
reset-observation-detached
reset-journal-bounded
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot Startup Authority
2a. Browser Storage Commit and Cross-Tab Convergence Authority
2b. Destructive Reset Admission Authority
3. Pointer and Hotspot-Pick Authority
4. Inspection and Completion Authority
4a. Completion Timer Generation Authority
4b. Modal Focus and Continue Admission Authority
5. Atomic Continue Transition
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
