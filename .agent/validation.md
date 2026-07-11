# Validation: The Unmapped House

Timestamp: `2026-07-11T13-49-30-04-00`

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
Continue admission fixture: unavailable
stage preparation fixture: unavailable
persistence rollback fixture: unavailable
resource retirement fixture: unavailable
first-successor-frame fixture: unavailable
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

It does not execute manifest admission, persistence, inspection, completion, Continue, stage preparation, rollback, rendering, resource retirement, or lifecycle behavior.

## Required transition validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot-admission.mjs
node scripts/validate-scene-completion-proof.mjs
node scripts/validate-continue-admission.mjs
node scripts/validate-successor-stage-preparation.mjs
node scripts/validate-continue-rollback.mjs
node scripts/validate-transition-resource-retirement.mjs
node scripts/validate-first-successor-frame.mjs
npm run check
```

## Required Continue admission rows

```txt
command-id-present
input-sequence-present
source-valid
scene-id-present
completion-proof-id-present
expected-story-revision-present
expected-stage-epoch-present
incomplete-scene-rejected
unknown-proof-rejected
consumed-proof-rejected
stale-scene-rejected
stale-story-revision-rejected
stale-stage-epoch-rejected
duplicate-sequence-rejected
one-transition-id-reserved
```

## Required preparation rows

```txt
successor-scene-resolves-from-canonical-manifest
successor-story-candidate-built-without-live-mutation
successor-stage-group-detached
successor-camera-fog-post-hotspots-prepared-off-line
stage-preparation-result-typed
candidate-stage-epoch-present
resource-inventory-complete
prepare-failure-keeps-predecessor-story-live
prepare-failure-keeps-predecessor-stage-live
partial-successor-resources-disposed
```

## Required commit and rollback rows

```txt
candidate-snapshot-persisted-before-live-commit
persistence-failure-keeps-predecessor-story-stage-dom
atomic-commit-advances-story-revision-once
atomic-commit-advances-stage-epoch-once
completion-proof-consumed-after-commit
commit-failure-restores-predecessor-authority
rollback-result-typed
retry-after-failure-commits-once
double-continue-cannot-skip-scene
terminal-transition-persists-terminal-phase
```

## Required frame and retirement rows

```txt
first-successor-frame-has-transition-id
first-successor-frame-has-story-revision
first-successor-frame-has-stage-epoch
first-successor-frame-has-camera-and-hotspot-set
predecessor-resources-retained-before-frame-ack
predecessor-resources-retired-after-frame-ack
retirement-receipt-inventory-complete
successor-frame-result-detached-json-safe
transition-journal-bounded
```

## Browser failure smoke

```txt
boot scene one and capture story/stage/resource identities
complete scene one and capture completion-proof identity
inject successor geometry construction failure
click Continue and verify scene one remains visible and persisted
verify detached partial resources are disposed
retry and verify exactly one scene-two transition
verify first visible frame matches transition, story revision, and stage epoch
verify predecessor retirement follows frame acknowledgement
double-click Continue and verify scene three is not skipped
complete final scene and verify durable terminal phase after reload
```

## Validation claim

This pass documents the proof surface for atomic Continue admission, successor preparation, durable commit, rollback, resource retirement, and first visible frame. It does not claim that those runtime authorities or fixtures are implemented.