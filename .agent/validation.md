# Validation: The Unmapped House

Timestamp: `2026-07-11T15-30-50-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
StoryManifest fixture: unavailable
StorySnapshot schema fixture: unavailable
migration fixture: unavailable
semantic admission fixture: unavailable
reconciliation fixture: unavailable
storage failure fixture: unavailable
bootstrap rollback fixture: unavailable
first-bootstrap-frame fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute manifest admission, raw storage read behavior, StorySnapshot parsing, migration, semantic validation, reconciliation, quarantine, bootstrap preparation, rollback, rendering, resource disposal, retry, reset, or first-frame behavior.

## Required startup validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot-schema.mjs
node scripts/validate-story-snapshot-semantics.mjs
node scripts/validate-story-snapshot-migrations.mjs
node scripts/validate-story-snapshot-reconciliation.mjs
node scripts/validate-story-persistence-results.mjs
node scripts/validate-story-bootstrap-rollback.mjs
node scripts/validate-first-bootstrap-frame.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:story-startup
```

## Required manifest rows

```txt
manifest-id-present
manifest-schema-version-present
scene-ids-unique
hotspot-ids-scene-scoped
clues-known
completion-requirements-known
successors-canonical
stage-descriptors-valid
manifest-deep-frozen
manifest-fingerprint-stable
```

## Required raw and schema rows

```txt
absent-save-default-result
raw-read-result-typed
malformed-json-rejected-without-overwrite
wrong-top-level-type-rejected
unknown-version-rejected
known-version-migrated-once
migration-receipt-has-input-output-fingerprints
manifest-mismatch-rejected
required-envelope-fields-present
field-types-admitted
rejected-raw-payload-retained
```

## Required semantic rows

```txt
scene-id-known
route-is-canonical-prefix
route-ends-at-current-scene
route-duplicates-rejected-or-canonicalized
inspection-scene-ids-known
inspection-hotspot-ids-belong-to-scene
clue-receipts-reference-known-clues
clue-provenance-required
phase-agrees-with-completion-and-terminal-state
log-budget-enforced
flags-known-and-type-correct
snapshot-fingerprint-stable
roundtrip-fingerprint-equal
```

## Required storage and recovery rows

```txt
getItem-security-error-reported
setItem-security-error-reported
setItem-quota-error-reported
failed-read-does-not-delete-raw-save
failed-parse-does-not-overwrite-raw-save
failed-write-does-not-advance-save-revision
quarantine-preserves-exact-payload
retry-result-references-predecessor-load-result
clear-failure-does-not-reload
clear-success-publishes-result-before-reload
load-save-clear-results-detached-json-safe
persistence-journal-bounded
```

## Required bootstrap rows

```txt
invalid-state-rejected-before-stage-allocation
bootstrap-candidate-detached
stage-resources-prepared-off-line
ui-projection-prepared-off-line
resource-inventory-complete
stage-prepare-failure-disposes-all-candidate-resources
ui-projection-failure-disposes-all-candidate-resources
storage-write-failure-rolls-back-bootstrap
failed-bootstrap-publishes-no-ready-state
retry-creates-one-session-generation
retry-creates-one-canvas
retry-creates-one-listener-set
retry-creates-one-raf-chain
first-bootstrap-frame-has-load-result-id
first-bootstrap-frame-has-manifest-fingerprint
first-bootstrap-frame-has-snapshot-fingerprint
first-bootstrap-frame-has-stage-epoch
```

## Browser failure smoke

```txt
boot a valid current save and capture manifest, snapshot, stage and frame identities
seed malformed JSON and verify the raw save remains unchanged
verify rejected boot leaves no candidate canvas, listener, RAF or WebGL resource
seed valid JSON with invalid field types and reject before StageKit allocation
inject stage construction failure and verify complete disposal
inject UI projection failure and verify complete disposal
inject localStorage write failure and verify no committed bootstrap or revision advance
retry and verify exactly one committed generation
verify first visible frame matches accepted snapshot and stage epoch
press reset and verify a typed clear result before reload
```

## Validation claim

This pass documents the proof surface for StoryManifest admission, versioned StorySnapshot loading, migration, semantic reconciliation, non-destructive rejection, bootstrap rollback, first-frame correlation, retry, and reset. It does not claim that those runtime authorities or fixtures are implemented.