# Interaction Audit: Storage Command and Result Map

**Timestamp:** `2026-07-12T04-44-36-04-00`

## Current interaction effects

| Interaction | Live mutation | Storage effect | Result |
|---|---|---|---|
| Boot | Load or create mutable state | Unconditional full-state write | None |
| First inspection | Inspected, clues, log, DOM/debug | Full-state write | None |
| Re-read | Log and DOM/debug | Full-state write | None |
| Continue | Scene, route, log, stage and DOM/debug | Full-state write | None |
| Reset key | No typed state transition | `removeItem`, then reload | None |
| Other-tab write | No local handler | Browser storage event may occur | Ignored |

## Required command map

```txt
LoadStorySnapshotCommand
  -> StorageReadResult
  -> SnapshotParseResult
  -> SnapshotReconciliationResult
  -> StartupCommitResult

CommitInspectionCommand
  -> InspectionResult
  -> StorageCommitCommand(expectedRevision)
  -> StorageCommitResult
  -> Narrative/Frame projection

ContinueSceneCommand
  -> SceneTransitionResult
  -> StorageCommitCommand(expectedRevision)
  -> StorageCommitResult
  -> first successor frame

ResetStoryCommand
  -> StorageResetResult
  -> initial snapshot result
  -> first reset frame

StorageEventObservation
  -> validate key, writer and revision
  -> ignore own/old revision or reconcile remote revision
  -> CrossTabReconciliationResult
```

## Admission rules

```txt
reject malformed storage events
reject revisions older than the active accepted revision
reject commits with the wrong predecessor revision
never merge sceneId or route by accidental object spread
merge clues/inspection only under an explicit manifest-aware policy
never allow a reset predecessor to resurrect after a reset barrier
surface volatile mode when durable storage is unavailable
```

## Required detached result fields

```txt
commandId
writerSessionId
manifestFingerprint
expectedRevision
observedRevision
committedRevision
status
conflictPolicy
changedKeys
reason
resolvedAtMs
```
