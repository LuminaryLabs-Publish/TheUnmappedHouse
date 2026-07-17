# Render audit: shadow work without visible shadow consumption

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Status:** `audited`

## Summary

The renderer is configured to produce shadows, but the visible custom material has no shadow sampling path. The scene also contains lights whose values are not bound into the custom shader.

## Source path

```txt
renderer.shadowMap.enabled = true
DirectionalLight.castShadow = true
props castShadow = true
props receiveShadow = true
layers receiveShadow = true

animeMaterial()
  -> ShaderMaterial
  -> fixed lightDir uniform
  -> fragment computes max(dot(normal, lightDir), 0)
  -> no Three.js light chunks
  -> no shadow-map sampling
```

## Visible-frame gap

```txt
scene light or shadow configuration changes
  -> render work may change
  -> custom material lighting remains fixed
  -> no typed projection result
  -> no digest proves the frame used accepted light/shadow evidence
```

## Risks

- Shadow-map passes can consume GPU time without changing visible authored surfaces.
- Directional-light position, intensity and color can be misleading configuration.
- Hemisphere-light configuration can be entirely inert for authored materials.
- Future scene authors can assume cast/receive flags are effective when they are not.
- Renderer cost and visible quality cannot be reconciled from current diagnostics.

## Required proof

```txt
light transform A/B frame comparison
light intensity/color A/B frame comparison
hemisphere-light A/B frame comparison
shadow receiver on/off frame comparison
GPU/frame timing with shadow work enabled and disabled
VisibleLightingDigest equality/inequality checks
FirstLightBoundFrameAck
```

## Boundary

No visual defect or performance regression was reproduced. Runtime rendering is unchanged.