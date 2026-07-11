# Validation: The Unmapped House

Timestamp: `2026-07-11T00-00-26-04-00`

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
story source fixture: unavailable
save reconciliation fixture: unavailable
story phase resume fixture: unavailable
persistence result fixture: unavailable
story commit protocol fixture: unavailable
boot rollback fixture: unavailable
browser storage-failure smoke: unavailable
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

It does not execute story rules, persistence effects, StageKit lifecycle or browser behavior.

## Required next validation gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-resume.mjs
node scripts/validate-persistence-results.mjs
node scripts/validate-story-commit-protocol.mjs
node scripts/validate-boot-rollback.mjs
npm run check
```

## Required persistence capability rows

```txt
storage-available-admitted
storage-read-denied-distinguished
storage-write-denied-distinguished
quota-failure-distinguished
serialization-failure-distinguished
clear-failure-distinguished
ephemeral-or-fatal-policy-explicit
```

## Required envelope and revision rows

```txt
fresh-envelope-commits-revision-one
legacy-v1-save-migrated
invalid-json-repaired-with-result
source-mismatch-reconciled
successful-write-increments-revision
stale-expected-revision-rejected
state-fingerprint-stable
pending-transaction-json-safe
```

## Required inspection rows

```txt
button-and-raycast-normalize-to-same-command
accepted-inspection-returns-save-revision
already-inspected-is-idempotent
failed-inspection-write-keeps-previous-committed-state
failed-final-inspection-write-schedules-no-interlude
successful-final-inspection-persists-phase-and-deadline
reload-during-interlude-pending-resumes
```

## Required transition rows

```txt
continue-wrong-phase-rejected
next-story-snapshot-prepared-without-live-mutation
stage-prepared-before-committed-replacement
pending-save-written-before-stage-commit
persistence-prepare-failure-keeps-previous-stage
stage-failure-retains-previous-finalized-save
stage-success-finalizes-next-save-revision
finalize-write-failure-remains-recoverable
reload-pending-transition-resolves-exactly-once
story-scene-save-revision-and-stage-epoch-correlate
final-continue-persists-terminal-state
```

## Required reset rows

```txt
reset-clear-success-reloads-fresh-state
reset-already-empty-is-idempotent
reset-clear-failure-does-not-reload
reset-result-json-safe
```

## Required boot/lifecycle rows

```txt
storage-denial-admitted-before-stage-acquisition
initial-write-failure-cancels-raf
initial-write-failure-removes-window-listeners
initial-write-failure-removes-canvas-listeners
initial-write-failure-disposes-render-targets
initial-write-failure-disposes-scene-resources
initial-write-failure-removes-canvas
runtime-dispose-idempotent
remount-owns-one-raf-and-one-listener-set
```

## Required diagnostics rows

```txt
load-write-clear-results-json-safe
command-persistence-stage-correlation-complete
persistence-journal-bounded
pending-recovery-visible
no-dom-node-in-diagnostics
no-raw-three-object-in-diagnostics
```

## Browser smoke after fixtures

```txt
load scene one with working storage
complete scene and reload during interlude pending
reload during interlude open
continue once and verify save revision and stage epoch agree
simulate write denial before an inspection
simulate quota failure on final inspection and confirm no interlude
simulate persistence failure before Continue and confirm prior stage remains
simulate finalization failure and reload into deterministic recovery
simulate clear failure and confirm no forced reload
simulate boot write failure and confirm no live canvas or RAF remains
restore storage and remount once
confirm visuals, copy, framing and pacing remain unchanged
```

## Retained companion validation

```txt
story source schema and graph fixture
save shape and reconciliation fixture
story phase and terminal reload fixture
atomic StageKit build/commit/discard fixture
stage resource ledger and disposal fixture
stage epoch interaction fixture
repeated three-scene browser lifecycle smoke
```