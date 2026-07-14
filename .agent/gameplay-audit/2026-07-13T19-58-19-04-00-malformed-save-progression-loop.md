# Gameplay audit: Malformed-save progression loop

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

Progression reducers assume that every collection loaded from storage has the current shape. The first interaction that touches a malformed field can crash after the page has already rendered, while string values can also satisfy `includes()` with substring semantics.

## Plan ledger

**Goal:** prevent untrusted persistence data from entering clue, inspection, route or Notebook reducers.

- [x] Trace every persisted field to its mutating consumers.
- [x] Identify crash and semantic-divergence paths.
- [x] Define canonical field rules.
- [ ] Execute malformed-state progression fixtures.

## Field map

| Field | Canonical shape | Current consumers | Failure mode |
|---|---|---|---|
| `sceneId` | current authored scene ID | startup resolution, next-scene mutation | durable/visible mismatch when unknown. |
| `clues` | unique current clue ID array | `includes`, `push`, completion | crash for non-array object; substring behavior for strings. |
| `flags` | plain record | retained state | unknown shape admitted. |
| `inspected` | scene-to-hotspot boolean records | lookup and assignment | null/primitive values can break lookup or mutation. |
| `route` | current scene ID array | `includes`, `push` | next-scene crash or orphan route history. |
| `log` | bounded string array | `unshift`, `slice` | inspection crash or non-text payload retention. |

## Reachable loop

```txt
malformed save parses successfully
  -> page may render
  -> player inspects a hotspot
  -> reducer calls includes(), push(), unshift() or nested assignment
  -> exception interrupts render/save/interlude progression
  -> no typed rejection or recovery result
```

## Required canonical rules

```txt
sceneId must resolve exactly or be migrated/fallbacked before adoption
clues must be deduplicated current clue IDs
flags must be a plain bounded record
inspected must contain current scene/hotspot IDs and boolean values only
route must be an ordered bounded list of current scene IDs
log must be a bounded list of strings
unknown fields must be rejected, preserved only in quarantine, or explicitly migrated
```

## Required fixtures

```txt
null and primitive top-level documents
wrong-type clues, inspected, route and log
unknown scene, hotspot and clue identifiers
orphan identifiers after story-data revision
oversized arrays and records
duplicate identifiers
migratable predecessor schema
migration failure
quarantine then canonical initial progression
first inspection and next-scene commands after admission
```

No gameplay behavior changed during this audit.