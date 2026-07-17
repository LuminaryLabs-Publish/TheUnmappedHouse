# Current audit: The Unmapped House pointer presence retirement

**Timestamp:** `2026-07-17T05-03-18-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `pointer-presence-hover-parallax-retirement-authority-audited`  
**Branch:** `main`

## Summary

`StageKit.handlePointer()` is the only path that updates pointer coordinates, `hovered`, the hover label and camera-parallax input. The canvas has no leave/cancel handler, and scene replacement does not clear pointer-derived state. Stale hover text and parallax can therefore survive after their pointer or scene evidence is invalid.

## Intent

Bind every hover-label and parallax projection to one accepted pointer, scene and viewport generation, then retire it exactly once when presence ends or the scene changes.

## Complete interaction loop

```txt
boot
  -> construct StageKit
  -> register mousemove and click
  -> load scene and start RAF

mousemove
  -> normalize pointer coordinates
  -> update parallax coordinates
  -> raycast hotspot volumes
  -> cache hovered target
  -> project hover label

RAF
  -> consume retained parallax coordinates
  -> render camera-offset frame

pointer/scene retirement gap
  -> leave, cancel, blur, hidden document or scene replacement
  -> no pointer retirement result
  -> stale hover/parallax remain eligible
```

## Domains in use

```txt
browser shell, document lifecycle and public DOM
fixed-aspect viewport and resize projection
story content, state, route, inspection, interlude, terminal and persistence
pointer presence, sample identity, picking, hover, focus and scene retirement
Three.js camera, scene, materials, raycasting and render targets
hover-label and camera-parallax projection
syntax validation, static artifact, Pages and audit governance
```

## Implemented kits and services

The implemented census remains 24 source-backed kits:

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
scene-route-kit
inspection-ledger-kit
clue-ledger-kit
notebook-log-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
camera-parallax-kit
render-target-composition-kit
debug-json-projection-kit
package-syntax-check-kit
static-pages-deploy-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Their complete offered-service table is in `trackers/2026-07-17T05-03-18-04-00/project-breakdown.md` and `kit-registry.json`.

## Source-backed findings

- Canvas `mousemove` mutates pointer, parallax, hover target and hover-label DOM.
- Canvas `click` consumes the current raycast result.
- No canvas `mouseleave` or `pointerleave` listener exists.
- No `pointercancel`, window blur or document visibility retirement exists.
- `loadScene()` replaces hotspots and materials but does not clear `hovered`, hide the hover label or neutralize parallax.
- RAF consumes the retained parallax vector every frame.
- No pointer generation, retirement result or first neutral frame acknowledgement exists.

No production incident was reproduced.

## Required authority

`the-unmapped-house-pointer-presence-hover-parallax-retirement-authority-domain`

```txt
PointerSampleAdmissionCommand
  -> validate scene, viewport and pointer generations
  -> publish PointerSampleAdmissionResult

PointerPresenceRetirementCommand
  -> classify leave/cancel/blur/hidden/scene replacement
  -> clear hover and neutralize parallax exactly once
  -> reject stale samples
  -> publish PointerPresenceRetirementResult

PointerProjectionCommitCommand
  -> publish PointerProjectionCommitResult
  -> publish FirstNeutralPointerFrameAck
```

## Validation boundary

Documentation changed. Runtime JavaScript, HTML, CSS, story content, rendering, interaction, persistence, tests, workflows and deployment did not change. No browser or deployed-origin pointer-presence fixture was run.