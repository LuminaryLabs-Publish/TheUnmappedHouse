# Persistence audit: save schema and reconciliation contract

Timestamp: `2026-07-10T22-21-17-04-00`

## Current save behavior

Save key:

```txt
the-unmapped-house.stage-prototype.v1
```

Current load:

```txt
JSON.parse(raw or "{}")
  -> shallow spread over createInitialState()
  -> return without validation
```

Current write:

```txt
JSON.stringify(mutable state)
  -> localStorage.setItem()
```

## Current risks

- Parsed objects can replace arrays and records with incompatible types.
- Unknown `sceneId` silently falls back for `currentScene`, while `state.sceneId` remains stale until a later transition.
- Route rows can be arbitrary or out of source order.
- Global clues can reference removed, renamed or future-scene content.
- Inspection rows can reference unknown scenes and hotspots.
- No source revision determines whether a save is compatible.
- No story phase reconstructs pending/open interludes or terminal state.
- No typed load/write result exists.
- Storage write failures are not represented.

## Proposed envelope

```json
{
  "schemaVersion": 2,
  "manifestId": "the-unmapped-house.prototype",
  "sourceFingerprint": "...",
  "saveRevision": 12,
  "savedAt": 0,
  "snapshot": {
    "sceneId": "library-blank-map",
    "storyPhase": "exploring",
    "inspectedByScene": {},
    "completionProofByScene": {},
    "route": ["library-blank-map"],
    "notebookLog": [],
    "pendingInterlude": null,
    "terminalState": null,
    "stateRevision": 0,
    "stateFingerprint": "..."
  }
}
```

## Load result

```txt
status: accepted | migrated | repaired | reset | failed
reason
schemaVersionBefore
schemaVersionAfter
sourceFingerprintBefore
sourceFingerprintAfter
repairRows[]
stateFingerprint
```

## Reconciliation rules

1. Reject or repair non-object envelopes.
2. Migrate the existing v1 state shape explicitly.
3. Resolve scene ids through the active manifest.
4. Keep only canonical scene/hotspot inspection rows.
5. Derive completion proof from valid scene-scoped evidence.
6. Rebuild route from canonical source order up to the active scene.
7. Normalize and cap notebook rows.
8. Reconstruct interlude/terminal projection from persisted phase.
9. Increment save revision only after a committed story transaction.
10. Return JSON-safe repair evidence.

## Required fixtures

```txt
empty-storage-creates-v2-envelope
legacy-v1-migrates
invalid-json-resets
wrong-field-types-repair
unknown-scene-repairs
unknown-inspection-rows-remove
unknown-clues-do-not-create-completion
route-order-rebuilds
completed-scene-restores-interlude-phase
terminal-state-restores
save-write-failure-returns-failed-result
```
