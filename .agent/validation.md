# Validation: The Unmapped House

Timestamp: `2026-07-11T01-38-28-04-00`

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
interlude timer fixture: unavailable
Continue admission fixture: unavailable
terminal reload fixture: unavailable
phase/stage correlation fixture: unavailable
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

It does not execute story rules, persistence effects, timer behavior, StageKit lifecycle or browser reload behavior.

## Required next validation gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-recovery.mjs
node scripts/validate-interlude-timer.mjs
node scripts/validate-continue-admission.mjs
node scripts/validate-terminal-reload.mjs
node scripts/validate-phase-stage-correlation.mjs
npm run check
```

## Required phase rows

```txt
fresh-scene-starts-exploring
completion-proof-scene-scoped
final-inspection-produces-interlude-pending
pending-phase-persists-target-scene-and-deadline
open-phase-persists-after-deadline
impossible-phase-snapshot-rejected-or-repaired
```

## Required reload rows

```txt
reload-before-deadline-schedules-remaining-delay
reload-at-deadline-opens-interlude
reload-after-deadline-opens-interlude-immediately
completed-scene-never-reloads-with-hidden-progress
interlude-open-reloads-open
terminal-state-reloads-terminal
```

## Required timer rows

```txt
one-final-inspection-produces-one-timer
timer-id-retained
timer-cancelled-on-transition
timer-cancelled-on-reset
timer-cancelled-on-dispose
stale-scene-timer-rejected
stale-save-revision-timer-rejected
stale-runtime-epoch-timer-rejected
timer-result-json-safe
```

## Required Continue rows

```txt
continue-before-completion-rejected
continue-during-interlude-pending-rejected
continue-from-interlude-open-accepted
continue-wrong-scene-rejected
continue-stale-revision-rejected
duplicate-continue-idempotent
accepted-continue-correlates-next-save-and-stage
final-continue-commits-terminal-state
```

## Required failure rows

```txt
inspection-write-failure-schedules-no-interlude
phase-write-failure-projects-no-success-state
transition-persistence-failure-keeps-prior-stage
stage-preparation-failure-keeps-prior-phase
finalization-failure-enters-recovering
reload-recovering-resolves-exactly-once
```

## Required diagnostics rows

```txt
phase-row-json-safe
completion-proof-json-safe
timer-row-json-safe
continue-result-json-safe
phase-save-stage-correlation-complete
journals-bounded
no-dom-node-in-diagnostics
no-raw-three-object-in-diagnostics
```

## Browser smoke after fixtures

```txt
complete scene one and reload before 450 ms
reload after the interlude should already be ready
continue once and confirm scene two plus save revision plus stage epoch
attempt hidden Continue before completion and confirm rejection
reset while an interlude is pending and confirm no stale overlay
complete final scene, Continue, reload and confirm terminal projection
repeat mount/dispose and confirm one RAF, one timer set and one listener set
confirm story copy, framing, shaders and pacing remain unchanged
```
