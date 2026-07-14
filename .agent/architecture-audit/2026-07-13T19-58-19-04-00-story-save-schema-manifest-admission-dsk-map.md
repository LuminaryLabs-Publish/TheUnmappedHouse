# Architecture audit: Story-save schema and manifest admission DSK map

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

Save admission is currently embedded inside `browser-story-runtime-kit`. Parsing, fallback, normalization, authored-ID compatibility and live adoption are not separate bounded services.

## Plan ledger

**Goal:** preserve localStorage as an adapter while moving story-state validity and compatibility into one deterministic domain authority.

- [x] Map current owners.
- [x] Separate raw storage, parsing, schema, manifest, migration, adoption and projection concerns.
- [x] Define command, candidate, result and visible acknowledgement surfaces.
- [ ] Implement the DSK family.

## Current ownership

```txt
localstorage-save-kit
  raw read
  JSON parse
  shallow merge
  raw replace
  key deletion

browser-story-runtime-kit
  create initial state
  resolve current scene
  consume clues, inspected, route and log
  project UI

story-data-kit
  current scene, hotspot, clue and completion manifest
```

## Required parent domain

```txt
the-unmapped-house-story-save-schema-manifest-admission-authority-domain
```

The parent coordinates compatibility. It does not absorb storage I/O, story authoring, progression reducers or render implementation.

## Required sub-kits

```txt
identity and evidence
  story-schema-version-kit
  story-manifest-fingerprint-kit
  raw-save-document-kit

admission
  save-document-parser-kit
  story-state-shape-validator-kit
  scene-id-admission-kit
  clue-id-admission-kit
  hotspot-inspection-admission-kit
  route-history-admission-kit
  notebook-log-admission-kit

recovery
  story-save-classification-kit
  story-save-migration-plan-kit
  incompatible-save-quarantine-kit
  malformed-save-fallback-kit
  story-state-normalization-kit

commit and proof
  startup-story-state-candidate-kit
  startup-story-state-adoption-kit
  story-save-admission-result-kit
  story-save-admission-diagnostics-kit
  first-admitted-story-frame-ack-kit
  story-save-admission-fixture-matrix-kit
```

## Command contract

```txt
StorySaveAdmissionCommand
  saveKey
  expectedSchemaVersion
  expectedManifestFingerprint
  startupGeneration
  rawDocumentFingerprint
```

## Result contract

```txt
StorySaveAdmissionResult
  status
  startupGeneration
  sourceClassification
  sourceSchemaVersion
  targetSchemaVersion
  sourceManifestFingerprint
  targetManifestFingerprint
  migrationReceipts
  quarantineReceipt
  canonicalStateFingerprint
  admittedSceneId
  diagnostics
```

Required statuses:

```txt
EmptyInitialized
CurrentAccepted
MigratedAccepted
MalformedQuarantined
IncompatibleQuarantined
UnknownSceneRejected
UnknownIdentifierRejected
ShapeRejected
MigrationFailed
AdoptionFailed
Duplicate
Stale
Cancelled
```

## Composition rule

```txt
raw storage adapter
  -> admission authority
  -> canonical story-state candidate
  -> story runtime adoption
  -> stage/UI/Notebook projection
  -> first admitted-frame acknowledgement
```

No raw parsed value may be published directly to the story runtime.