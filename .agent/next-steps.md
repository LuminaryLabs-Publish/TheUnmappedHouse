# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T23-20-51-04-00`

## Summary

The next implementation should establish a canonical revisioned save envelope and reset tombstone before adding content or relying on multi-tab browser use. The highest-risk defects are silent lost updates, reset resurrection and visible state that can advance without durable proof.

## Plan ledger

**Goal:** replace fire-and-forget whole-snapshot writes with one deterministic save/reset authority and executable convergence proof.

- [ ] Define canonical save and reset envelopes.
- [ ] Add writer, command, revision and fingerprint identity.
- [ ] Require exact predecessor admission.
- [ ] Verify durable write through readback.
- [ ] Add typed storage-failure results.
- [ ] Reconcile and deduplicate storage events.
- [ ] Commit reset tombstones and reject stale resurrection.
- [ ] Correlate accepted commits with visible frames.
- [ ] Add browser and Pages fixture matrices.

## Ordered implementation

### 1. Canonicalize the story snapshot

Reuse the manifest/snapshot validation boundary. Encode only known fields in deterministic order and calculate a stable snapshot fingerprint.

### 2. Add save identity

```txt
storyRunId
saveSessionId
writerId
commandId
saveRevision
resetGeneration
predecessorRevision
predecessorFingerprint
snapshotFingerprint
```

### 3. Introduce `StorySaveCommitCommand`

The command must carry an immutable candidate snapshot and exact predecessor. Reject stale, duplicate or incompatible commands before changing canonical state.

### 4. Verify durability

Write one commit envelope, read it back and verify command ID, revision, reset generation and fingerprint. Publish `COMMITTED` only after exact readback.

### 5. Handle write failures explicitly

Convert `SecurityError`, quota failure, serialization failure and readback mismatch into typed terminal results. Do not claim the visible state is durable.

### 6. Admit storage delivery

Add one `storage` listener that:

```txt
accepts only the configured key
validates commit/reset envelopes
deduplicates by command/commit identity
rejects older revisions
rejects predecessor reset generations
reconciles accepted snapshots through the domain reducer
```

### 7. Replace delete-only reset

Commit a durable `StoryResetTombstone` carrying the next reset generation. Invalidate pending commands and reject any later write from the predecessor generation.

### 8. Order projection after acceptance

Inspection and Continue should prepare candidates. DOM and StageKit projection should consume the accepted save result, or explicitly display a non-durable failure state.

### 9. Add visible-frame receipts

Record `FirstVisibleSaveFrameAck` and `FirstVisibleResetFrameAck` with story run, scene, save revision, reset generation, snapshot fingerprint and render sequence.

### 10. Add fixture matrix

```txt
two tabs write from one predecessor
same command delivered twice
old/new storage events arrive out of order
setItem throws
readback mismatch
reset while another tab remains open
stale post-reset write
reload after accepted commit
reload after reset tombstone
visible frame matches durable revision
```

## Do not combine yet

Keep scene-progression authority, manifest migration, stage-resource lifecycle and WebGL context recovery as separate parent domains. Save convergence coordinates their results but should not absorb their internal rules.