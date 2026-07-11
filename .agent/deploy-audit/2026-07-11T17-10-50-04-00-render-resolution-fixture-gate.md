# Deploy audit: Render-resolution fixture gate

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Prevent deployment from claiming stable fixed-aspect rendering until resolution budgeting, resize recovery, and frame acknowledgement are executable.

## Required pure fixtures

```txt
aspect-frame-wide-window
aspect-frame-tall-window
fractional-frame-canonicalization
dpr-admission-is-policy-bounded
pixel-budget-selects-highest-valid-tier
pixel-budget-rejects-oversized-plan
resize-generations-are-monotonic
duplicate-resize-is-idempotent
stale-preparation-cannot-commit
fallback-chain-is-deterministic
surface-observations-are-detached-json-safe
surface-journal-is-bounded
```

## Required adapter fixtures

```txt
renderer-and-target-dimensions-match-plan
post-material-samples-current-target
allocation-failure-preserves-predecessor
partial-candidate-resources-are-disposed
fallback-commit-reports-actual-dimensions
superseded-surface-retires-after-frame-ack
```

## Required browser matrix

```txt
1280x720 DPR 1
1920x1080 DPR 1
1920x1080 DPR 2
2560x1440 DPR 1.5
3840x2160 DPR 2
portrait and narrow windows
rapid resize storm
browser zoom and DPR transition
injected post-target allocation failure
context-loss or renderer-failure path
```

## Browser assertions

```txt
fixed 16:9 composition remains centered
pixel budget is never exceeded
exactly one latest resize generation commits
failed candidate leaves predecessor visible
fallback tier is explicit
hotspot picking matches committed frame geometry
first visible frame identifies surface revision
diagnostics report actual renderer and target dimensions
no stale candidate can overwrite a newer surface
```

## Recommended commands

```txt
node scripts/validate-render-resolution-policy.mjs
node scripts/validate-render-surface-transactions.mjs
node scripts/validate-render-surface-failures.mjs
npm run check
npm run validate:render-surface
```

These scripts do not exist yet. Current validation remains syntax-only.