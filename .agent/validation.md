# Validation: The Unmapped House

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

This run changed documentation only. Source inspection proves that raw scene descriptors and shallow-merged browser state enter runtime consumers without manifest/snapshot admission.

## Plan ledger

**Goal:** separate source-backed startup findings from correctness claims that require executable fixtures.

- [x] Inspect `src/story-data.js`.
- [x] Inspect `createInitialState()`, `loadState()`, current-scene resolution and boot persistence.
- [x] Inspect inspection, Continue, StageKit loading and render consumption.
- [x] Confirm no manifest or snapshot versions exist.
- [x] Confirm no structural or semantic validator exists.
- [x] Confirm no migration, compatibility or reconciliation result exists.
- [x] Confirm no startup result or first-frame acknowledgement exists.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
scenes is a raw exported array
scene order drives Continue
scene and hotspot ids are not validated
completion clue references are not validated
loadState accepts any parseable JSON value compatible with object spread
loaded fields are shallow-merged over defaults
unknown fields are retained
field types are not validated
unknown sceneId falls back currentScene without correcting state.sceneId
boot immediately rewrites the merged state
StageKit receives raw scene descriptors
no manifest fingerprint reaches consumers
no snapshot schema/revision reaches consumers
no typed startup result exists
```

## Existing checks prove

```txt
src/aspect-frame.js parses
src/game.js parses
src/stage-kit.js parses
src/story-data.js parses
```

## Existing checks do not prove

```txt
manifest structural validity
manifest semantic validity
unique identifiers
route reachability
save field types
save schema compatibility
migration determinism
stale-id reconciliation
unknown-field rejection
storage-write ordering
startup atomicity
first-visible-frame provenance
```

## Change boundary

```txt
runtime source changed: no
story content changed: no
save behavior changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser startup smoke: not run
Pages startup smoke: not run
```

## Required fixtures

```txt
fixture:manifest-valid
fixture:duplicate-scene-id-rejected
fixture:duplicate-hotspot-id-rejected
fixture:unknown-clue-reference-rejected
fixture:invalid-render-descriptor-rejected
fixture:non-object-snapshot-rejected
fixture:wrong-snapshot-types-rejected
fixture:unknown-snapshot-fields-rejected
fixture:old-snapshot-migrates
fixture:future-snapshot-rejected
fixture:stale-ids-reconciled
fixture:manifest-fingerprint-mismatch
fixture:storage-not-rewritten-before-admission
fixture:detached-startup-result
fixture:first-visible-startup-frame
smoke:browser-startup-matrix
smoke:pages-startup-matrix
```

## Current result

```txt
manifest authority implemented: no
snapshot authority implemented: no
migration and reconciliation proven: no
startup atomicity proven: no
first visible startup frame proven: no
```

No save-compatibility, malformed-state recovery, startup-atomicity or deployment-readiness claim is made.
