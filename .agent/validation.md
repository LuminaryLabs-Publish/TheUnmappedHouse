# Validation: The Unmapped House

Timestamp: `2026-07-10T22-21-17-04-00`

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
story command result fixture: unavailable
story-stage transition fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: pending until repo-local documentation is complete
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

## Required next validation gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-resume.mjs
node scripts/validate-story-command-results.mjs
node scripts/validate-story-stage-transition.mjs
npm run check
```

## Required source rows

```txt
story-schema-version-present
story-manifest-id-stable
story-source-fingerprint-stable
scene-ids-unique
hotspot-ids-unique-within-scene
clue-ownership-valid
completion-requirements-resolve
route-order-valid
source-snapshot-json-safe
```

## Required save rows

```txt
fresh-save-accepted
legacy-v1-save-migrated
invalid-json-resets-with-result
invalid-field-types-repaired
unknown-scene-id-reconciled
unknown-hotspot-rows-removed
unknown-clues-removed
route-normalized-to-source-order
log-normalized-and-bounded
source-mismatch-reconciled
load-result-json-safe
```

## Required story-phase rows

```txt
fresh-state-is-exploring
final-inspection-commits-completion-proof
completion-enters-interlude-pending
readiness-enters-interlude-open
reload-during-pending-resumes
reload-during-open-resumes
reinspect-complete-scene-is-idempotent
future-scene-clue-does-not-complete-current-scene
continue-before-ready-rejected
continue-from-open-accepted-once
final-continue-enters-terminal
reload-terminal-restores-terminal-copy
```

## Required command-result rows

```txt
inspect-command-has-request-scene-hotspot-source-identity
side-panel-and-raycast-normalize-to-same-command
unknown-hotspot-rejected
stale-scene-command-rejected
already-inspected-command-no-op
duplicate-request-id-no-op
continue-wrong-phase-rejected
accepted-result-has-before-after-fingerprints
completion-result-has-proof
journal-json-safe-and-bounded
```

## Required story-stage transaction rows

```txt
next-story-snapshot-prepared-without-live-mutation
stage-failure-retains-previous-story-state
stage-failure-retains-previous-save
stage-success-commits-story-and-stage-once
story-scene-id-matches-stage-scene-id
transition-id-correlates-stage-commit-id
stage-epoch-recorded
save-written-after-commit
repeated-continue-is-no-op
transaction-result-json-safe
```

## Browser smoke after fixtures

```txt
load scene one from a fresh save
inspect final required hotspot
reload before 450 ms and confirm progression remains available
open interlude and reload again
continue once and confirm scene two and stage identity agree
attempt duplicate Continue and confirm no second transition
repeat through scene three
continue to terminal state
reload and confirm terminal copy persists
inject a stage transition failure and confirm the prior story/stage remain committed
reset with KeyR and confirm a fresh source-compatible save
confirm visuals, copy, framing and pacing remain unchanged
```

## Retained stage lifecycle validation

```txt
stage build-plan fixture
atomic stage-commit fixture
resource-ledger fixture
stage-epoch interaction fixture
host-disposal fixture
repeated three-scene browser lifecycle smoke
```
