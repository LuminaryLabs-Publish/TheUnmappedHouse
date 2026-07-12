# Interaction audit: Startup Parse, Admit and Consume Map

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

Browser, interaction and render consumers currently start before a typed manifest/snapshot admission result exists.

## Plan ledger

**Goal:** route every startup consumer through one committed result rather than direct module objects and mutable save fields.

- [x] Map producers and consumers.
- [x] Identify direct raw-descriptor handoffs.
- [x] Define admission ordering.
- [ ] Implement adapters.

## Current map

```txt
story-data.js scenes
  -> createInitialState
  -> currentScene resolution
  -> nextScene array indexing
  -> sceneComplete requirements
  -> renderUi controls
  -> StageKit.loadScene

localStorage bytes
  -> JSON.parse
  -> object spread
  -> mutable state
  -> every gameplay/UI/storage consumer
```

## Required map

```txt
StoryManifestCandidate
  -> ManifestValidationResult
  -> CanonicalStoryManifest

StorageReadResult
  -> SnapshotParseResult
  -> SnapshotMigrationResult
  -> SnapshotReconciliationResult
  -> CanonicalStorySnapshot

StartStoryRuntimeCommand
  -> StoryStartupResult
  -> scene-route adapter
  -> inspection/clue/log adapters
  -> persistence adapter
  -> UI projection adapter
  -> StageKit adapter
  -> first frame acknowledgement
```

## Admission rules

```txt
consumers receive ids and immutable read models
raw descriptors never cross interaction boundaries
startup failure does not construct StageKit
startup failure does not overwrite storage
reconciliation decisions are explicit result fields
duplicate startup commands are idempotent
stale startup generations cannot install
```
