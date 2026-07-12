# Architecture Audit: Story Storage Commit and Convergence DSK Map

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Parent domain

```txt
the-unmapped-house-story-storage-commit-convergence-authority-domain
```

## Current owners

```txt
src/game.js
  -> SAVE_KEY
  -> createInitialState()
  -> loadState()
  -> saveState()
  -> inspectHotspot()
  -> nextScene()
  -> KeyR reset

browser-story-runtime-kit
localstorage-save-kit
inspection-ledger-kit
clue-ledger-kit
scene-route-kit
notebook-log-kit
debug-json-projection-kit
```

## Current authority split

```txt
story mutation
  -> changes live state first
  -> changes DOM/debug state
  -> writes one full JSON value afterward

browser storage
  -> has no capability result
  -> has no writer identity
  -> has no snapshot revision
  -> has no accepted predecessor revision
  -> has no conflict or merge result
  -> has no cross-document reconciliation
```

## Required DSK composition

```txt
story-storage-key-kit
storage-capability-observation-kit
storage-writer-session-id-kit
story-snapshot-revision-kit
storage-read-command-kit
storage-read-result-kit
storage-commit-command-kit
storage-commit-admission-kit
storage-compare-and-swap-kit
storage-conflict-detection-kit
storage-conflict-policy-kit
storage-merge-plan-kit
storage-commit-result-kit
storage-reset-command-kit
storage-reset-result-kit
storage-event-adapter-kit
cross-tab-reconciliation-kit
storage-effect-journal-kit
storage-observation-kit
storage-unavailable-fixture-kit
cross-tab-lost-update-fixture-kit
reset-propagation-fixture-kit
browser-storage-convergence-smoke-kit
```

## Required commit transaction

```txt
CommitStorySnapshotCommand
  -> validate runtime session, manifest, snapshot and writer identity
  -> observe current durable revision
  -> compare expected predecessor revision
  -> reject, merge or supersede under one named policy
  -> serialize one immutable candidate
  -> attempt the storage effect
  -> read back or otherwise verify the accepted durable revision
  -> return one StorageCommitResult
  -> publish detached storage observation and journal row
```

## Required reset transaction

```txt
ResetStorySnapshotCommand
  -> validate session and reset intent
  -> observe current durable revision
  -> remove or tombstone the snapshot
  -> publish one ResetResult
  -> notify active runtime and other tabs
  -> return to one admitted initial snapshot
```

## Invariants

```txt
live story state never claims durable success without a commit result
one commit cites its expected predecessor revision
stale writers cannot silently replace newer durable progress
cross-tab updates produce an explicit reconcile, reject or merge result
storage unavailable and quota failures are typed outcomes
reset is a revisioned effect, not an unobserved removeItem call
debug and future frame receipts cite the durable revision when persistence is claimed
```
