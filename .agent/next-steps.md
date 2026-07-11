# Next steps: The Unmapped House

Timestamp: `2026-07-11T08-11-14-04-00`

## Goal

Preserve the current three-scene story, copy, pacing and visual output while giving story definitions and persisted state one canonical, versioned and reconcilable authority boundary.

## Plan ledger

### Canonical story manifest

- [ ] Add a stable `storyManifestId` and integer `schemaVersion`.
- [ ] Normalize scene, hotspot, clue, requirement, camera, stage, material and post descriptors.
- [ ] Reject duplicate scene ids and duplicate hotspot ids within a scene.
- [ ] Require every granted and required clue to have exactly one canonical owner scene and source hotspot.
- [ ] Build immutable scene, hotspot and clue indexes.
- [ ] Compute a deterministic manifest fingerprint from canonical serialized content.
- [ ] Deep-freeze the admitted manifest or expose immutable snapshots only.

### Versioned StorySnapshot

- [ ] Replace the raw mutable save object with a versioned `StorySnapshot`.
- [ ] Include manifest id, manifest fingerprint, schema version, story revision, save revision and explicit phase.
- [ ] Store canonical route, inspection receipts, clue-grant receipts, notebook rows and completion proofs.
- [ ] Derive clue and completion projections from receipts instead of trusting raw strings.
- [ ] Add a deterministic story-state fingerprint.

### Load admission

- [ ] Distinguish `missing`, `parsed`, `invalid`, `incompatible`, `migrated`, `reconciled` and `failed` load results.
- [ ] Validate the top-level envelope before reading fields.
- [ ] Validate every field type and bounded collection size.
- [ ] Require a known schema version and story manifest id.
- [ ] Compare the saved manifest fingerprint with the active definition.
- [ ] Correct unknown saved scene ids through an explicit reconciliation result.
- [ ] Never retain a different persisted `sceneId` from the admitted active scene.

### Reconciliation and migration

- [ ] Add a one-time adapter for the current raw `.v1` object shape.
- [ ] Reconcile route ids against canonical scene order.
- [ ] Reconcile inspected hotspot ids against scene ownership.
- [ ] Reconstruct clue receipts only from admitted canonical inspections.
- [ ] Drop unknown, orphaned, forged and cross-scene data with explicit reasons.
- [ ] Recompute completion and phase from reconciled receipts.
- [ ] Write the upgraded envelope only after successful admission.

### Save transaction

- [ ] Build a candidate snapshot before mutating committed persistence metadata.
- [ ] Increment save revision monotonically.
- [ ] Return typed `written`, `unchanged`, `conflict`, `quota_failed`, `security_failed` and `serialization_failed` results.
- [ ] Correlate storage results with story revision and state fingerprint.
- [ ] Do not report committed persistence when localStorage rejects the write.
- [ ] Retain a bounded JSON-safe persistence journal.

### Renderer and interaction prerequisites

- [ ] Pass immutable scene projections from the admitted manifest to StageKit.
- [ ] Attach manifest fingerprint, scene id and future stage epoch to render preparation.
- [ ] Keep the inspection authority plan immediately after manifest and save admission.
- [ ] Keep the atomic Continue transition plan after inspection authority.

### Validation

- [ ] Add `scripts/validate-story-manifest.mjs`.
- [ ] Add `scripts/validate-story-snapshot.mjs`.
- [ ] Add `scripts/validate-save-admission.mjs`.
- [ ] Add `scripts/validate-save-migration.mjs`.
- [ ] Add `scripts/validate-save-reconciliation.mjs`.
- [ ] Add `scripts/validate-save-write-results.mjs`.
- [ ] Wire all fixtures into `npm run check` after syntax checks.

## Required fixture rows

```txt
manifest-has-stable-id-version-and-fingerprint
three-scenes-nine-hotspots-nine-owned-clues
scene-ids-unique
hotspot-ids-unique-per-scene
all-required-clues-resolve-to-owned-grants
canonical-manifest-serialization-stable
missing-save-produces-initial-snapshot
malformed-json-produces-explicit-invalid-result
non-object-save-rejected
malformed-field-types-rejected
unknown-schema-version-rejected
manifest-mismatch-reconciled-or-rejected-by-policy
unknown-scene-id-corrected-and-not-repersisted
unknown-hotspot-dropped
orphaned-clue-dropped
cross-scene-clue-dropped
forged-clue-cannot-complete-scene
valid-v1-save-migrates-once
migration-is-idempotent
save-revision-monotonic
state-fingerprint-stable-after-reload
storage-failure-does-not-report-commit
journal-json-safe-and-bounded
```

## Implementation order

```txt
1. story manifest schema and canonical normalization
2. scene/hotspot/clue indexes and definition fingerprint
3. StorySnapshot schema and state fingerprint
4. typed load admission
5. v1 migration and canonical reconciliation
6. typed save transaction and persistence journal
7. manifest/snapshot/admission/migration fixtures
8. inspection command authority
9. atomic Continue transition and lifecycle gates
```

## Next safe ledge

```txt
TheUnmappedHouse Versioned Story Manifest Authority
+ Save Admission, Migration and Reconciliation Fixture Gate
```

## Do not do first

```txt
new rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
