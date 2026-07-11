# Architecture audit: Render Surface Resolution DSK map

Timestamp: `2026-07-11T17-10-50-04-00`

## Goal

Separate fixed composition from internal GPU allocation and define one authority for resize admission, bounded resolution, preparation, commit, fallback, rollback, retirement, and visible-frame proof.

## Current ownership

```txt
aspect-frame-kit
  -> compute CSS 16:9 frame from browser dimensions
  -> mutate frame element geometry

stage-render-kit
  -> sample devicePixelRatio
  -> allocate WebGLRenderer
  -> allocate multisampled WebGLRenderTarget
  -> resize renderer and target
  -> submit RAF frames

render-target-composition-kit
  -> render stage into target
  -> sample target texture in post pass
  -> render post scene to canvas
```

No service owns a canonical `RenderSurfacePlan` or `RenderSurfaceResult`.

## Required parent domain

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

## Required DSK composition

```txt
render-surface-resolution-authority-domain
  -> display-frame-observation-kit
  -> device-pixel-ratio-admission-kit
  -> render-resolution-policy-kit
  -> render-pixel-budget-kit
  -> resize-command-kit
  -> resize-coalescing-kit
  -> resize-generation-kit
  -> render-surface-revision-kit
  -> render-surface-plan-kit
  -> renderer-buffer-preparation-kit
  -> post-target-preparation-kit
  -> allocation-failure-classification-kit
  -> render-quality-fallback-kit
  -> render-surface-commit-kit
  -> render-surface-rollback-kit
  -> stale-resize-result-rejection-kit
  -> render-surface-resource-retirement-kit
  -> visible-frame-surface-ack-kit
  -> render-surface-observation-kit
  -> render-surface-journal-kit
  -> render-resolution-fixture-kit
  -> browser-resize-dpr-smoke-kit
```

## Required contracts

### RenderSurfacePlan

```txt
planId
resizeGeneration
predecessorSurfaceRevision
candidateSurfaceRevision
cssFrame { x, y, width, height }
designSize { width: 1920, height: 1080 }
observedDpr
admittedDpr
qualityTier
rendererBuffer { width, height }
postTarget { width, height, samples }
pixelCount
budgetId
fallbackChain[]
```

### RenderSurfaceResult

```txt
status: superseded | rejected | prepared | committed | rolled_back | failed
planId
resizeGeneration
surfaceRevision?
appliedCssFrame?
appliedRendererBuffer?
appliedPostTarget?
allocationFailure?
fallbackReceipt?
retirementReceipt?
visibleFrameId?
```

## Authority rules

1. CSS aspect framing and internal render resolution are separate outputs of one plan.
2. DPR is an observation, not an unconditional allocation multiplier.
3. A pixel budget and capability policy must admit every candidate.
4. Renderer and post target must prepare under detached candidate ownership.
5. Required preparation failure leaves the predecessor surface committed.
6. Lower-resolution fallback must be explicit and receipt-backed.
7. Only the latest resize generation can commit.
8. The first visible frame must acknowledge the committed surface revision.
9. Superseded resources retire only after commit and frame acknowledgement.
10. Diagnostics must report actual applied values, not requested values.

## Dependency order

```txt
runtime session lifecycle
  -> render-surface resolution authority
  -> committed-frame diagnostics
```

StoryManifest, StorySnapshot, inspection, and Continue authority remain earlier product prerequisites.