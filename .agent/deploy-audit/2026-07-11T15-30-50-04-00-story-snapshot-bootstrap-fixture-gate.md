# Deploy audit: StorySnapshot bootstrap fixture gate

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

The current package check only performs JavaScript syntax validation. Deployment can succeed while malformed or semantically invalid saves crash startup after WebGL resources and RAF work are already live. This audit defines the minimum pure and browser fixture gate required before persistence or bootstrap authority can be claimed.

## Plan ledger

**Goal:** block deployment claims until versioned StorySnapshot admission, migration, reconciliation, bootstrap rollback, first-frame correlation, and recovery are executable and repeatable.

- [x] Identify current syntax-only proof.
- [x] Define pure manifest and snapshot fixtures.
- [x] Define storage failure and corruption fixtures.
- [x] Define browser resource-allocation and rollback smoke rows.
- [x] Define first-frame and retry proof.
- [ ] Add scripts and package commands.
- [ ] Run the gate in CI and Pages deployment.

## Required commands

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

## Pure fixture rows

```txt
manifest-ids-unique
manifest-hotspot-ids-scene-scoped
manifest-clues-known
manifest-requirements-known
manifest-successors-canonical
manifest-fingerprint-stable
absent-save-default-result
malformed-json-rejected-and-retained
wrong-top-level-type-rejected
unknown-version-rejected
known-version-migrated-once
manifest-mismatch-rejected
unknown-scene-rejected
route-prefix-invariant
inspection-identity-invariant
clue-provenance-invariant
phase-completion-invariant
field-type-invariant
log-budget-enforced
snapshot-fingerprint-stable
roundtrip-fingerprint-equal
results-detached-json-safe
journal-bounded
```

## Storage fixtures

```txt
getItem-security-error-reported
setItem-security-error-reported
setItem-quota-error-reported
failed-read-does-not-delete-raw-save
failed-parse-does-not-overwrite-raw-save
failed-write-does-not-advance-save-revision
clear-failure-does-not-reload
quarantine-preserves-exact-payload
explicit-recovery-path-required
```

## Browser bootstrap smoke

```txt
1. seed a valid current save and boot
2. verify one canvas, one listener set and one RAF chain
3. verify first visible frame matches manifest and snapshot fingerprints
4. seed malformed JSON and boot
5. verify raw save remains unchanged
6. verify no candidate canvas, listeners, RAF or WebGL resources survive rejection
7. seed valid JSON with invalid field types and boot
8. verify rejection occurs before StageKit allocation
9. inject stage construction failure
10. verify all candidate resources are disposed and no ready state is published
11. inject UI projection failure
12. verify rollback and retained raw save
13. inject localStorage write failure
14. verify no committed bootstrap and no revision advance
15. retry with valid dependencies
16. verify exactly one committed generation and first-frame receipt
17. reset and verify typed clear result before reload
```

## CI and Pages gate

The static build and deployment workflow should require the aggregate startup validation command before uploading or deploying the site. A syntax-success result is not evidence of StorySnapshot, persistence, bootstrap, render-readiness, or recovery correctness.

## Validation status

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
workflow changed: no
npm run check: not run
pure StorySnapshot fixtures: unavailable
storage failure fixtures: unavailable
browser bootstrap smoke: unavailable
```

No deployment-readiness claim is made for malformed-save handling, semantic admission, migration, reconciliation, rollback, first-frame proof, or retry.