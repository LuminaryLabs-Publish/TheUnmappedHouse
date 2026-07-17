# Current audit: The Unmapped House custom-material lighting and shadows

**Timestamp:** `2026-07-17T10-16-33-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `custom-material-shadow-lighting-projection-authority-audited`  
**Branch:** `main`

## Summary

`StageKit` declares scene lighting and shadow work through Three.js light objects, renderer shadow-map enablement and geometry cast/receive flags. The visible anime material is a custom shader that uses a fixed `lightDir` uniform and does not consume the scene lights or shadow map.

## Intent

Make lighting intent, shadow cost and visible material output belong to one accepted scene/render generation.

## Source-backed finding

```txt
DirectionalLight and HemisphereLight: present
renderer shadowMap: enabled
DirectionalLight castShadow: enabled
prop castShadow/receiveShadow: enabled
layer receiveShadow: enabled
custom ShaderMaterial on visible surfaces: present
fixed lightDir shading: present
Three.js light binding: absent
shadow-map sampling: absent
visible-lighting digest: absent
first light-bound frame acknowledgement: absent
```

## Required authority

`the-unmapped-house-custom-material-shadow-lighting-projection-authority-domain`

## Smallest safe implementation

1. Declare whether each scene uses scene-bound custom lighting or fixed unshadowed anime lighting.
2. For scene-bound lighting, bind accepted light descriptors and a compatible shadow receiver into the custom shader.
3. For fixed lighting, disable unused scene-light and shadow-map work.
4. Publish typed admission/projection results, a visible-lighting digest and `FirstLightBoundFrameAck`.
5. Prove frame response and render cost in source, artifact and Pages fixtures.

## Boundary

Documentation only. No shader, renderer, light, shadow, story, input, save, build or deployment behavior changed.