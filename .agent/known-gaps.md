# Known gaps: The Unmapped House runtime frame fault containment

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Summary

The recursive frame loop has no explicit attempt, failure, retry, retirement or recovery state. Because the successor callback is scheduled before frame work, a persistent failure can continue receiving display-refresh callbacks.

## Identity gaps

```txt
RuntimeGeneration: absent
FrameGeneration: absent
FrameAttemptId: absent
FramePhasePlanRevision: absent
RendererGeneration: absent
TargetGeneration: absent
FaultId and FaultFingerprint: absent
RecoveryId: absent
FirstSafeFaultFrameAck: absent
FirstRecoveredFrameAck: absent
```

## Settlement gaps

```txt
FrameAttemptResult: absent
phase-specific failure result: absent
fault retryability classification: absent
fault deduplication: absent
bounded retry budget: absent
retry backoff: absent
runtime retirement result: absent
interaction suspension result: absent
renderer/target settlement result: absent
safe failure projection result: absent
restart command/result: absent
```

## Current scheduling mismatch

```txt
successor callback: admitted first
frame attempt result: nonexistent
camera/material/render failure: may throw later
callback cancellation: unavailable
persistent-fault cadence: potentially every RAF
terminal fallback: unavailable
```

## Proof gaps

```txt
camera-phase fault fixture: absent
material-phase fault fixture: absent
scene-render fault fixture: absent
post-render fault fixture: absent
retry-budget fixture: absent
backoff fixture: absent
stale callback fixture: absent
safe fallback fixture: absent
restart idempotency fixture: absent
first recovered frame fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
scene-entry narrative projection
hotspot availability and discovery projection
story content graph validation
browser startup readiness and retry
story save writer lease and revision
story audio event projection
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition and atomicity
renderer-provider admission
raw hotspot input picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim runtime fault containment until each named frame phase produces a terminal result; repeated failures are bounded and backed off; stale callbacks and interactions are rejected after retirement; one safe fallback is visible; restart is idempotent; and source, artifact and Pages fixtures acknowledge the recovered frame.