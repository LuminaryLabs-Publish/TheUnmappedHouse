# Validation: The Unmapped House

Timestamp: `2026-07-11T12-08-47-04-00`

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
npm run check: not run; GitHub was unavailable from the local execution container
browser smoke: not run
story manifest fixture: unavailable
story snapshot fixture: unavailable
inspection command fixture: unavailable
stale inspection fixture: unavailable
clue provenance fixture: unavailable
completion proof fixture: unavailable
persistence rollback fixture: unavailable
dual-ingress parity fixture: unavailable
browser dual-ingress smoke: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
central internal change log: complete
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

It does not execute story admission, inspection, completion, persistence, transition, rendering, or lifecycle behavior.

## Required inspection validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-story-snapshot-admission.mjs
node scripts/validate-inspection-command.mjs
node scripts/validate-stale-inspection.mjs
node scripts/validate-clue-provenance.mjs
node scripts/validate-scene-completion-proof.mjs
node scripts/validate-inspection-persistence-rollback.mjs
node scripts/validate-dual-ingress-parity.mjs
npm run check
```

## Required manifest rows

```txt
manifest-id-and-schema-version-present
scene-ids-unique
hotspot-ids-unique-within-scene
canonical-scene-index-stable
canonical-hotspot-index-stable
canonical-clue-index-stable
every-hotspot-grant-resolves
every-completion-requirement-resolves
clue-ownership-unambiguous
manifest-fingerprint-stable
admitted-definition-deeply-immutable
```

## Required command-admission rows

```txt
command-id-present
input-sequence-present
source-enum-valid
scene-id-present
hotspot-id-present
expected-story-revision-present
expected-stage-epoch-present
side-panel-ingress-id-only
raycast-observation-id-only
canonical-hotspot-resolved-after-admission
unknown-hotspot-rejected
cross-scene-hotspot-rejected
stale-scene-rejected
stale-story-revision-rejected
stale-stage-epoch-rejected
duplicate-sequence-rejected
```

## Required inspection-result rows

```txt
first-inspection-status-applied
inspection-result-command-correlated
inspection-result-story-revision-correlated
inspection-result-stage-epoch-correlated
inspection-receipt-created-once
receipt-detached-and-json-safe
exact-duplicate-status-duplicate
exact-duplicate-story-fingerprint-unchanged
re-read-does-not-regrant-clues
re-read-presentation-result-explicit
unknown-or-stale-command-does-not-mutate
inspection-journal-bounded
```

## Required clue-provenance rows

```txt
canonical-hotspot-grants-only-owned-clues
clue-granted-once
clue-provenance-includes-scene
clue-provenance-includes-hotspot
clue-provenance-includes-inspection-receipt
clue-provenance-includes-story-revision
forged-descriptor-grants-ignored
cross-scene-grants-rejected
forged-global-clue-does-not-satisfy-proof
migrated-clues-reconciled-to-canonical-receipts
```

## Required completion-proof rows

```txt
completion-requires-current-scene-receipts
completion-requires-all-canonical-required-hotspots
completion-proof-created-once
completion-proof-id-stable
completion-proof-fingerprint-stable
completion-proof-includes-receipt-set
completion-proof-includes-story-revision
completion-proof-unconsumed-on-creation
duplicate-inspection-does-not-create-second-proof
one-interlude-lease-per-completion-proof
continue-admits-specific-unconsumed-proof
proof-consumption-idempotent
```

## Required persistence rows

```txt
inspection-builds-candidate-story-snapshot
candidate-save-result-typed
save-success-precedes-live-commit
save-failure-keeps-live-story-unchanged
save-failure-keeps-dom-unchanged
save-failure-creates-failed-result
story-revision-advances-once
save-revision-advances-once
before-after-fingerprints-present
persisted-snapshot-matches-result
```

## Required dual-ingress parity rows

```txt
same-hotspot-button-and-raycast-command-equal
same-hotspot-button-and-raycast-status-equal
same-hotspot-button-and-raycast-receipt-shape-equal
same-hotspot-button-and-raycast-clue-grants-equal
same-hotspot-button-and-raycast-completion-proof-equal
same-hotspot-button-and-raycast-persisted-snapshot-equal
mixed-ingress-repeat-remains-idempotent
stale-button-closure-rejected-after-transition
retired-raycast-observation-rejected-after-transition
```

## Browser smoke after fixtures

```txt
boot initial scene and record manifest/story/stage identities
inspect hotspot one through side-panel
inspect hotspot two through raycast
repeat hotspot one through raycast and verify duplicate result
inspect final hotspot through side-panel
verify one completion proof and one interlude lease
attempt forged descriptor and verify rejection
advance to scene two
invoke retained scene-one button callback and verify stale-scene rejection
submit retired stage-one pick observation and verify stale-stage rejection
reload admitted save and verify receipt/clue/proof identity
verify visible scene, debug projection, and persisted revision agree
```

## Existing follow-on fixture families

The inspection gate does not replace the still-required:

```txt
atomic Continue, rollback, resource-retirement, and first-frame fixtures
runtime session and generation fixtures
frame-loop, listener, and timeout lease fixtures
renderer/canvas/context teardown fixtures
reset-generation and stale-callback fixtures
```

## Validation claim

This pass documents the proof surface required for canonical inspection and completion. It does not claim that StoryManifest admission, StorySnapshot migration, inspection authority, completion proof, persistence rollback, or dual-ingress parity is implemented.
