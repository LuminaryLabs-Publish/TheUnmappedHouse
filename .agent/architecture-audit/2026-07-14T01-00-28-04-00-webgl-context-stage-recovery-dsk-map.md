# Architecture audit: WebGL context and stage-recovery DSK map

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `webgl-context-stage-recovery-authority-audited`

## Summary

The current runtime combines renderer ownership, GPU resources, scene construction, pointer picking and recursive frame submission inside `StageKit`. It has no parent domain coordinating context events, readiness, fallback, resource reconstruction, atomic stage adoption or recovered-frame evidence.

## Plan ledger

**Goal:** define a narrow authority that coordinates presentation recovery without absorbing story, persistence, scene-authoring or renderer implementation domains.

- [x] Map the current source-backed domains.
- [x] Preserve all 24 implemented kits and services.
- [x] Identify context-loss participants and ownership gaps.
- [x] Define one parent authority and bounded child kits.
- [x] Define commands, receipts, terminal results and proof.
- [ ] Implement and execute the composition.

## Existing composition

```txt
static page shell
  -> browser story runtime
  -> story data and state ledgers
  -> StageKit
       -> Three.js provider
       -> WebGLRenderer and canvas
       -> Scene, Camera and lights
       -> scene descriptor consumer
       -> geometry and shader materials
       -> hotspot volumes and raycaster
       -> WebGLRenderTarget
       -> post-processing scene
       -> resize and pointer listeners
       -> recursive RAF
  -> syntax checks
  -> static Pages deployment
```

## Current ownership problem

```txt
renderer context lifetime       StageKit implicit
render-submission lifetime      recursive RAF implicit
presentation readiness          absent
fallback ownership              absent
interaction admission           game.js and StageKit independent
GPU resource manifest           absent
recovery preparation            absent
atomic adoption                 absent
rollback                        absent
recovered-frame proof           absent
```

## Required parent domain

```txt
the-unmapped-house-webgl-context-stage-recovery-authority-domain
```

The parent coordinates only lifecycle identity, admission, participant preparation, adoption, rollback and proof. It does not generate story data, mutate story truth, author Three.js resources or own browser storage.

## Required child kits

| Kit | Required services |
|---|---|
| `webgl-context-generation-kit` | Surface and context generation identity, predecessor/successor ordering. |
| `webgl-context-event-admission-kit` | Lost/restored event normalization, duplicate and stale rejection. |
| `render-submission-lease-kit` | Admit, retire and resume one RAF submission generation. |
| `presentation-readiness-kit` | Ready, lost, restoring, recovered and failed projection state. |
| `stage-interaction-admission-kit` | Suspend stage-dependent pointer and DOM inspection commands during loss. |
| `webgl-independent-fallback-kit` | DOM-only visible fallback and recovery status. |
| `stage-resource-manifest-kit` | Renderer, target, post graph, geometry, materials, hotspots, camera, lights and viewport inventory. |
| `renderer-recovery-candidate-kit` | Renderer/context candidate and capability receipt. |
| `render-target-recovery-candidate-kit` | Offscreen target candidate and size/sample receipt. |
| `shader-material-recovery-candidate-kit` | Stage and post shader candidate compilation receipts. |
| `scene-geometry-recovery-candidate-kit` | Layer and prop geometry reconstruction receipts. |
| `hotspot-volume-recovery-candidate-kit` | Raycast volume reconstruction and descriptor binding. |
| `camera-light-recovery-candidate-kit` | Camera, light and scene-state reconstruction. |
| `viewport-recovery-candidate-kit` | Current fixed-aspect viewport and DPR candidate. |
| `stage-recovery-probe-kit` | Detached or non-adopted probe render and readback result. |
| `stage-recovery-adoption-kit` | Atomic participant swap and accepted generation publication. |
| `stage-recovery-rollback-kit` | Candidate disposal and predecessor failed-state preservation. |
| `webgl-stage-recovery-result-kit` | One terminal typed result. |
| `recovery-diagnostics-kit` | Context, resource, probe, adoption and failure evidence. |
| `first-recovered-stage-frame-ack-kit` | First visible frame tied to accepted context/stage revision. |
| `webgl-context-recovery-fixture-matrix-kit` | Source, browser, built-output and Pages recovery fixtures. |

## Command and result flow

```txt
WebGLContextLifecycleEvent
  -> ContextEventAdmissionResult
  -> RenderSubmissionRetirementResult
  -> PresentationReadinessResult
  -> FallbackProjectionResult
  -> StageResourceManifest
  -> StageRecoveryPreparationResult[]
  -> StageRecoveryProbeResult
  -> StageRecoveryAdoptionResult or StageRecoveryRollbackResult
  -> WebGLStageRecoveryResult
  -> FirstRecoveredStageFrameAck
```

## Required invariants

```txt
one accepted context generation per surface
no stage-dependent interaction while presentation is lost or unverified
story truth remains unchanged by presentation recovery
all required recovery participants prepare before adoption
no mixture of predecessor and successor GPU resources
failed candidates are disposed
render submission resumes only for the accepted generation
fallback remains visible until the first accepted recovered frame
first recovered frame cites context, stage, scene and viewport revisions
```

## Domain boundaries

Keep these independent:

```txt
story-save schema and manifest admission
scene-transition composition
viewport authority
renderer-provider admission
hotspot semantic picking
stage resource disposal during normal scene replacement or shutdown
```

The recovery authority consumes their accepted identities and receipts but does not replace their policies.

## Validation boundary

This document defines architecture only. It does not prove that Three.js cannot internally restore a context, nor does it claim that the application currently reconstructs or visibly recovers its stage.