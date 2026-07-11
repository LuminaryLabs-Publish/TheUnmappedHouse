# Architecture audit: StorySnapshot startup admission DSK map

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

The repository has authored story descriptors and a mutable browser save, but no admitted StoryManifest, versioned StorySnapshot, typed persistence boundary, or atomic startup transaction. Startup currently treats raw localStorage fields as runtime authority before renderer and stage ownership are safely established.

## Plan ledger

**Goal:** define one composed domain that converts raw storage into an admitted, canonical, fingerprinted StorySnapshot and commits it with stage, UI, persistence, and first-frame evidence.

- [x] Identify existing source owners.
- [x] Separate raw storage, parse, schema, migration, semantic, reconciliation, bootstrap, render, and result responsibilities.
- [x] Preserve StoryManifest authority as the prerequisite source of canonical scene, hotspot, clue, route, and successor identity.
- [x] Define DSK composition and ownership boundaries.
- [x] Define typed command, result, journal, rollback, and fixture surfaces.
- [ ] Implement the domain.

## Current ownership map

```txt
src/story-data.js
  -> authored scene order and descriptors
  -> no schema version, manifest id, fingerprint, indexes or validation

src/game.js loadState()
  -> raw getItem
  -> JSON.parse
  -> broad catch
  -> shallow merge into defaults
  -> no typed result or retained raw candidate

src/game.js module boot
  -> separate currentScene fallback
  -> StageKit allocation and live stage construction
  -> UI projection with assumed field shapes
  -> unconditional saveState()

src/stage-kit.js constructor
  -> renderer, canvas, target, post resources, listeners and RAF
  -> starts before StorySnapshot admission succeeds
```

## Required parent domain

```txt
the-unmapped-house-story-snapshot-startup-authority-domain
```

## DSK composition

### Manifest authority

```txt
story-manifest-schema-kit
story-manifest-index-kit
story-manifest-fingerprint-kit
```

Owns stable manifest identity, schema version, unique scene ids, scene order, canonical successors, scene-scoped hotspot ids, known clues, completion requirements, descriptor validation, deep freeze, and fingerprint.

### Raw persistence ingress

```txt
story-save-raw-read-kit
story-save-envelope-kit
story-save-parse-kit
corrupt-save-quarantine-kit
```

Owns the storage key, raw value, read status, parse status, rejected raw retention, and detached envelope candidate. It must never overwrite rejected input as a side effect of reading.

### Version and migration

```txt
story-save-migration-kit
story-snapshot-schema-kit
```

Owns supported schema versions, ordered pure migrations, required fields, structural field types, defaults, revision fields, and migration receipts.

### Semantic admission and reconciliation

```txt
story-snapshot-semantic-admission-kit
story-snapshot-reconciliation-kit
story-snapshot-fingerprint-kit
```

Owns canonical scene identity, route consistency, known scene/hotspot inspection ids, known clues, clue provenance, phase consistency, revision monotonicity, bounded log state, canonical ordering, reconciliation policy, and snapshot fingerprint.

### Bootstrap transaction

```txt
bootstrap-candidate-kit
bootstrap-stage-preparation-kit
bootstrap-commit-kit
bootstrap-rollback-kit
first-bootstrap-frame-ack-kit
```

Owns detached startup candidate state, stage-resource preparation, UI candidate projection, persistence candidate, one atomic bootstrap generation, failure disposal, and the first visible frame correlated to the accepted snapshot and stage epoch.

### Results and observation

```txt
story-load-result-kit
story-save-result-kit
story-persistence-journal-kit
```

Owns detached immutable results, reason catalog, fingerprints, migration rows, reconciliation rows, rollback evidence, current committed snapshot pointer, and bounded journal output.

### Proof

```txt
story-snapshot-fixture-kit
browser-bootstrap-failure-smoke-kit
```

Owns pure admission fixtures and browser failure injection across storage, stage allocation, projection, save, commit, rollback, first frame, retry, and reset.

## Canonical save envelope

```txt
StorySaveEnvelope
  schemaVersion
  manifestId
  manifestFingerprint
  saveId
  saveRevision
  storyRevision
  snapshotFingerprint
  snapshot
```

## Canonical StorySnapshot

```txt
StorySnapshot
  phase: active | interlude | terminal
  sceneId
  route[]
  inspectedByScene
  clueReceipts[]
  flags
  log[]
  completionProof?
  storyRevision
```

The exact field representation may change, but the admitted snapshot must be detached, canonical, bounded, immutable, and fingerprinted.

## Load result

```txt
StoryLoadResult
  status:
    absent_defaulted |
    loaded |
    migrated |
    reconciled |
    rejected_malformed |
    rejected_schema |
    rejected_manifest |
    rejected_semantic |
    storage_unavailable |
    prepare_failed |
    persistence_failed |
    commit_failed |
    rolled_back |
    committed
  manifestId
  manifestFingerprint
  rawReadId
  saveId?
  schemaVersion?
  migrationReceipts[]
  reconciliationReceipts[]
  snapshotFingerprint?
  bootstrapGeneration?
  stageEpoch?
  firstVisibleFrameId?
  rollbackResult?
```

## Authority flow

```txt
admit StoryManifest
  -> read raw save and retain exact bytes/string
  -> parse detached envelope
  -> validate version and manifest identity
  -> migrate known version
  -> validate structural schema
  -> validate semantic relationships
  -> reconcile only through explicit deterministic policy
  -> canonicalize and fingerprint snapshot
  -> prepare stage and UI off-line
  -> stage typed save candidate if persistence is required
  -> atomically commit story, stage, UI and bootstrap generation
  -> acknowledge first visible frame
  -> publish immutable load result and journal row
```

## Failure invariant

```txt
No rejected or failed candidate may:
  mutate the committed StorySnapshot
  overwrite the raw save
  expose a partial stage
  leave listeners or RAF chains alive
  publish a false ready state
  advance save or story revisions
```

## Dependency order

```txt
1. StoryManifest authority
2. StorySnapshot startup admission and typed persistence
3. Inspection and completion-proof authority
4. Atomic Continue transition
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Validation boundary

The domain is not implemented. No current test proves malformed-save retention, semantic rejection, migration, reconciliation, resource rollback, first-frame correlation, or roundtrip fingerprint stability.