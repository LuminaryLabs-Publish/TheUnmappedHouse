# Next steps: The Unmapped House runtime frame fault containment

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is to introduce a frame-attempt boundary and bounded failure settlement before changing the renderer or adding broad recovery behavior.

## Checklist

- [ ] Allocate `RuntimeGeneration`, `FrameGeneration` and `FrameAttemptId`.
- [ ] Split camera, material, scene-render and post-render into named phases.
- [ ] Return immutable `FrameAttemptResult` values.
- [ ] Move successor scheduling behind accepted completion or retry admission.
- [ ] Classify phase failures and compute a stable fault fingerprint.
- [ ] Add a bounded retry budget and minimum backoff.
- [ ] Deduplicate identical repeated failures.
- [ ] Retire stale callbacks and suspend stage interactions after terminal failure.
- [ ] Preserve accepted story/save state while the renderer is retired.
- [ ] Project one bounded safe failure surface with an explicit restart action.
- [ ] Make restart idempotent and bind it to the retired generation.
- [ ] Publish `FirstSafeFaultFrameAck` and `FirstRecoveredFrameAck`.
- [ ] Add source, staged-artifact and Pages fault fixtures.

## Ordered implementation

### 1. Frame attempt

Create one command that binds runtime, scene, renderer, target and frame generations. Execute named phases and produce one terminal result.

### 2. Scheduling ownership

Do not request an unconditional successor before frame work. A completed attempt may admit the next normal frame; a failed attempt must enter retry or retirement policy.

### 3. Fault policy

Classify the failed phase, deduplicate repeated evidence, consume a bounded retry budget and apply backoff. Unknown failures fail closed.

### 4. Retirement

Retire stale callbacks, suspend interaction, settle renderer/target ownership and retain the accepted story/save generation.

### 5. Safe projection and restart

Project one safe failure state. Restart must choose an explicit resume, reload or reset policy and must not replay story commands.

### 6. Proof

Inject failures into every named phase and prove bounded retries, retirement, safe projection, restart idempotency and the first recovered frame at source, artifact and Pages origins.

## Do not combine yet

Keep scene-entry narrative, hotspot availability/picking, save, interlude, focus, WebGL context recovery and stage-resource lifecycle as retained independent authorities.