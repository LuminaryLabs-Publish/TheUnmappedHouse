# Render audit: StageKit consumption readback contract

Timestamp: `2026-07-09T23-28-35-04-00`

## Current render surface

`src/stage-kit.js` owns the visual route:

- Three.js WebGL renderer.
- Fixed 16:9 aspect frame via `calculateFrame` and `applyFrame`.
- Scene, camera, lights, and fog.
- Layer and prop descriptor consumption.
- Hotspot volume meshes.
- Pointer raycast picking and hover label placement.
- Anime-style shader materials.
- Render target and post-process pass.
- Resize handling and animation loop.

## Render loop

```txt
StageKit constructor
  -> create renderer, scene, camera, post scene, hover label, event listeners
  -> loadScene(scene descriptor)
  -> set background, fog, camera, post uniforms
  -> build layers, props, and hotspot volumes
  -> animate()
  -> render scene into target
  -> render post-process quad to screen
```

## Render finding

The render surface is stable enough to preserve. The next issue is not visual fidelity or StageKit extraction. The missing contract is browser adapter readback: after a story command result asks for a stage transition, the adapter should record which scene descriptor was loaded and expose that readback in fixture-readable diagnostics.

## Required next readback rows

- `stage_load_requested`: scene id and source command id.
- `stage_load_consumed`: scene id, hotspot count, layer count, prop count, camera fov, and post settings.
- `hover_pick`: hotspot id or null plus pointer source.
- `click_pick`: hotspot id or null plus command envelope id.
- `projection_consumed`: DOM projection id linked to command result id.

## Validation gap

There is no DOM-free fixture for StageKit consumption. Browser smoke can prove rendering manually, but it cannot yet prove that story command results and render loads are aligned.
