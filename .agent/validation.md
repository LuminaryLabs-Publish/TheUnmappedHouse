# Validation: The Unmapped House

Timestamp: `2026-07-11T10-12-03-04-00`

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
Continue transition fixture: unavailable
stage preparation failure fixture: unavailable
rollback fixture: unavailable
resource disposal fixture: unavailable
first-frame acknowledgement fixture: unavailable
terminal idempotency fixture: unavailable
repo-local docs pushed to main: pending until commit
central ledger sync: pending until central commit
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` performs `node --check` on:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute story manifests, persistence, inspection authority, Continue admission, detached stage preparation, rollback, disposal, frame correlation, timeout fencing or terminal behavior.

## Required prerequisite gates

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot.mjs
node scripts/validate-save-admission.mjs
node scripts/validate-save-migration.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-inspection-authority.mjs
```

## Required Continue-admission rows

```txt
continue-command-id-required
expected-story-revision-required
expected-stage-epoch-required
completion-proof-required
continue-before-completion-blocked
valid-completion-proof-accepted
stale-story-revision-rejected
stale-stage-epoch-rejected
duplicate-command-no-mutation
terminal-repeat-explicit-noop
result-json-safe
```

## Required transition-plan rows

```txt
plan-has-transaction-id
plan-source-and-target-scene-canonical
plan-source-and-target-revisions-monotonic
plan-manifest-and-scene-fingerprints-present
plan-serialization-deterministic
candidate-story-snapshot-built-without-live-mutation
target-scene-derived-from-manifest-order
```

## Required detached-preparation rows

```txt
live-stage-unchanged-during-preparation
prepared-group-not-attached-before-commit
camera-fog-post-settings-prepared
layer-prop-hotspot-counts-validated
hotspot-bindings-match-canonical-index
injected-layer-failure-typed
injected-prop-failure-typed
injected-hotspot-failure-typed
candidate-resources-disposed-on-failure
```

## Required commit and rollback rows

```txt
storage-failure-keeps-old-story-stage-and-dom
stage-commit-failure-has-defined-compensation
successful-commit-advances-story-revision-once
successful-commit-advances-save-revision-once
successful-commit-advances-stage-epoch-once
route-and-notebook-advance-once
interlude-closes-only-after-commit
rollback-idempotent
rollback-result-lists-reason-and-revisions
transition-journal-json-safe-and-bounded
```

## Required resource-retirement rows

```txt
old-layer-geometries-disposed
old-prop-geometries-disposed
old-hotspot-geometries-disposed
old-scene-materials-disposed
old-hotspot-materials-disposed
candidate-resources-disposed-after-failed-prepare
old-bundle-retained-until-new-swap
retirement-occurs-once-per-stage-epoch
StageKit-dispose-idempotent
renderer-target-post-listeners-and-raf-retired
```

## Required first-frame rows

```txt
frame-id-monotonic
render-frame-carries-story-revision
render-frame-carries-stage-epoch
first-frame-receipt-issued-once
receipt-camera-matches-committed-scene
receipt-hotspot-count-matches-committed-scene
receipt-post-policy-matches-committed-scene
receipt-dom-scene-id-matches-committed-scene
stage-committed-distinct-from-first-frame-visible
```

## Browser smoke after fixtures

```txt
load with no save
inspect all three scene-one hotspots
wait exactly current 450 ms pacing
Continue to scene two
verify old scene GPU resources retired
verify first visible frame identifies scene two
repeat for scene three
Continue to terminal
repeat final Continue and verify typed no-op
reset and verify timeout, RAF, listeners and resources retire cleanly
verify visual copy, framing, shaders and parallax remain unchanged
```
