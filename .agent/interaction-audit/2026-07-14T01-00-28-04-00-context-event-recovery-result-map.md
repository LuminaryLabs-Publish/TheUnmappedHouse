# Interaction audit: WebGL context event and recovery result map

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

The current browser interaction graph has no route from WebGL context events to presentation readiness, fallback UI, interaction admission, resource recovery or visible-frame evidence.

## Plan ledger

**Goal:** define one result-bearing event flow that every presentation and interaction participant can observe without directly sharing mutable renderer state.

- [x] Map current browser events and callbacks.
- [x] Identify missing context-event normalization.
- [x] Define command, participant receipt and terminal-result flow.
- [x] Define interaction and fallback projections.
- [ ] Implement and execute the result map.

## Current map

```txt
window resize
  -> StageKit.resize

canvas mousemove
  -> pointer normalization
  -> raycast
  -> hover projection

canvas click
  -> raycast
  -> onHotspot
  -> story mutation

DOM button click
  -> story mutation

webglcontextlost
  -> no application route

webglcontextrestored
  -> no application route
```

## Required event map

```txt
browser webglcontextlost
  -> normalize WebGLContextLifecycleEvent
  -> ContextEventAdmissionResult
  -> retire RenderSubmissionLease
  -> publish PresentationReadiness(Lost)
  -> publish StageInteractionLease(Suspended)
  -> show WebGLIndependentFallback
  -> publish LossAccepted

browser webglcontextrestored
  -> normalize WebGLContextLifecycleEvent
  -> allocate RecoveryAttemptId
  -> prepare StageResourceManifest participants
  -> collect StageRecoveryPreparationReceipt[]
  -> execute StageRecoveryProbe
  -> publish StageRecoveryProbeResult
  -> adopt all participants or roll back all candidates
  -> publish WebGLStageRecoveryResult
  -> resume one RenderSubmissionLease
  -> publish FirstRecoveredStageFrameAck
  -> retire fallback
  -> publish StageInteractionLease(Active)
```

## Participant receipts

```txt
RendererPrepared
RenderTargetPrepared
StageShadersPrepared
PostShaderPrepared
SceneGeometryPrepared
HotspotVolumesPrepared
CameraLightsPrepared
ViewportPrepared
ProbeFramePassed
CandidateDisposed
```

## Terminal result statuses

```txt
LossAccepted
LossDuplicate
LossStale
RecoveryPrepared
RecoveryAdopted
RecoveryRejected
RecoveryFailed
RollbackPreserved
Cancelled
```

## Public projections

The browser host should expose immutable readback only:

```txt
presentation status
accepted context generation
accepted stage generation
current scene ID
fallback visibility
interaction lease status
last recovery result
last recovered frame acknowledgement
```

It must not expose the raw renderer or WebGL context as a recovery control surface.

## Failure containment

Any preparation or probe failure must keep the fallback visible, keep stage-dependent interaction suspended, dispose all successor candidates and publish one terminal failure result. It must not partly replace the render target, post graph or stage resources.

## Completion boundary

A context-restored browser event is evidence of an opportunity to recover, not evidence of a recovered game. Completion requires the result flow through participant preparation, probe, adoption and first visible frame.