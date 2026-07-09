# Stage GameHost Readback Consumer Freeze

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Intent

Freeze render behavior for the next pass. The next implementation should not rewrite `StageKit`; it should add pure stage snapshots, stage projections, adapter readback, and additive GameHost diagnostics around the existing renderer.

## Current render route

```txt
index.html #stage
  -> src/game.js constructs StageKit
  -> StageKit imports Three.js from CDN
  -> WebGLRenderer attaches canvas
  -> fixed 16:9 aspect frame is applied
  -> PerspectiveCamera reads scene camera descriptor
  -> layers, props, and hotspot volumes are created from story descriptors
  -> anime ShaderMaterial animates triplanar/noise/toon shading
  -> WebGLRenderTarget captures scene pass
  -> post-process ShaderMaterial applies grain/vignette/chromatic/distortion/memory
  -> requestAnimationFrame loop renders target then post scene
```

## Render domains

```txt
fixed-aspect-frame:
  service: 1920x1080 design contract, 16:9 composition, browser letterbox/pillarbox frame.

stage-render-host:
  service: renderer, scene, stage group, lights, camera, render target, post scene, clock, frame loop.

scene-descriptor-consumer:
  service: background, fog, camera, stage layers, stage props, hotspots, post settings.

anime-material-shader:
  service: color triplet, noise scale, toon steps, light direction, animated shader uniforms.

postprocess-pass:
  service: grain, vignette, chromatic offset, distortion, memory scanline/warp.

hotspot-volume-rendering:
  service: invisible BoxGeometry volumes with hotspot userData for picking.

render-readback-next:
  service: serializable `StageSceneSnapshot`, `StageProjection`, `BrowserAdapterReadback`, and `GameHostStoryDiagnostics` without changing visuals.
```

## What to preserve

```txt
public route
16:9 frame
current scene descriptors
current story copy
current StageKit class name and constructor contract
Three.js CDN import
current shader/post-process look
hotspot raycast behavior
hover label behavior
current interlude overlay shell
current debug panel visibility
```

## Missing render proof

```txt
StageSceneSnapshot does not exist.
StageProjection does not exist.
No DOM-free row proves every scene has a camera descriptor.
No DOM-free row proves hotspot descriptors are clickable volumes.
No DOM-free row proves completion-required clues are grantable by scene hotspots.
No BrowserAdapterReadback proves StageKit consumed a requested scene load.
No GameHost diagnostics expose current stage scene, stage snapshot id, projected scene load reason, or adapter readback state.
```

## Next render-adjacent rows

```txt
stage_scene_snapshot:
  status: accepted
  proves: scene id, title, camera, layer count, prop count, hotspot count, post settings, fog/background facts

stage_projection:
  status: projected
  proves: scene id to load, reason, source snapshot fingerprint, expected StageKit method

browser_adapter_readback:
  status: readback
  proves: StageProjection was consumed or intentionally left unchanged

GameHost_projection:
  status: readback
  proves: window.GameHost.getState().story.stage exposes current scene and latest readback
```

## Do not do next

```txt
Do not rewrite StageKit.
Do not replace Three.js.
Do not change the camera composition.
Do not move to new art assets.
Do not add new scenes.
Do not turn the render pass into a test target before story authority fixture rows exist.
```
