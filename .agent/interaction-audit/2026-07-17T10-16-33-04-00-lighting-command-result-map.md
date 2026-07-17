# Interaction audit: lighting command/result map

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Summary

Lighting is currently configured through direct object mutation and fixed shader uniforms. There is no typed result connecting scene-light intent to the frame the player uses for inspection.

## Current path

```txt
StageKit constructor
  -> create DirectionalLight
  -> create HemisphereLight
  -> enable shadow map

loadScene
  -> create custom materials
  -> set castShadow/receiveShadow flags

animate
  -> update time uniforms
  -> render scene and post pass
```

## Missing interaction results

```txt
StageLightingAdmissionResult
ShadowWorkAdmissionResult
LightingProjectionCommitResult
VisibleLightingDigest
FirstLightBoundFrameAck
```

## Proposed map

```txt
StageLightingAdmissionCommand
  accepted -> bind scene lights to declared material model
  rejected -> preserve predecessor lighting generation

ShadowWorkAdmissionCommand
  accepted -> generate only budgeted, consumable shadow evidence
  disabled -> skip shadow-map work for fixed unshadowed materials
  rejected -> preserve predecessor policy and report reason

LightingProjectionCommitCommand
  accepted -> publish visible-lighting digest and first-frame acknowledgement
  stale -> reject predecessor scene/material/light generation
```

## Boundary

This file defines proposed command/result semantics only. No interaction or rendering source changed.