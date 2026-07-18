# Architecture audit: render resolution and framebuffer budget DSK map

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Existing ownership

```txt
aspect-frame-kit
  -> computes full-window 16:9 CSS viewport

stage-render-kit
  -> admits DPR up to 2
  -> sizes renderer drawing buffer
  -> owns recursive RAF

render-target-composition-kit
  -> owns multisampled offscreen target
  -> resizes target from viewport x DPR
  -> renders scene pass and post pass
```

These kits provide mechanics but no shared budget or admission result.

## Required parent domain

`the-unmapped-house-render-resolution-framebuffer-budget-authority-domain`

## DSK breakdown

| Surface | Responsibility |
|---|---|
| `render-quality-manifest-kit` | declares quality revision, render scale, DPR ceiling, sample policy and fallback order |
| `viewport-sample-kit` | captures CSS viewport, physical dimensions and resize generation |
| `device-pixel-ratio-admission-kit` | normalizes and caps browser DPR evidence |
| `render-scale-policy-kit` | applies explicit quality scaling independently of CSS layout |
| `framebuffer-pixel-budget-kit` | enforces default drawing-buffer area and dimensions |
| `offscreen-target-sample-budget-kit` | enforces offscreen pixel area multiplied by sample count |
| `render-target-resize-command-kit` | requests one generation-bound buffer resize |
| `render-target-resize-result-kit` | publishes accepted, clamped, unchanged, failed or stale settlement |
| `resize-coalescing-kit` | collapses rapid resize samples into one accepted resize generation |
| `allocation-failure-fallback-kit` | steps down samples, DPR or render scale after allocation failure |
| `quality-degradation-result-kit` | records degradation and recovery without silently changing quality |
| `frame-cost-observation-kit` | observes scene pass, post pass and total frame timing |
| `buffer-area-digest-kit` | publishes accepted CSS, drawing-buffer and target dimensions |
| `render-resolution-projection-commit-kit` | binds accepted dimensions to one presented frame |
| `first-resolution-bound-frame-ack-kit` | acknowledges the first frame using the accepted generation |
| `browser-resolution-fixture-kit` | exercises DPR, size, cap and fallback cases |
| `resize-stress-fixture-kit` | proves coalescing and stale-generation rejection |
| `source-artifact-pages-resolution-parity-fixture-kit` | compares source, artifact and deployed-origin policy |

## Command flow

```txt
ViewportSample + DevicePixelRatioSample + QualityManifest
  -> RenderResolutionAdmissionCommand
  -> RenderResolutionAdmissionResult
  -> RenderTargetResizeCommand
  -> RenderTargetResizeResult
  -> RenderBudgetSettlementCommand
  -> RenderBudgetResult
  -> RenderResolutionProjectionCommitCommand
  -> RenderResolutionDigest
  -> FirstResolutionBoundFrameAck
```

## Boundary

Proposed architecture only. Existing aspect, renderer and render-target kits remain implemented and unchanged.