# Known gaps: The Unmapped House WebGL context and stage recovery

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

The application has no explicit lifecycle boundary joining WebGL context events, render submission, stage resources, story interaction, fallback presentation and recovered-frame evidence. Context loss can therefore leave presentation truth unknown while story commands remain available.

## Plan ledger

**Goal:** make every context event, readiness change, interaction lease, resource candidate, adoption result and visible recovery outcome explicit and testable.

- [x] Trace renderer construction, stage loading, pointer input and RAF submission.
- [x] Confirm context-loss and restoration handlers are absent.
- [x] Identify interaction and visible-state divergence.
- [x] Define the authority, resources, results and proof.
- [ ] Implement and execute it.

## Identity gaps

```txt
SurfaceId: absent
WebGLContextGeneration: absent
StageResourceGeneration: absent
RenderSubmissionGeneration: absent
RecoveryAttemptId: absent
RecoveryProbeFrameId: absent
RecoveredFrameSequence: absent
```

## Lifecycle and admission gaps

```txt
webglcontextlost event admission: absent
webglcontextrestored event admission: absent
duplicate event rejection: absent
stale generation rejection: absent
render-submission retirement receipt: absent
presentation readiness state: absent
stage-interaction lease: absent
bounded retry policy: absent
terminal WebGLStageRecoveryResult: absent
```

## Fallback and interaction gaps

```txt
WebGL-independent fallback: absent
fallback visibility result: absent
DOM hotspot button suspension: absent
canvas hotspot suspension: absent
continue-command suspension: absent
scene-dependent persistence gate: absent
fallback retirement receipt: absent
```

## Resource reconstruction gaps

```txt
complete stage-resource manifest: absent
renderer recovery candidate: absent
render-target recovery candidate: absent
stage shader preparation receipt: absent
post shader preparation receipt: absent
scene geometry reconstruction receipt: absent
hotspot volume reconstruction receipt: absent
camera and light reconstruction receipt: absent
viewport recovery receipt: absent
candidate disposal closures: absent
```

## Adoption and rollback gaps

```txt
recovery preparation barrier: absent
recovery probe: absent
atomic successor adoption: absent
partial-adoption prevention: absent
candidate rollback result: absent
predecessor failed-state preservation: absent
single resumed RAF lease: absent
```

## Reachable divergence

```txt
context lost
  -> renderer visibility becomes unavailable or unknown
  -> DOM hotspot buttons remain enabled
  -> inspectHotspot can grant clues and save progress
  -> Notebook can advance beyond the last proven stage frame

context restored
  -> browser/Three.js may perform internal work
  -> application publishes no context or stage generation
  -> no evidence joins current scene, viewport and visible canvas

recovery preparation fails
  -> no typed failure or candidate cleanup result
  -> no stable fallback policy
```

## Visible proof gaps

```txt
recovery probe result: absent
accepted recovered-stage envelope: absent
first recovered visible-frame acknowledgement: absent
scene-revision correlation: absent
viewport-revision correlation: absent
fallback-to-frame correlation: absent
interaction-resume correlation: absent
```

## Validation gaps

```txt
browser context-loss fixture: absent
loss-before-first-frame fixture: absent
loss-during-scene fixture: absent
loss-during-interlude fixture: absent
interaction-suspension fixture: absent
resource-preparation failure fixtures: absent
probe and rollback fixtures: absent
first recovered-frame fixture: absent
production-artifact fixture: absent
Pages-origin fixture: absent
```

## Retained independent gaps

```txt
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot input and picking
save commit/reset convergence
interlude progression and focus
normal stage resource lifecycle and shutdown
```

## Completion boundary

Do not claim WebGL recovery because a restored browser event occurs or Three.js may rebuild internal state. Completion requires application-owned context identity, render-submission retirement, visible fallback, interaction suspension, complete resource preparation, probe, atomic adoption or rollback and a first visible frame tied to the accepted scene and viewport revisions.