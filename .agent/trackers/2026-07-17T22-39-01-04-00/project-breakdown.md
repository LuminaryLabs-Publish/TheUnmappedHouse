# Project breakdown: The Unmapped House render resolution and framebuffer budget

**Timestamp:** `2026-07-17T22-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-resolution-framebuffer-budget-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. Every eligible repository has a central ledger, root `.agent` state and a `main` head matching the documented repo-local head. `TheUnmappedHouse` has the oldest synchronized central timestamp and is the only selected repository.

The focused finding is an unbounded render-resolution contract. The stage uses a 1920x1080 design surface, admits device pixel ratio up to `2`, sizes the renderer drawing buffer from the full aspect-fitted viewport, and independently sizes a multisampled offscreen render target from the same viewport and pixel ratio. Every animation frame renders the complete scene into that target and then renders the post-process pass to the default framebuffer.

No render scale, maximum buffer area, maximum target dimension, quality tier, resize coalescing, allocation-failure fallback or measured frame-cost gate exists. No performance incident is claimed. The source-backed gap is that viewport size and device pixel ratio can directly authorize a large two-pass workload without an admitted pixel/sample budget.

## Full organization comparison

| Repository | Documented head | Current `main` comparison | Selection state |
|---|---|---|---|
| `LuminaryLabs-Publish/AetherVale` | `e7dfe4ec37712eea025c9904ca2c0b6526f432ba` | identical | eligible |
| `LuminaryLabs-Publish/HorrorCorridor` | `0345cedf4359b4e4bc9463d34076eeb8f295f7e4` | identical | eligible |
| `LuminaryLabs-Publish/IntoTheMeadow` | `f48b52b04644ef4b7d08c214e9b421b45a9fd717` | identical | eligible |
| `LuminaryLabs-Publish/MyCozyIsland` | `776fbcc3a258bf3a6f9f038a63be689ee80aefe3` | identical | eligible |
| `LuminaryLabs-Publish/PhantomCommand` | `3ec991ec08f3ccf520ea983a5bbd971e8b45bb7c` | identical | next oldest |
| `LuminaryLabs-Publish/PrehistoricRush` | `791f273d96a136e15fc15c077913ca377a017b2a` | identical | eligible |
| `LuminaryLabs-Publish/TheLongHaul` | `1ed59786aa8f8f26f643c9f1e8c4d0a4205181f6` | identical | eligible |
| `LuminaryLabs-Publish/TheOpenAbove` | `3446d1c65796bdd57bc1aa1ad7dfc59674292b7e` | identical | eligible |
| `LuminaryLabs-Publish/TheUnmappedHouse` | `187299734460752e3f91eaa4ce76efd781ca3dc2` | identical | selected oldest |
| `LuminaryLabs-Publish/ZombieOrchard` | `3ecb66bbde317a22f3f0d051c014bbe4a9ddf3f5` | identical | eligible |
| `LuminaryLabs-Publish/TheCavalryOfRome` | not evaluated | excluded | prohibited |

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected prior central timestamp: 2026-07-17T10-16-33-04-00
next oldest central timestamp: PhantomCommand at 2026-07-17T11-39-49-04-00
```

## Complete interaction loop

