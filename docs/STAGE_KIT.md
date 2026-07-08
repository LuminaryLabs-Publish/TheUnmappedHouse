# Stage Kit Design

The Stage Kit is the reusable renderer/runtime boundary for **The Unmapped House**.

## Purpose

Create fixed-camera anime-style point-and-click stage scenes from data.

## Owns

- Three.js renderer
- Locked camera
- Mouse parallax
- Procedural stage props
- Anime triplanar/toon shader materials
- Hotspot mesh creation
- Raycast picking
- Render target
- WebGL post-processing pass

## Does not own

- Story truth
- Clue state
- Dialogue/story text
- Puzzle validation
- Save state
- Scene progression

## Runtime flow

```txt
SceneData
→ StageKit.loadScene(scene)
→ build layers / props / invisible hotspots
→ render to WebGLRenderTarget
→ post-process shader
→ screen
```

## Art direction

The camera is fixed. Objects only need to look right from that camera.

Use:
- planes for painted walls
- boxes for desks, shelves, signs, doors
- layered planes for reflections
- invisible hotspot boxes for point-click interaction
- shader time uniforms for atmospheric motion

## Implemented feature checklist

- [x] Fixed perspective stage scenes
- [x] Locked camera
- [x] Mouse parallax
- [x] Procedural stage building from data
- [x] Clickable hotspots
- [x] Text adventure story state
- [x] Anime stage shader
- [x] Triplanar-style procedural surface mapping
- [x] Render-to-texture post-processing
- [x] Grain / vignette / chromatic / distortion / memory corruption
- [x] GitHub Pages deployment workflow
