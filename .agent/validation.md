# Validation: The Unmapped House

Timestamp: `2026-07-11T04-00-07-04-00`

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
story phase recovery fixture: unavailable
Continue admission fixture: unavailable
stage preparation fixture: unavailable
atomic transition fixture: unavailable
rollback fixture: unavailable
first-frame acknowledgement fixture: unavailable
resource retirement fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: complete
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

It does not execute story rules, persistence effects, stage preparation, transition rollback, first-frame proof, resource retirement or browser reload behavior.

## Required next validation gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-recovery.mjs
node scripts/validate-continue-admission.mjs
node scripts/validate-stage-preparation.mjs
node scripts/validate-story-stage-transition.mjs
node scripts/validate-transition-rollback.mjs
node scripts/validate-stage-resource-retirement.mjs
node scripts/validate-first-frame-ack.mjs
npm run check
```

## Required transition rows

```txt
continue-command-carries-scene-phase-story-revision-stage-epoch
invalid-descriptor-rejected-before-live-clear
prepare-success-does-not-change-live-stage
prepare-failure-keeps-prior-story-stage-and-interlude
save-failure-discards-prepared-stage
stage-commit-failure-restores-prior-story-and-stage
accepted-transition-commits-story-stage-and-projection-once
repeated-continue-does-not-skip-scene
final-continue-commits-terminal-once
```

## Required correlation rows

```txt
request-id-present
transition-id-present
story-revision-present
save-revision-present
stage-epoch-present
stage-commit-id-present
first-frame-id-present
scene-id-agrees-across-story-save-stage-and-frame
```

## Required lifecycle rows

```txt
candidate-resources-disposed-on-discard
prior-stage-remains-live-until-first-frame
prior-stage-disposed-once-after-first-frame
failed-commit-does-not-dispose-prior-stage
duplicate-dispose-is-safe
remount-has-one-canvas-one-raf-one-listener-set
resource-journal-json-safe-and-bounded
```

## Required failure rows

```txt
storage-denied-before-stage-commit
quota-failure-discards-candidate
geometry-construction-failure-keeps-prior-stage
material-construction-failure-keeps-prior-stage
projection-failure-enters-recoverable-result
first-frame-timeout-is-observable
reload-after-failed-transition-restores-prior-scene
reload-after-accepted-transition-restores-next-scene
```

## Browser smoke after fixtures

```txt
complete scene one
inject stage-preparation failure and press Continue
verify scene one and its interlude remain visible
remove fault and Continue once
verify scene two, one transition id and one stage epoch increment
reload and verify scene two
repeat with storage write failure and verify scene one remains committed
complete final scene and verify terminal reload
inspect resource counts across all transitions
dispose and remount with one canvas, RAF and listener set
confirm story copy, framing, shaders and pacing remain unchanged
```