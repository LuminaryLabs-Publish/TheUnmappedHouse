# Render audit: StageKit Command Adapter Readback Gap

Timestamp: `2026-07-10T13-01-11-04-00`

## Current render surface

`StageKit` consumes scene descriptors and renders them through Three.js.

It owns:

```txt
WebGLRenderer
PerspectiveCamera
DirectionalLight and HemisphereLight
scene/fog/background
stageGroup
anime ShaderMaterial
hotspot invisible boxes
Raycaster picking
hover label placement
post-process render target and shader pass
fixed aspect resize
animation loop
```

## Readback gap

`StageKit.loadScene(scene)` consumes descriptors but returns no serializable row.

`StageKit.clickHotspot()` calls a callback but returns no serializable pick row.

`handlePointer()` updates hover state and DOM label but returns no hover readback row.

## Why this blocks proof

Story authority cannot prove that a command result led to the correct stage load, hover, or pick path.

The browser can visually work while still lacking fixture proof.

## Needed next rows

```txt
StageLoadIntentRecord
StageLoadReadback
StagePickReadback
StageHoverReadback
RenderSourceConsumptionRecord
PostProcessConsumptionRecord
```

## Main finding

Do not rewrite `StageKit` next.

Add additive readback rows around scene load and pick behavior so story command results can be fixture-proved against render adapter consumption.
