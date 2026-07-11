# Interaction audit: load, save and reset result map

Timestamp: `2026-07-11T08-11-14-04-00`

## Goal

Replace implicit localStorage side effects with explicit commands and results that can be correlated to story revisions and fingerprints.

## Current interaction map

```txt
page boot
  -> loadState()
  -> parsed object or silent initial fallback

inspection / Continue
  -> mutate live state
  -> project DOM and/or stage
  -> saveState()
  -> no result

KeyR
  -> removeItem()
  -> location.reload()
  -> no clear result
```

## Missing commands

```txt
LoadStoryCommand
SaveStoryCommand
ClearStoryCommand
MigrateStoryCommand
ReconcileStoryCommand
```

## Required load result

```txt
StoryLoadResult
  status: missing | accepted | migrated | reconciled | rejected | failed
  reason
  storageKey
  schemaVersion
  manifestId
  manifestFingerprint
  sourceSaveRevision
  committedStoryRevision
  stateFingerprint
  migrationRows[]
  reconciliationRows[]
```

## Required save result

```txt
StorySaveResult
  status: written | unchanged | conflict | failed
  reason
  expectedSaveRevision
  resultingSaveRevision
  storyRevision
  stateFingerprint
  serializedBytes
```

## Required clear result

```txt
StoryClearResult
  status: cleared | already_missing | failed
  reason
  previousSaveRevision
  nextRuntimeAction
```

## Admission policy

- Only an admitted manifest may load or reconcile state.
- Unknown schema versions are rejected unless a registered migration exists.
- Manifest mismatch must follow an explicit reject or reconcile policy.
- Active scene correction must update both runtime and candidate persisted state.
- Unknown ids and forged clue authority must never pass through silently.
- UI and stage projection must identify the committed load or save result.

## Required interaction rows

```txt
missing-save-result-explicit
invalid-json-result-explicit
unsupported-version-result-explicit
migration-result-lists-transforms
reconciliation-result-lists-dropped-data
save-result-follows-storage-success
clear-result-follows-remove-success
reset-does-not-reload-after-clear-failure
result-carries-story-revision-and-fingerprint
```

## Follow-on dependency

Inspection and Continue commands should reuse the same story revision, save revision, manifest fingerprint and typed result vocabulary established here.
