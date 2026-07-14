# WebGL lifecycle audit: Context generation and resource-recovery contract

**Timestamp:** `2026-07-14T01-00-28-04-00`  
**Status:** `audited`

## Summary

WebGL recovery requires an application-owned contract because the game must coordinate renderer state with scene resources, story interaction, fallback visibility and visible-frame proof. A browser restoration event alone cannot establish that the current scene is correctly presented.

## Plan ledger

**Goal:** define the identity, state machine, resource manifest, adoption rules and proof required for deterministic stage recovery.

- [x] Define context and stage generation identity.
- [x] Define lifecycle states and legal transitions.
- [x] Define required resources and preparation receipts.
- [x] Define adoption, rollback and disposal rules.
- [x] Define recovered-frame acknowledgement.
- [ ] Implement and execute the contract.

## Identity

```txt
SurfaceId
ContextGeneration
StageResourceGeneration
SceneDescriptorRevision
ViewportRevision
RenderSubmissionGeneration
RecoveryAttemptId
```

A generation is immutable after adoption. A restored browser context must receive a successor `ContextGeneration`; it must not silently reuse the predecessor identity.

## State machine

```txt
Uninitialized
  -> Preparing
  -> Ready
  -> Lost
  -> Restoring
  -> Probing
  -> Ready

Preparing | Restoring | Probing
  -> Failed

Ready | Lost | Failed
  -> Retired
```

Illegal transitions and stale events return typed rejection results.

## Loss contract

On accepted loss:

```txt
prevent default when restoration is intended
retire the active render-submission lease
mark presentation not ready
suspend stage-dependent interaction
show DOM-only fallback
retain story truth and current scene identity
record predecessor resource manifest
```

## Resource manifest

```txt
renderer and canvas surface
WebGL context capabilities
main scene
stage group
camera and projection state
directional and hemisphere lights
scene background and fog
layer and prop geometry
stage shader materials
hotspot geometry and invisible materials
raycaster bindings
offscreen render target
post scene and post camera
post plane geometry and post shader material
viewport and DPR
recursive RAF ownership
```

## Preparation contract

Each participant prepares detached successor state and returns:

```txt
participant ID
recovery attempt ID
predecessor generation
candidate generation
descriptor or configuration fingerprint
capability evidence
allocation or compilation result
disposal closure
```

No candidate becomes public before all required receipts and the probe pass.

## Probe contract

The probe must establish:

```txt
accepted context is current
renderer can submit
render target is complete
stage and post shaders compile
current scene geometry renders
post pass samples the successor target
viewport and camera match the accepted revision
no fatal GL error is observed
```

## Adoption contract

```txt
all required participants prepared
probe passed
story scene revision still matches
viewport revision still matches or is re-prepared
atomically publish the successor resource graph
resume exactly one render-submission lease
dispose predecessor and unused candidates
keep fallback until first recovered frame ack
```

## Rollback contract

On failure:

```txt
dispose every prepared candidate
publish one terminal failure result
keep presentation not ready
keep stage-dependent interaction suspended
keep fallback visible
retain story truth
allow bounded retry or page reload policy
```

## First recovered frame

```txt
FirstRecoveredStageFrameAck
  surfaceId
  contextGeneration
  stageResourceGeneration
  sceneId
  sceneDescriptorRevision
  viewportRevision
  renderSubmissionGeneration
  frameSequence
  fallbackRetirementReceipt
```

## Completion boundary

Recovery is complete only when the accepted successor graph has produced a visible frame matching current story and viewport truth. Internal Three.js restoration behavior may assist implementation but does not replace this application contract.