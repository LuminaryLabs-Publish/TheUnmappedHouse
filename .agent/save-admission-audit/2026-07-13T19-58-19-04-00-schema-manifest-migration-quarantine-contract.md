# Save-admission audit: Schema, manifest, migration and quarantine contract

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

A parseable localStorage value is not necessarily a valid story save. Admission must validate both data shape and compatibility with the current authored story manifest before any value reaches live reducers.

## Plan ledger

**Goal:** define deterministic acceptance, migration and quarantine behavior for every save document class.

- [x] Define canonical envelope and manifest evidence.
- [x] Define migration and quarantine rules.
- [x] Define bounded normalization.
- [x] Define terminal results and proof.
- [ ] Implement and execute the contract.

## Canonical envelope

```txt
StorySaveEnvelope
  schemaVersion
  storyManifestFingerprint
  storyRunId
  saveRevision
  resetGeneration
  stateFingerprint
  state
    sceneId
    clues[]
    flags{}
    inspected{}
    route[]
    log[]
```

## Manifest fingerprint inputs

```txt
ordered scene IDs
ordered hotspot IDs per scene
ordered clue grant IDs
completion requirements
scene-order progression graph
state-field schema version
```

Visual-only camera, material or copy changes should not invalidate state compatibility unless policy explicitly includes them.

## Admission sequence

```txt
read raw value
  -> preserve raw fingerprint
  -> parse
  -> validate envelope and state shapes
  -> compare schema version
  -> compare story manifest fingerprint
  -> validate all referenced identifiers
  -> migrate if an explicit path exists
  -> normalize bounds and uniqueness
  -> produce canonical candidate
  -> atomically adopt or reject
```

## Migration rules

```txt
migration is explicit from one known version/fingerprint to another
migration is pure and deterministic
migration never mutates the raw document
migration emits per-field receipts
unknown identifiers require an explicit drop/remap/fail policy
migration output is revalidated as current
failed migration publishes no live state
```

## Quarantine rules

```txt
retain raw document and fingerprint separately from the active save key
record classification and diagnostics
never repeatedly retry an unchanged quarantined document without policy
initialize a canonical fallback only after quarantine succeeds or policy accepts evidence loss
surface bounded diagnostics without injecting raw content into HTML
```

## Bounds

```txt
clues: unique current IDs only
route: ordered current scene IDs, bounded to authored scene count
inspected: current scene/hotspot IDs only
log: strings only, maximum 8 entries
flags: plain record with an explicit key policy
unknown top-level fields: reject or migrate, never silently trust
```

## Terminal results

```txt
EmptyInitialized
CurrentAccepted
MigratedAccepted
MalformedQuarantined
IncompatibleQuarantined
ShapeRejected
UnknownIdentifierRejected
MigrationFailed
QuarantineFailed
AdoptionFailed
```

## Required proof

Source, browser, built-output and Pages fixtures must demonstrate deterministic classification, no partial adoption, exact current identifiers, bounded state, canonical writeback and the first visible scene matching the admitted state.