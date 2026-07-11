# Validation: The Unmapped House

Timestamp: `2026-07-11T08-11-14-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run in connector-only environment
browser smoke: not run
story manifest fixture: unavailable
StorySnapshot fixture: unavailable
save admission fixture: unavailable
save migration fixture: unavailable
save reconciliation fixture: unavailable
save write-result fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: pending until central commit
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute manifest validation, persistence admission, migration, reconciliation, storage failures, story fingerprints, inspection authority, transitions, render correlation or lifecycle cleanup.

## Required next validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot.mjs
node scripts/validate-save-admission.mjs
node scripts/validate-save-migration.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-save-write-results.mjs
npm run check
```

## Required manifest rows

```txt
manifest-id-present
schema-version-present
manifest-fingerprint-present
manifest-serialization-deterministic
three-scenes-present
nine-hotspots-present
nine-owned-clues-present
scene-ids-unique
hotspot-ids-unique-per-scene
all-granted-clues-have-one-owner
all-required-clues-resolve-to-owner-scene
camera-stage-material-post-shapes-valid
manifest-deeply-immutable-or-snapshot-only
```

## Required snapshot rows

```txt
snapshot-schema-version-present
snapshot-manifest-id-and-fingerprint-match
story-revision-present
save-revision-present
explicit-story-phase-present
route-canonical-and-bounded
inspection-receipts-canonical-and-bounded
clue-receipts-derived-from-inspections
completion-proofs-derived-from-receipts
notebook-bounded
state-fingerprint-stable
```

## Required load-admission rows

```txt
missing-save-produces-initial-snapshot
empty-object-v1-migrates
malformed-json-rejected-with-reason
non-object-save-rejected
clues-non-array-rejected
route-non-array-rejected
log-non-array-rejected
inspected-non-object-rejected
unknown-schema-version-rejected
unknown-manifest-id-rejected
manifest-fingerprint-mismatch-policy-explicit
load-result-json-safe
```

## Required migration and reconciliation rows

```txt
valid-v1-save-migrates-once
migration-idempotent
unknown-scene-corrected
corrected-scene-id-is-repersisted
unknown-route-id-dropped
out-of-order-route-normalized
unknown-hotspot-dropped
cross-scene-hotspot-dropped
unknown-clue-dropped
orphaned-clue-dropped
forged-clue-cannot-complete-scene
valid-inspections-reconstruct-clue-receipts
completion-and-phase-recomputed
reconciliation-report-lists-each-drop-and-correction
```

## Required save-result rows

```txt
save-revision-monotonic
same-state-save-explicit-unchanged
state-fingerprint-correlates-to-write
serialization-failure-typed
quota-failure-typed
security-failure-typed
revision-conflict-typed
failed-write-does-not-report-commit
persistence-journal-json-safe-and-bounded
reload-preserves-admitted-state-fingerprint
```

## Browser smoke after fixtures

```txt
load with no save
load a valid current v1 save
load malformed JSON
load unknown scene id
load forged clues without inspections
load unknown hotspot ids
inspect one hotspot and reload
complete a scene and reload
verify active scene identity equals persisted identity
verify current copy, framing, shaders and 450 ms pacing remain unchanged
```
