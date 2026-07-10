# Persistence audit: save envelope and reconciliation contract

Timestamp: `2026-07-10T19-00-19-04-00`

## Current persistence path

```txt
localStorage.getItem(SAVE_KEY)
  -> JSON.parse
  -> shallow merge over createInitialState()
  -> direct mutation during play
  -> JSON.stringify(state)
  -> localStorage.setItem
```

The `catch` path handles invalid JSON only. Any syntactically valid value is accepted, including wrong field types and stale ids.

## Current failure examples

```txt
{"clues": null}
  -> hasClue calls null.includes and fails

{"route": "library-blank-map"}
  -> nextScene calls string.includes with different semantics

{"inspected": []}
  -> array is accepted as object-like state

{"sceneId": "removed-scene"}
  -> first scene renders as fallback while invalid id remains persisted

{"clues": ["clue:future-content"]}
  -> unknown clue survives without source validation

{"inspected": {"library-blank-map": {"removed-hotspot": true}}}
  -> stale inspection survives indefinitely
```

## Proposed envelope

```txt
StorySaveEnvelope {
  saveSchemaVersion,
  manifestId,
  sourceFingerprint,
  createdWithSourceFingerprint,
  updatedAtSequence,
  migrationHistory,
  payload
}
```

## Canonical payload

Prefer facts that can be reconciled and derived:

```txt
currentSceneId
routeSceneIds
inspectionProofs or canonical inspected scene/hotspot ids
storyFlags
notebookEntries
lifecycleState
terminalState
```

Avoid treating derived clue arrays as independent authority. Recompute them from the current source manifest and canonical inspection facts.

## Load decision

```txt
parse raw storage
  -> validate envelope shape/version
  -> compare source fingerprint
  -> validate payload field types and bounds
  -> reconcile ids against current manifest
  -> derive clue state
  -> validate route and lifecycle
  -> return canonical state plus load result
```

## Load statuses

```txt
accepted
initialized
migrated
repaired
reset
rejected_future_version
rejected_unrecoverable
```

## Repair rows

```txt
scene_id_repaired
unknown_scene_removed
unknown_hotspot_removed
unknown_clue_removed
route_rebuilt
inspection_normalized
clues_rederived
log_trimmed
flags_normalized
lifecycle_repaired
terminal_repaired
source_migrated
```

Every repair row should include the path, prior value summary, resulting value summary and stable reason without embedding unbounded source/save data.

## Content-drift policy

```txt
same fingerprint
  -> validate and accept/repair

known compatible fingerprint
  -> run explicit migration map

unknown older fingerprint
  -> retain only canonical ids still present, rebuild derived state, mark repaired

future save schema
  -> do not guess; reject and preserve raw backup metadata

unrecoverable payload
  -> reset to source-derived initial state with explicit result
```

## Round-trip requirements

```txt
canonical load -> save -> load produces same state fingerprint
repaired load -> save removes stale data permanently
terminal lifecycle survives reload
interlude lifecycle has explicit restore/cancel policy
reset creates the canonical source-derived initial state
```

## Required fixtures

```txt
empty storage
current valid envelope
legacy raw payload
malformed JSON
JSON scalar
wrong field types
unknown scene/hotspot/clue ids
removed content
renamed content through explicit migration
future save schema
stale source fingerprint
terminal reload
round-trip fingerprint stability
```
