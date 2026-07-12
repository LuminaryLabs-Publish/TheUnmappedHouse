# Next steps: The Unmapped House

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Goal

Preserve the current story and presentation while making authored content and browser state versioned, validated, compatible, immutable and observable before runtime consumers start.

## Plan ledger

### 1. StoryManifest Authority
- [ ] Add `manifestId`, semantic version, schema version and content fingerprint.
- [ ] Validate unique scene and hotspot IDs.
- [ ] Build scene, hotspot and clue indexes.
- [ ] Validate clue grants against completion requirements.
- [ ] Validate camera, stage, material, post and hotspot descriptor shapes.
- [ ] Define explicit route graph and terminal node instead of implicit array-only authority.
- [ ] Deep-freeze the canonical manifest.

### 2. StorySnapshot Startup Authority
- [ ] Add snapshot schema version, snapshot revision and manifest fingerprint.
- [ ] Parse raw storage into a detached candidate.
- [ ] Reject non-object roots and unknown fields.
- [ ] Validate every field type and bounded collection size.
- [ ] Add deterministic migrations.
- [ ] Reconcile stale scene, route, clue, inspection and flag IDs against the accepted manifest.
- [ ] Return one typed startup result.
- [ ] Do not rewrite storage until admission succeeds.

### 3. Consumer installation
- [ ] Construct `StageKit` only after manifest/snapshot admission.
- [ ] Pass canonical IDs rather than mutable raw descriptors through interaction paths.
- [ ] Bind UI, persistence and rendering to manifest fingerprint and snapshot revision.
- [ ] Acknowledge the first visible startup frame.

### 4. Retained downstream authorities
- [ ] Browser storage concurrency and reset authority.
- [ ] Interaction and completion proof.
- [ ] Timer, modal and transition authority.
- [ ] Narrative and Notebook projection authority.
- [ ] Runtime and WebGL lifecycle authority.
- [ ] Render-surface and committed-frame authority.

## Proposed contracts

```txt
StoryManifest
  manifestId
  semanticVersion
  schemaVersion
  fingerprint
  entrySceneId
  terminalSceneId
  sceneOrder
  sceneIndex
  hotspotIndex
  clueIndex
  routeGraph
```

```txt
StorySnapshot
  schemaVersion
  snapshotRevision
  manifestId
  manifestFingerprint
  sceneId
  clues
  flags
  inspected
  route
  log
```

```txt
StoryStartupResult
  resultId
  status
  manifestFingerprint
  sourceSnapshotSchemaVersion
  committedSnapshotRevision
  migrationsApplied
  reconciliationsApplied
  rejectedFields
  fallbackReason
  firstVisibleFrameId
```

## Required fixtures

```txt
valid-manifest-valid-snapshot
duplicate-scene-id-rejected
duplicate-hotspot-id-rejected
unknown-required-clue-rejected
invalid-camera-vector-rejected
non-object-save-rejected
unknown-save-field-rejected
wrong-field-types-rejected
unknown-scene-id-reconciled
stale-route-and-inspection-ids-reconciled
old-schema-migrates-deterministically
future-schema-rejected
manifest-fingerprint-mismatch-handled
startup-result-is-detached-and-json-safe
storage-not-rewritten-before-admission
first-visible-frame-cites-manifest-and-snapshot
pages-startup-matrix
```

## Implementation order

```txt
1. Pure manifest validator and index builder
2. Manifest freeze and fingerprint
3. Pure snapshot parser and validator
4. Migration and reconciliation policies
5. Typed startup result
6. Consumer installation barrier
7. First-frame receipt
8. Browser and Pages fixtures
```

## Do not do first

```txt
new rooms or branches
inventory
audio
shader redesign
camera retuning
visual polish
more fields in raw saved state
```