```txt
boot
  -> parse the saved story aggregate
  -> resolve the authored current scene
  -> construct StageKit and the fixed-aspect stage
  -> construct WebGL renderer, scene, camera, lights and offscreen target
  -> admit device pixel ratio up to 2
  -> load scene geometry, materials and hotspot volumes
  -> project story UI and start recursive requestAnimationFrame

player interaction
  -> inspect a hotspot through canvas raycast or DOM button
  -> mark inspection and grant clues
  -> update Notebook and debug projection
  -> complete scene requirements
  -> show an interlude and advance to the next scene
  -> persist the story aggregate

render-resolution loop
  -> compute aspect-fitted CSS viewport from the full browser window
  -> set renderer pixel ratio
  -> size the default drawing buffer from viewport x device pixel ratio
  -> size the offscreen target from viewport x device pixel ratio
  -> keep offscreen target samples=2
  -> update camera parallax and shader time every RAF
  -> render the complete scene into the offscreen target
  -> render the post-process pass into the default framebuffer
  -> repeat without a pixel, sample or frame-cost admission result
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport and resize projection
authored story descriptors and narrative content
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, lights, shadows, shaders and raycasting
WebGL renderer, drawing buffer, multisampled offscreen target and post processing
render-resolution policy, DPR admission, buffer-area budget and visible-frame proof
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude and initial Loading copy |
| `aspect-frame-kit` | 1920x1080 design aspect, browser-window fit and DOM frame placement |
| `story-data-kit` | scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials and post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, Continue, reset, UI projection and persistence calls |
| `scene-route-kit` | scene ID resolution and authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant and clue query |
| `notebook-log-kit` | prepend narrative log and bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement and delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, shadows, pixel-ratio admission, offscreen target, callbacks and recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog and post configuration |
| `anime-material-kit` | procedural custom ShaderMaterial, fixed light direction, toon response and elapsed-time animation |
| `post-process-kit` | animated grain, vignette, chromatic shift, distortion and scan lines |
| `hotspot-volume-kit` | invisible raycast volumes and descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast and hotspot dispatch |
| `camera-parallax-kit` | pointer-driven fixed-camera offsets |
| `render-target-composition-kit` | multisampled offscreen stage pass, post pass and target resizing |
| `debug-json-projection-kit` | story-field serialization and Notebook projection |
| `package-syntax-check-kit` | Node syntax checks |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers and timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror and findings history |

```txt
implemented source-backed kits: 24
planned render-resolution authority surfaces: 19
```

## Source-backed finding

```txt
design width: 1920
design height: 1080
pixel ratio policy: min(devicePixelRatio, 2)
renderer antialias: enabled
offscreen target samples: 2
renderer size source: full aspect-fitted viewport
offscreen target size source: viewport x pixelRatio
full scene pass per RAF: present
post-process pass per RAF: present
render scale: absent
maximum framebuffer pixels: absent
maximum target dimensions: absent
resize coalescing: absent
allocation-failure fallback: absent
frame-cost admission: absent
RenderResolutionDigest: absent
FirstResolutionBoundFrameAck: absent
browser resolution fixtures: 0
```

At device pixel ratio `2`, the initial 1920x1080 target becomes 3840x2160, or 8,294,400 target pixels. With `samples: 2`, that target requests 16,588,800 multisample positions before accounting for the independently sized default drawing buffer. This is a dimensional observation, not a measured memory or performance claim.

## Required authority

`the-unmapped-house-render-resolution-framebuffer-budget-authority-domain`

```txt
RenderResolutionAdmissionCommand
  -> bind viewport, DPR, render scale, target samples and quality revision
  -> clamp or reject dimensions outside the accepted pixel/sample budget
  -> publish RenderResolutionAdmissionResult

RenderTargetResizeCommand
  -> coalesce resize evidence
  -> allocate the accepted drawing-buffer and target dimensions
  -> fall back deterministically when allocation fails
  -> publish RenderTargetResizeResult

RenderBudgetSettlementCommand
  -> observe accepted pixel area, sample area and frame cost
  -> degrade or recover through explicit quality steps
  -> publish RenderBudgetResult

RenderResolutionProjectionCommitCommand
  -> bind accepted dimensions to the presented frame
  -> publish RenderResolutionDigest
  -> publish FirstResolutionBoundFrameAck
```

## Planned authority surfaces

```txt
the-unmapped-house-render-resolution-framebuffer-budget-authority-domain
render-quality-manifest-kit
viewport-sample-kit
device-pixel-ratio-admission-kit
render-scale-policy-kit
framebuffer-pixel-budget-kit
offscreen-target-sample-budget-kit
render-target-resize-command-kit
render-target-resize-result-kit
resize-coalescing-kit
allocation-failure-fallback-kit
quality-degradation-result-kit
frame-cost-observation-kit
buffer-area-digest-kit
render-resolution-projection-commit-kit
first-resolution-bound-frame-ack-kit
browser-resolution-fixture-kit
resize-stress-fixture-kit
source-artifact-pages-resolution-parity-fixture-kit
```

## Required proof

```txt
1920x1080 at DPR 1 fixture
1920x1080 at DPR 2 fixture
large-window capped-area fixture
small-window minimum-dimension fixture
rapid-resize coalescing fixture
allocation-failure fallback fixture
quality degrade and recovery fixture
frame-cost observation fixture
render-resolution digest fixture
first resolution-bound frame acknowledgement fixture
source/build/Pages resolution parity fixture
```

## Boundary

Documentation only. Runtime JavaScript, HTML, CSS, story content, interaction, rendering, target allocation, shaders, persistence, package scripts, workflows and deployment are unchanged. No executable browser, resize-stress, allocation, performance, artifact or deployed-origin fixture was run.