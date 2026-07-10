# Save-system audit: source reconciliation and terminal-state gap

Timestamp: `2026-07-10T15-58-47-04-00`

## Current save path

```txt
SAVE_KEY = the-unmapped-house.stage-prototype.v1
loadState()
  -> JSON.parse(localStorage value or {})
  -> shallow spread over createInitialState()
  -> on parse error, return initial state

saveState()
  -> JSON.stringify(live state)
  -> localStorage.setItem

reset
  -> localStorage.removeItem
  -> location.reload
```

## Current payload

```txt
sceneId
clues[]
flags{}
inspected{}
route[]
log[]
```

## Confirmed gaps

- The storage key contains a version marker, but the payload has no schema version.
- The payload has no story source id or source fingerprint.
- Valid JSON with invalid nested types is shallow-merged and may break runtime assumptions.
- An unknown saved `sceneId` falls back to the first source scene for `currentScene`, but the stored `state.sceneId` is not reconciled immediately.
- Saved clue ids, scene ids, route ids, and inspected hotspot ids are not validated against current source descriptors.
- Route order and uniqueness are not validated.
- Interlude pending/open state is not saved because it exists only in timer/DOM state.
- Terminal completion is not saved because the final continue only writes DOM copy.
- Save writes have no command, result, transaction, or effect correlation.
- Write, clear, parse, validation, repair, and failure observations do not exist.

## Required save envelope

```txt
SaveEnvelope
  schemaVersion
  sourceId
  sourceFingerprint
  savedAtTransactionId
  state

SaveLoadObservation
  loadId
  key
  found
  parseStatus
  schemaStatus
  sourceStatus
  reconciliationStatus
  repairedFields[]
  rejectedFields[]
  restoredStateId

SaveWriteObservation
  writeId
  effectId
  key
  stateId
  byteLength
  status
  errorCode?

SaveClearObservation
  clearId
  effectId
  key
  status
  errorCode?
```

## Reconciliation policy

```txt
missing payload              -> initial state
invalid JSON                 -> initial state + parse_failed observation
unknown schema               -> reject or migrate explicitly
source fingerprint mismatch  -> reconcile ids or invalidate explicitly
unknown scene id             -> first scene + repaired field row
unknown clue id              -> remove + repaired field row
unknown inspected ids        -> remove + repaired field row
invalid route                -> rebuild legal prefix
interlude_open mismatch      -> recompute from completion/lifecycle rules
terminal mismatch            -> validate final scene and route before restore
```

## Required fixture rows

```txt
empty-storage-initial-state
valid-save-round-trip
invalid-json-recovery
valid-json-invalid-types
unknown-scene-repair
unknown-clue-repair
invalid-route-repair
source-fingerprint-mismatch
interlude-open-round-trip
terminal-round-trip
write-failure-observed
clear-failure-observed
```

## Next safe save cut

Introduce an adapter around localStorage and source-owned reconciliation before changing the storage key or deleting legacy v1 saves.