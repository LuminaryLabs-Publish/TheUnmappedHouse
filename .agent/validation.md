# Validation: The Unmapped House

Timestamp: `2026-07-11T17-10-50-04-00`

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
render-resolution policy fixture: unavailable
pixel-budget fixture: unavailable
resize-generation fixture: unavailable
allocation-failure fixture: unavailable
fallback and rollback fixture: unavailable
picking-parity fixture: unavailable
visible-frame surface fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: pending during repo-local update
central internal change log: pending during repo-local update
```

## Available validation

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

It does not execute display observation, DPR admission, resolution policy, pixel budgeting, renderer/target preparation, resize coalescing, allocation failure, fallback, rollback, surface retirement, input parity, or visible-frame acknowledgement.

## Required render-surface validation gate

```txt
node scripts/validate-render-resolution-policy.mjs
node scripts/validate-render-surface-transactions.mjs
node scripts/validate-render-surface-failures.mjs
node scripts/validate-render-surface-observations.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:render-surface
```

## Required policy rows

```txt
design-aspect-is-16-by-9
css-frame-wide-window-contained
css-frame-tall-window-contained
fractional-dimensions-canonicalized
observed-dpr-separated-from-admitted-dpr
quality-tier-declares-max-dpr
quality-tier-declares-max-long-edge
quality-tier-declares-max-pixel-count
quality-tier-declares-samples
fallback-chain-acyclic-and-deterministic
highest-valid-tier-selected
oversized-plan-rejected-or-falls-back
```

## Required transaction rows

```txt
boot-and-resize-use-same-command-path
resize-generation-monotonic
duplicate-resize-idempotent
rapid-resize-coalesces-to-latest
stale-plan-cannot-commit
predecessor-remains-committed-during-prepare
renderer-buffer-prepared-before-commit
post-target-prepared-before-commit
renderer-and-target-actual-dimensions-match-plan
post-material-samples-current-target
css-camera-renderer-target-commit-atomically
surface-revision-advances-once
```

## Required failure and recovery rows

```txt
capability-rejection-classified
memory-like-allocation-failure-classified
context-failure-classified
unknown-failure-classified
partial-candidate-resources-disposed
failed-required-preparation-keeps-predecessor
fallback-tier-attempted-in-declared-order
fallback-result-reports-actual-values
exhausted-fallback-publishes-failure
failed-plan-does-not-change-story-state
superseded-surface-retires-after-frame-ack
retirement-failure-reported
```

## Required interaction and frame rows

```txt
hotspot-hover-matches-committed-css-frame
hotspot-click-matches-committed-camera-and-surface
interlude-remains-visible-across-resize
continue-after-resize-references-current-stage-epoch
first-visible-frame-has-surface-revision
first-visible-frame-has-resize-generation
first-visible-frame-has-renderer-dimensions
first-visible-frame-has-target-dimensions
first-visible-frame-has-quality-tier
surface-observation-detached-json-safe
surface-journal-bounded
```

## Browser matrix

```txt
1280x720 DPR 1
1920x1080 DPR 1
1920x1080 DPR 2
2560x1440 DPR 1.5
3840x2160 DPR 2
portrait window
narrow landscape window
fractional zoom level
rapid resize storm
DPR transition between displays
injected renderer-buffer preparation failure
injected post-target preparation failure
exhausted fallback chain
```

## Browser smoke

```txt
boot and capture CSS frame, renderer buffer, target, tier, generation and revision
verify 4K/high-DPI input stays within declared pixel budget
resize rapidly and verify only the latest generation commits
change DPR and verify one revisioned commit
inject target failure and verify predecessor remains visible
verify explicit fallback reports actual applied dimensions
click and hover hotspots after each committed resize
verify first visible frame acknowledges the committed surface revision
verify superseded resources retire only after acknowledgement
```

## Validation claim

This pass documents the proof surface for bounded DPR admission, pixel budgeting, resize generation, candidate preparation, allocation fallback, rollback, resource retirement, input parity, and visible-frame correlation. It does not claim that those runtime authorities or fixtures are implemented.