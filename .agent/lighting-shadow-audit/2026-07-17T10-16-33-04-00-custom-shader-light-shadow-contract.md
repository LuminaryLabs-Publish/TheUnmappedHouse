# Lighting and shadow audit: custom-shader contract

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Current contract

```txt
visible lighting source: fixed lightDir uniform
scene DirectionalLight binding: none
scene HemisphereLight binding: none
shadow receiver sampling: none
shadow-map generation policy: enabled globally
caster flags: enabled on props
receiver flags: enabled on props and layers
```

## Required authority

`the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain`

## Required identities

```txt
SceneGeneration
RendererGeneration
LightingGeneration
MaterialGeneration
ShadowPolicyRevision
ShadowMapGeneration
FrameGeneration
VisibleLightingDigest
```

## Required decisions

### Scene-bound custom lighting

Bind accepted directional and ambient/hemisphere descriptors into custom shader uniforms and, when shadows are enabled, bind a compatible shadow receiver path.

### Fixed anime lighting

Declare the fixed `lightDir` model as intentional, remove or disable unused scene lights and shadow-map work, and expose the fixed model in diagnostics.

### Rejection

Reject mixed configuration where shadow-map work is enabled but no accepted visible material consumes it.

## Result statuses

```txt
StageLightingAcceptedCustomBound
StageLightingAcceptedFixedUnshadowed
StageLightingRejectedMixedAuthority
StageLightingRejectedStale
ShadowWorkAccepted
ShadowWorkDisabledNoConsumer
ShadowWorkRejectedBudget
ShadowWorkRejectedStale
LightingProjectionCommitted
LightingProjectionRejectedStale
FirstLightBoundFrameAcknowledged
```

## Invariants

- One scene generation has one declared lighting model.
- A shadow map is generated only for accepted consumers.
- Light and shadow revisions cannot cross scene generations.
- The visible frame reports the lighting digest it consumed.
- Disabling unused shadow work must preserve intended fixed anime shading.

## Boundary

Contract only. No implementation or executable proof is included.