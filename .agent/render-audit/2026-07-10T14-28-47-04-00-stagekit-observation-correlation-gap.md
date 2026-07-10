# Render audit: StageKit Observation Correlation Gap

Timestamp: `2026-07-10T14-28-47-04-00`

## Current render path

```txt
story scene descriptor
  -> StageKit.loadScene(sceneData)
  -> clear stage group, hotspot list, and material list
  -> apply background and fog
  -> apply fixed-aspect camera descriptor
  -> create layer meshes
  -> create prop meshes
  -> create invisible hotspot meshes
  -> apply post uniforms
  -> animate camera parallax and material time
  -> render scene to WebGLRenderTarget
  -> render post scene to canvas
```

## Current render services

- Fixed 16:9 camera and viewport handling.
- Three.js WebGL renderer with capped device pixel ratio.
- Directional and hemisphere lighting.
- Exponential fog.
- Descriptor-driven layer, prop, and hotspot construction.
- Procedural shader materials with noise, toon lighting, and rim response.
- Offscreen render target.
- Grain, vignette, chromatic, distortion, memory warp, and scan-line post effects.
- Mouse parallax.
- Raycast hover and click selection.
- Hover-label positioning.

## Missing observation contract

`StageKit` owns live Three.js objects and callback behavior but exposes no JSON-safe readback API. A fixture cannot currently prove:

```txt
which scene source id was loaded
which source fingerprint was consumed
how many layers, props, hotspots, and materials were created
which camera/fog/post values were applied
which hotspot id was hovered or clicked
which input origin triggered the pick
which story command/result consumed that pick
whether the requested scene and loaded scene match
whether a later route transition caused the expected stage load
```

## Required additive rows

### StageLoadObservation

```js
{
  observationId,
  commandId,
  resultId,
  sceneId,
  sourceFingerprint,
  camera: { fov, position, lookAt },
  fogDensity,
  post: { grain, vignette, chromatic, distortion, memory },
  counts: { layers, props, hotspots, materials },
  status: "applied" | "rejected",
  reasonCode
}
```

### StagePickObservation

```js
{
  observationId,
  inputId,
  sceneId,
  hotspotId,
  origin: "hover" | "click",
  pointerNdc: { x, y },
  hit: true | false,
  commandId,
  resultId
}
```

### RenderFrameSummary

A low-frequency diagnostic row may expose frame number, viewport dimensions, pixel ratio, current scene id, material count, hotspot count, and last stage observation id. It should not serialize live renderer objects.

## Correlation requirement

A continue result that requests a new scene must produce a stage-load intent and a matching `StageLoadObservation`. A raycast click must produce a pick observation that identifies the selected hotspot and then correlates to the resulting story command.

## Do not rewrite StageKit first

The current renderer is adequate for the prototype. Add observation methods and wrapper rows around existing methods before any extraction or replacement:

```txt
StageKit.getSourceReadback()
StageKit.getLastLoadObservation()
StageKit.getLastPickObservation()
StageKit.getRenderSummary()
```

These methods should return detached JSON-safe data only.
