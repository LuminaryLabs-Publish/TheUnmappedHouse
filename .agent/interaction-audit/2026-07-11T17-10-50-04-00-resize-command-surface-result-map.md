# Interaction audit: Resize command and surface result map

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Turn browser resize and DPR changes into idempotent, generation-fenced commands with typed outcomes.

## Current map

```txt
window resize event
  -> anonymous callback
  -> read innerWidth, innerHeight and devicePixelRatio
  -> mutate frame element styles
  -> mutate renderer pixel ratio and drawing buffer
  -> mutate post-target allocation
  -> return undefined
```

## Required command

```txt
ResizeCommand
  commandId
  sessionId
  sessionGeneration
  resizeGeneration
  source: boot | window-resize | dpr-change | retry | quality-fallback
  observedCssWidth
  observedCssHeight
  observedDpr
  predecessorSurfaceRevision
```

## Required admission

```txt
reject retired session
reject stale generation
coalesce duplicate dimensions and DPR
supersede older uncommitted generations
canonicalize fractional dimensions
apply pixel/capability budget
produce one immutable RenderSurfacePlan
```

## Required result classes

```txt
ignored_duplicate
superseded
rejected_session
rejected_budget
prepared
committed
committed_with_fallback
allocation_failed
rolled_back
retirement_failed
visible_frame_acknowledged
```

## Required parity

Boot sizing, later window resize, DPR changes, retry, and explicit quality fallback must use the same admission, plan, commit, result, journal, and frame-ack path.