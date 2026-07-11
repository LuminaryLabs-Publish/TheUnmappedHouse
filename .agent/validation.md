# Validation: The Unmapped House

Timestamp: `2026-07-11T06-21-57-04-00`

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
inspection admission fixture: unavailable
clue provenance fixture: unavailable
dual-ingress fixture: unavailable
stage-epoch fixture: unavailable
scene completion proof fixture: unavailable
transition fixtures: unavailable
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

It does not execute story ownership, inspection admission, clue provenance, completion proofs, persistence effects, stage epochs, dual-ingress races, transitions, rollback or resource lifecycle.

## Required next validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-hotspot-index.mjs
node scripts/validate-inspection-admission.mjs
node scripts/validate-clue-provenance.mjs
node scripts/validate-scene-completion-proof.mjs
node scripts/validate-dual-ingress-idempotency.mjs
node scripts/validate-hotspot-stage-epoch.mjs
node scripts/validate-inspection-reload.mjs
node scripts/validate-story-stage-transition.mjs
npm run check
```

## Required authority rows

```txt
story-manifest-id-and-fingerprint-present
three-scenes-nine-hotspots-nine-owned-clues
command-carries-source-sequence-scene-hotspot-story-revision-stage-epoch
canonical-hotspot-resolved-by-scene-and-id
caller-descriptor-text-and-grants-not-trusted
inspection-result-status-and-reason-present
clue-grant-receipt-carries-owner-and-source
completion-proof-carries-scene-and-grant-receipts
```

## Required admission rows

```txt
unknown-scene-rejected
unknown-hotspot-rejected
cross-scene-hotspot-rejected
stale-story-revision-rejected
stale-stage-epoch-rejected
inspection-rejected-during-interlude
inspection-rejected-during-transition
same-command-idempotent
same-hotspot-dual-ingress-idempotent
repeat-inspection-explicit-no-op
```

## Required effect rows

```txt
accepted-first-inspection-commits-once
canonical-clues-only
final-clue-creates-one-completion-proof
completion-schedules-one-interlude
accepted-result-persists-with-save-revision
failed-persistence-does-not-project-committed-feedback
accepted-result-correlates-to-stage-epoch-and-frame
old-stage-pick-does-not-mutate-new-scene
hover-state-cleared-on-stage-commit
journal-json-safe-and-bounded
```

## Required migration and reload rows

```txt
unknown-persisted-scene-dropped
unknown-persisted-hotspot-dropped
orphaned-clue-dropped
cross-scene-clue-dropped
valid-inspections-reconstruct-clue-receipts
reload-preserves-story-revision-and-provenance
reload-after-completion-restores-interlude-phase
```

## Browser smoke after fixtures

```txt
complete scene one with side-panel input
reset and complete scene one with canvas input
rapid-double-click final hotspot
submit side-panel and canvas input for the same hotspot together
invoke an old-scene button callback after Continue
attempt an old-stage pick after stage replacement
reload after each accepted inspection
verify one receipt, clue grant, checkmark and notebook effect per first inspection
verify one completion proof and one interlude
confirm current copy, framing, shaders and 450 ms pacing remain unchanged
```
