# Persistence audit: save admission, migration and reconciliation contract

Timestamp: `2026-07-11T08-11-14-04-00`

## Current persisted shape

Storage key:

```txt
the-unmapped-house.stage-prototype.v1
```

Stored fields:

```txt
sceneId
clues
flags
inspected
route
log
```

The key carries a version-like suffix, but the value has no envelope or internal version authority.

## Current load behavior

```js
return { ...createInitialState(), ...JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") };
```

This operation proves only that JSON parsing succeeded. It does not prove object shape, collection types, identifier ownership, manifest compatibility or semantic consistency.

## Required envelope

```txt
StorySaveEnvelope
  envelopeVersion
  storyManifestId
  storyManifestFingerprint
  snapshotSchemaVersion
  migrationVersion
  saveRevision
  writtenAt
  snapshot
  stateFingerprint
```

`writtenAt` may be diagnostic only and must not participate in deterministic state fingerprinting.

## Required canonical snapshot

```txt
StorySnapshot
  storyRevision
  phase
  activeSceneId
  routeSceneIds[]
  inspectionReceipts[]
  clueGrantReceipts[]
  completionProofs[]
  notebookRows[]
```

Raw descriptor text, caller-defined grants and derived UI flags should not be persisted as authority.

## Admission stages

```txt
1. read storage result
2. classify missing vs present
3. parse JSON
4. validate envelope shape
5. select schema/migration path
6. verify manifest id and fingerprint policy
7. validate snapshot field types and bounds
8. reconcile scene/hotspot/clue ids
9. normalize collection order
10. recompute derived clues, completion and phase
11. compute state fingerprint
12. commit one StoryLoadResult
```

## Legacy v1 migration

The current raw shape should be supported by one explicit migration adapter:

```txt
sceneId
  -> canonical activeSceneId or explicit correction

route
  -> canonical ordered scene ids

inspected
  -> canonical inspection receipts for known scene/hotspot pairs

clues
  -> ignored as direct authority; reconstruct from admitted inspections

log
  -> normalized bounded notebook rows

flags
  -> migrate only registered keys; otherwise drop with reason
```

## Reconciliation policy

| Input defect | Policy |
|---|---|
| Unknown active scene | Correct to the earliest valid route scene or scene zero and report correction. |
| Unknown route scene | Drop and report. |
| Route order mismatch | Normalize to manifest order and report. |
| Unknown hotspot | Drop and report. |
| Hotspot under wrong scene | Drop and report. |
| Unknown/orphaned clue | Drop direct authority and report. |
| Valid inspected hotspot | Reconstruct canonical inspection and clue receipts. |
| Completion mismatch | Recompute from receipts. |
| Phase mismatch | Recompute from completion/transition state. |

## Write contract

```txt
candidate StorySnapshot
  -> normalize
  -> fingerprint
  -> compare expected save revision
  -> serialize envelope
  -> write localStorage
  -> return StorySaveResult
  -> append bounded persistence journal row
```

A failed write must not advance the committed save revision or report durable success.

## Concurrency policy

A second tab or stale runtime must supply the expected save revision. Mismatch returns `conflict` and does not overwrite the newer envelope.

## Required diagnostics

```txt
last load status and reason
last migration version
reconciliation drop/correction counts
manifest and state fingerprints
story and save revisions
serialized byte count
last write status
bounded persistence journal
```
