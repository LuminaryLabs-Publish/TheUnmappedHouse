# Architecture audit: render-surface resolution DSK map

**Timestamp:** `2026-07-12T13-08-15-04-00`

## Summary

Render-surface allocation is currently split across constructor side effects and direct resize mutation. The proposed parent domain makes surface planning, capability admission, allocation, commit, rollback and frame proof explicit.

## Plan ledger

**Goal:** create one parent domain that is the sole authority allowed to change renderer drawing-buffer and offscreen-target dimensions.

- [x] Identify current renderer and target owners.
- [x] Identify missing budgets and capability checks.
- [x] Identify resize, lifecycle and visible-frame dependencies.
- [x] Define candidate kits and transaction order.
- [ ] Implement and register the domain.

## Current graph

```txt
StageKit constructor
  -> set capped DPR
  -> allocate fixed-design renderer
  -> allocate fixed-design samples:2 target
  -> call resize

window resize
  -> sample viewport and DPR
  -> mutate renderer
  -> mutate target
  -> render next frame
```

## Target graph

```txt
the-unmapped-house-render-surface-resolution-authority-domain
  -> render-surface-id-kit
  -> render-surface-revision-kit
  -> viewport-observation-kit
  -> device-pixel-ratio-policy-kit
  -> render-pixel-budget-kit
  -> webgl-capability-query-kit
  -> render-surface-plan-kit
  -> drawing-buffer-plan-kit
  -> offscreen-target-plan-kit
  -> multisample-budget-kit
  -> surface-dimension-admission-kit
  -> surface-allocation-kit
  -> allocation-readback-kit
  -> surface-commit-kit
  -> surface-rollback-kit
  -> stale-resize-rejection-kit
  -> surface-resource-retirement-kit
  -> surface-observation-kit
  -> visible-surface-frame-ack-kit
  -> render-surface-fixture-kit
  -> browser-dpr-resize-smoke-kit
  -> pages-render-surface-smoke-kit
```

## Domain boundaries

```txt
browser adapter owns raw viewport and DPR observation
fixed-aspect layout owns CSS frame calculation
render-surface authority owns physical dimensions, samples and revision
WebGL capability adapter owns texture, renderbuffer and sample limits
Three.js adapter owns allocation and readback effects
render composition owns stage and post pass submission
lifecycle authority owns listener and target retirement
committed-frame authority proves visible use of the surface
```

## Invariants

```txt
boot does not allocate an unadmitted fixed-design predecessor surface
physical dimensions stay within product and WebGL limits
sample count stays within product and WebGL limits
renderer and offscreen target share one committed surface revision
stale resize generations cannot replace newer surfaces
failed allocation preserves the predecessor surface
framebuffer-incomplete candidates never become active
replaced target resources retire exactly once
actual dimensions are recorded after allocation
first visible frame cites committed surface revision
surface observations are detached and journal is bounded
```

## Transaction order

```txt
observe
  -> plan
  -> admit capabilities and budgets
  -> prepare renderer and target
  -> read back actual state
  -> validate framebuffer
  -> commit or roll back
  -> retire predecessor
  -> render
  -> acknowledge visible frame
  -> observe and journal
```

## Non-goals

```txt
renderer replacement
shader redesign
story content changes
camera retuning
post-process redesign
```

The parent domain coordinates existing layout and Three.js adapters rather than absorbing their implementation details.