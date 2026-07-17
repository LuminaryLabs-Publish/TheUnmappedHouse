# Architecture audit: custom-material lighting and shadow DSK map

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `custom-material-shadow-lighting-projection-authority-audited`

## Summary

The current render graph declares two scene lights and shadow-map ownership, while the visible anime material implements an independent fixed-direction lighting model. These are separate authorities with no admission or projection result joining them.

## Current DSK/domain map

```txt
browser-story-runtime-kit
  -> scene-route-kit
  -> story-data-kit
  -> stage-render-kit
       -> Three.WebGLRenderer
       -> DirectionalLight + HemisphereLight
       -> shadowMap enabled
       -> render target + post pass
  -> scene-descriptor-consumer-kit
       -> layers
       -> props
       -> hotspots
  -> anime-material-kit
       -> custom ShaderMaterial
       -> fixed lightDir uniform
       -> toon shading
  -> render-target-composition-kit
       -> stage render
       -> post render
```

## Ownership split

```txt
scene-light authority
  owns light objects, transform, intensity, color and castShadow

geometry shadow authority
  owns prop castShadow/receiveShadow and layer receiveShadow

custom-material authority
  owns visible shading through fixed lightDir

missing parent authority
  no result proves scene lights or shadow maps affect the visible custom material
```

## Required parent domain

`the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain`

## Command/result boundary

```txt
StageLightingAdmissionCommand
  inputs:
    scene revision
    renderer generation
    light descriptors
    material descriptors
    lighting model
  result:
    StageLightingAdmissionResult

ShadowWorkAdmissionCommand
  inputs:
    accepted lighting generation
    caster/receiver census
    shadow resolution and update policy
  result:
    ShadowWorkAdmissionResult

LightingProjectionCommitCommand
  inputs:
    accepted material-light bindings
    shadow receiver bindings
    rendered frame generation
  result:
    LightingProjectionCommitResult
    VisibleLightingDigest
    FirstLightBoundFrameAck
```

## Decision rule

Choose exactly one coherent implementation:

1. Bind scene lights and shadow sampling into the custom shader; or
2. Declare fixed-direction unshadowed anime lighting and disable unused scene-light/shadow work.

Do not retain both independent paths without an explicit compatibility and cost policy.

## Boundary

Proposed architecture only. No DSK, shader, renderer or scene source changed.