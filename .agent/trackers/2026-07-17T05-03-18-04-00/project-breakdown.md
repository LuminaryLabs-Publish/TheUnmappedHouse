# Project breakdown: The Unmapped House pointer presence retirement

**Timestamp:** `2026-07-17T05-03-18-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `pointer-presence-hover-parallax-retirement-authority-audited`

## Summary

The full Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledgers, root `.agent` state and synchronized documented heads. `TheUnmappedHouse` had the oldest synchronized central timestamp and was the only selected repository.

The focused finding is in `StageKit`: pointer movement inside the WebGL canvas updates raycast coordinates, `hovered`, the hover label and cached camera-parallax values. The host registers `mousemove` and `click`, but no pointer-exit, cancellation, blur, visibility or scene-transition retirement path. Leaving the canvas or loading another scene can therefore preserve a stale hotspot label and the last parallax offset until another in-canvas move occurs.

No production incident was reproduced. This is a source-backed interaction-state and visible-frame convergence gap.

## Selection comparison

```txt
TheUnmappedHouse   2026-07-16T23-40-57-04-00 selected
PhantomCommand     2026-07-16T23-59-01-04-00
AetherVale         2026-07-17T00-39-47-04-00
TheLongHaul        2026-07-17T01-01-09-04-00
TheOpenAbove       2026-07-17T02-32-08-04-00
PrehistoricRush    2026-07-17T02-50-44-04-00
MyCozyIsland       2026-07-17T03-06-12-04-00
IntoTheMeadow      2026-07-17T03-44-31-04-00
HorrorCorridor     2026-07-17T03-58-09-04-00
ZombieOrchard      2026-07-17T04-41-15-04-00
TheCavalryOfRome   excluded
```

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
```

## Complete interaction loop

```txt
boot
  -> load story state and resolve scene
  -> construct StageKit and WebGL resources
  -> register canvas mousemove and click listeners
  -> load scene descriptors
  -> render UI, persist state and start RAF

pointer interaction
  -> mousemove inside canvas
  -> normalize pointer and parallax coordinates
  -> raycast current hotspot volumes
  -> cache hovered hotspot
  -> show/move hover label
  -> retain mouse x/y for camera parallax

scene and frame projection
  -> RAF reads retained mouse x/y
  -> camera remains offset by the latest in-canvas sample
  -> loadScene replaces stage children, hotspots and materials

retirement gap
  -> pointer leaves canvas, browser loses focus, document hides,
     pointer is cancelled or scene generation changes
  -> no retirement command runs
  -> hovered and mouse x/y remain cached
  -> hover label may remain visible with predecessor text
  -> camera may remain offset until another in-canvas mousemove
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport and resize projection
authored story content and descriptor data
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
pointer presence, sample identity, exit/cancel/blur retirement and stale-sample rejection
Three.js scene, camera, geometry, materials, shaders and raycasting
WebGL renderer, render target, post processing and recursive RAF
hover-label and camera-parallax visible-frame convergence
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude and initial Loading copy |
| `aspect-frame-kit` | fixed design aspect, window-fit calculation and DOM frame placement |
| `story-data-kit` | scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials and post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, Continue, reset, UI projection and persistence calls |
| `scene-route-kit` | scene ID resolution and authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant and clue query |
| `notebook-log-kit` | prepend narrative log and bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement and delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, offscreen target, callbacks and recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | procedural shader materials and elapsed-time animation |
| `post-process-kit` | animated grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | offscreen stage pass, post pass and target sizing |
| `debug-json-projection-kit` | story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers and timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned pointer-presence surfaces: 18
```

## Source-backed finding

```txt
canvas mousemove listener: present
canvas click listener: present
hovered hotspot cache: present
hover label show and position: present
camera-parallax mouse cache: present
scene load clears hotspots/material list: present

canvas mouseleave/pointerleave listener: absent
pointercancel listener: absent
window blur retirement: absent
document visibility retirement: absent
scene-generation pointer reset: absent
hover-label reset during loadScene: absent
parallax neutralization during retirement: absent
PointerPresenceResult: absent
FirstNeutralPointerFrameAck: absent
browser exit/transition fixtures: 0
```

## Required authority

`the-unmapped-house-pointer-presence-hover-parallax-retirement-authority-domain`

```txt
PointerSampleAdmissionCommand
  -> bind pointer, scene, viewport and stage generations
  -> normalize coordinates and raycast once
  -> publish PointerSampleAdmissionResult

PointerPresenceRetirementCommand
  -> handle leave, cancel, blur, hidden document and scene replacement
  -> retire the accepted pointer generation exactly once
  -> clear hovered hotspot and hide stale label
  -> neutralize or boundedly ease parallax
  -> reject stale predecessor samples
  -> publish PointerPresenceRetirementResult

PointerProjectionCommitCommand
  -> project one accepted hover-label and camera-parallax generation
  -> publish PointerProjectionCommitResult
  -> publish FirstNeutralPointerFrameAck after retirement
```

## Planned authority surfaces

```txt
the-unmapped-house-pointer-presence-hover-parallax-retirement-authority-domain
pointer-session-kit
pointer-sample-admission-command-kit
pointer-sample-result-kit
pointer-presence-state-kit
pointer-generation-kit
pointer-exit-classifier-kit
pointer-retirement-command-kit
pointer-retirement-result-kit
stale-pointer-sample-rejection-kit
hover-target-generation-kit
hover-label-projection-kit
parallax-target-generation-kit
parallax-neutralization-kit
scene-pointer-retirement-kit
first-neutral-pointer-frame-ack-kit
pointer-presence-browser-fixture-kit
source-artifact-pages-pointer-parity-fixture-kit
```

## Required proof

```txt
hover hotspot then leave canvas fixture
leave canvas while camera is offset fixture
pointercancel fixture
window blur fixture
document hidden/visible fixture
scene transition while hover label is visible fixture
stale predecessor pointer sample fixture
first neutral pointer frame acknowledgement fixture
source/build/Pages parity fixture
```

## Boundary

Documentation only. Runtime JavaScript, HTML, CSS, story content, interaction, rendering, persistence, package scripts, workflows and deployment are unchanged. No executable browser or deployed-origin pointer-presence fixture was run.