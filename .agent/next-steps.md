# Next steps: The Unmapped House story-save schema and manifest admission

**Timestamp:** `2026-07-13T19-58-19-04-00`  
**Status:** `audited`

## Summary

Build pure schema and manifest-admission functions before changing storage or live reducers. The first implementation slice should classify raw documents, normalize a canonical current state and keep malformed or incompatible values outside the live save key.

## Plan ledger

**Goal:** prevent raw persistence values from entering live story state while preserving valid saves and explicit migrations.

- [ ] Define `STORY_SCHEMA_VERSION`.
- [ ] Derive a stable state-relevant story manifest and fingerprint.
- [ ] Add a strict `StorySaveEnvelope`.
- [ ] Implement `parseStorySave(raw)` with typed parse results.
- [ ] Implement `validateStoryState(candidate, manifest)`.
- [ ] Validate scene, clue, route and inspected hotspot identifiers.
- [ ] Normalize duplicates and bounded collections only through explicit policy.
- [ ] Add versioned pure migrations.
- [ ] Add incompatible and malformed quarantine storage.
- [ ] Return one terminal `StorySaveAdmissionResult`.
- [ ] Adopt state and current scene together.
- [ ] Persist only the canonical admitted envelope.
- [ ] Gate interactions until admission and first projection complete.
- [ ] Publish `FirstAdmittedStoryFrameAck`.
- [ ] Add source, browser, built-output and Pages fixtures.

## Ordered implementation

### 1. Build the manifest

```txt
state-relevant manifest
  ordered scene IDs
  hotspot IDs per scene
  clue grant IDs
  completion requirements
  scene progression order
```

### 2. Parse without trust

Return `Empty`, `Parsed`, `Malformed` or `UnsupportedTopLevel` without mutating state or storage.

### 3. Validate shape and identity

```txt
sceneId: current scene ID
clues: unique current clue IDs
flags: explicit plain-record policy
inspected: current scene/hotspot boolean records
route: bounded current scene ID array
log: maximum eight strings
```

### 4. Classify compatibility

```txt
Current
Migratable
Incompatible
Malformed
Empty
```

### 5. Migrate or quarantine

Migrations must be pure, version-to-version and revalidated. Quarantine must retain raw evidence separately and prevent unchanged invalid data from re-entering startup.

### 6. Adopt atomically

Story state, `currentScene`, stage scene, UI and Notebook must derive from the same canonical candidate and startup generation.

### 7. Prove the first frame

`FirstAdmittedStoryFrameAck` must cite schema version, manifest fingerprint, state fingerprint, scene ID, stage generation, UI revision and frame sequence.

## Required fixtures

```txt
empty save
malformed JSON
primitive and array top-level values
wrong-type collection fields
unknown scene, clue and hotspot IDs
orphan IDs after content revision
current valid save
known schema migration
known identifier remap
unknown schema or manifest
migration and quarantine failures
canonical initial fallback
first inspection after fallback
next scene after migration
reload after canonical writeback
first visible admitted scene
built artifact and Pages origin
```

## Do not combine yet

Keep durable commit/reset concurrency, scene-transition composition, viewport, provider admission, hotspot picking and stage-resource lifetime as bounded authorities. Save admission produces a canonical state candidate consumed by those systems.