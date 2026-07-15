# Interaction audit: story save commit command and result map

**Timestamp:** `2026-07-15T18-02-58-04-00`  
**Status:** `audited`

## Summary

Current user actions mutate story state and then call a void `saveState()` function. No interaction receives a durable acceptance, conflict, stale-writer or reset result. The required interaction contract separates gameplay acceptance from save acceptance and provides explicit outcomes without replaying the original action.

## Plan ledger

**Goal:** map every save-producing interaction to a typed durable result and a safe conflict path.

- [x] Enumerate save-producing actions.
- [x] Separate story acceptance from durable-save acceptance.
- [x] Define command identities and statuses.
- [x] Define cross-document reconciliation behavior.
- [ ] Implement and test the result map.

## Current action map

```txt
DOM inspection click
  -> inspectHotspot
  -> story mutation accepted
  -> renderUi
  -> saveState void

canvas hotspot click
  -> StageKit onHotspot
  -> inspectHotspot
  -> same void save path

Continue click
  -> nextScene
  -> route mutation accepted
  -> render/load scene
  -> saveState void

KeyR
  -> removeItem
  -> reload
  -> initial boot writes fresh state
  -> no reset result
```

## Required command map

```txt
InspectionAccepted
  -> StorySaveCommitCommand(intent=inspection)

RepeatedInspectionAccepted
  -> StorySaveCommitCommand(intent=inspection)

SceneRouteAccepted
  -> StorySaveCommitCommand(intent=route)

BootRepairAccepted
  -> StorySaveCommitCommand(intent=boot-repair)

ResetRequested
  -> StorySaveResetCommand(intent=reset)
```

## Required result map

| Durable status | Interaction handling |
|---|---|
| `StorySaveCommitAccepted` | Mark the accepted story revision durable and broadcast the new head. |
| `StorySaveCommitAcceptedNoChange` | Clear pending state without creating another revision. |
| `StorySaveCommitRejectedStaleBase` | Preserve local visible state, mark conflict and require reconciliation. |
| `StorySaveCommitRejectedWriterLease` | Move the document to read-only or request explicit writer takeover. |
| `StorySaveCommitRejectedExpiredLease` | Stop writes and reacquire only under policy. |
| `StorySaveCommitRejectedResetEpoch` | Do not resurrect pre-reset progress; reload or offer isolated export. |
| `StorySaveCommitRejectedDuplicate` | Reuse the prior result without replaying the mutation. |
| `StorySaveCommitRejectedInvalidEnvelope` | Preserve the last durable head and expose recovery. |
| `StorySaveCommitConflict` | Show explicit conflict state; never last-writer-wins silently. |
| `StorySaveResetAccepted` | Adopt the new reset epoch and initial durable revision. |
| `StorySaveResetRejectedStale` | Preserve the current durable head and explain that the document is stale. |
| `StorySaveCommitFailed` | Keep the story playable, mark persistence unavailable and retain a recovery export when possible. |
| `StorySaveWriterRetired` | Cancel pending writes and prevent later document callbacks from committing. |

## Identity requirements

```txt
StorySaveSlotId
DocumentId
SaveWriterId
SaveWriterGeneration
SaveWriterLeaseId
StorySaveCommitId
StorySaveRevision
StorySaveBaseRevision
StorySaveFingerprint
ResetEpoch
SaveConflictId
```

## Cross-document events

```txt
StorySaveHeadAdvanced
StorySaveWriterLeaseGranted
StorySaveWriterLeaseRevoked
StorySaveConflictObserved
StorySaveResetCommitted
StorySaveWriterRetired
```

## Interaction policy

- A click can accept a story action even when its save is pending.
- The action is not replayed after a save conflict.
- A stale document cannot claim that its visible state is durable.
- Reset is a revisioned command, not only a key deletion.
- Writer takeover must be explicit when another active writer exists.
- External head updates must reconcile before the next local save.

## Validation boundary

No command, result, conflict UI, read-only mode, writer takeover or broadcast event was implemented.