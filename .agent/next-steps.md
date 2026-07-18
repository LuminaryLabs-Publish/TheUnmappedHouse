# Next steps: The Unmapped House render-loop frame allocation and scratch ownership

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `audited`

## Summary

The smallest safe change is to preserve visible camera and post-processing behavior while retaining the RAF callback and camera-position scratch state once per StageKit generation.

## Checklist

- [ ] Add a render-frame-work manifest.
- [ ] Allocate `StageGeneration`, `FrameGeneration`, `RafCallbackLeaseId` and `FrameScratchLeaseId`.
- [ ] Retain one RAF callback instead of creating an arrow callback each frame.
- [ ] Retain one `THREE.Vector3` camera-position scratch value.
- [ ] Replace per-frame `clone()` with `scratch.copy(baseCamera.position)`.
- [ ] Retire callback and scratch leases through the StageKit lifecycle path.
- [ ] Add `RenderFrameWorkAdmissionCommand` and typed results.
- [ ] Add `FrameScratchLeaseCommand` and typed results.
- [ ] Add source-owned allocation counters.
- [ ] Keep provider/browser heap observations separately classified.
- [ ] Add stale stage/frame-work rejection.
- [ ] Publish `RenderFrameWorkDigest`.
- [ ] Publish `FirstFrameWorkBoundPresentationAck`.
- [ ] Add a steady-state frame-allocation fixture.
- [ ] Add a camera-parallax visual equivalence fixture.
- [ ] Add scene-transition scratch-retirement coverage.
- [ ] Add hidden/resume and terminal-state fixtures.
- [ ] Run `npm run check`.
- [ ] Run source, production artifact and Pages parity fixtures.

## Do not do

- Do not infer a garbage-collection or frame-time problem from source construction alone.
- Do not attribute Three.js or browser allocations to product code without evidence.
- Do not alter camera parallax values while changing scratch ownership.
- Do not restructure story, hotspot or save domains for this targeted frame-work change.
- Do not claim a performance improvement until browser evidence compares predecessor and successor behavior.