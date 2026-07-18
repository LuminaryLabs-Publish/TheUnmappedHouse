# Next steps: The Unmapped House render resolution and framebuffer budget

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to keep the fixed CSS aspect frame while bounding the physical renderer and offscreen-target workload through one explicit quality policy.

## Checklist

- [ ] Add a render-quality manifest.
- [ ] Define maximum drawing-buffer dimensions and pixel area.
- [ ] Define maximum offscreen target dimensions and sample area.
- [ ] Add explicit render scale separate from CSS layout scale.
- [ ] Allocate `ViewportGeneration`, `QualityPolicyRevision`, `ResizeGeneration` and `FrameGeneration`.
- [ ] Add `RenderResolutionAdmissionCommand` and typed results.
- [ ] Add `RenderTargetResizeCommand` and typed results.
- [ ] Coalesce rapid resize samples.
- [ ] Reject stale resize generations.
- [ ] Add allocation-failure fallback in this order: samples, admitted DPR, render scale.
- [ ] Preserve hotspot picking and DOM placement in CSS viewport coordinates.
- [ ] Observe scene-pass, post-pass and total frame cost.
- [ ] Publish `RenderResolutionDigest`.
- [ ] Publish `FirstResolutionBoundFrameAck`.
- [ ] Add DPR1, DPR2, large-window, small-window and rapid-resize fixtures.
- [ ] Add allocation-failure and quality recovery fixtures.
- [ ] Run `npm run check`.
- [ ] Run source, production artifact and Pages parity fixtures.

## Do not do

- Do not change CSS aspect layout to solve a physical buffer budget.
- Do not silently lower resolution without a typed quality result.
- Do not let resize callbacks commit stale target allocations.
- Do not claim a performance improvement until browser timing evidence exists.
- Do not restructure story, save or interaction domains for this targeted render fix.