# Project breakdown: The Unmapped House render-loop frame allocation and scratch ownership

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-loop-frame-allocation-scratch-authority-audited`

## Summary

The current `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger coverage, root `.agent` state, and `main` heads matching their documented repo-local heads. `TheUnmappedHouse` has the oldest synchronized central timestamp and is the only selected repository.

The focused finding is recurring source-visible allocation inside the permanent render loop. Every `animate()` invocation constructs a new RAF arrow callback. Once a scene is loaded, the same invocation also clones the base camera position into a new `THREE.Vector3`. At 60 accepted frames per second, this is a source-visible minimum of 120 transient objects per second, or 7,200 per minute, before any allocation inside Three.js, WebGL, shader updates, raycasting, the browser, or developer tooling.

This is source arithmetic, not a heap profile, garbage-collection trace, performance regression, or production incident claim. The missing contract is explicit frame scratch ownership, callback identity, allocation observation, budget settlement, and proof that the accepted frame-work generation reaches the matching presented frame.

## Full organization comparison

| Repository | Documented head | Current `main` | Selection state |
|---|---|---|---|
| `LuminaryLabs-Publish/AetherVale` | `f5663def0e019ec710e869a416286a80895eb792` | identical | eligible |
| `LuminaryLabs-Publish/HorrorCorridor` | `036d96ab9e470fedf15209d325bcc2d131cbf000` | identical | eligible |
| `LuminaryLabs-Publish/IntoTheMeadow` | `2e6745509c9e7771fc7448402da170c2b541c21b` | identical | eligible |
| `LuminaryLabs-Publish/MyCozyIsland` | `75bc72594ff0eb3b225663bbbd3a63c6e58e5b45` | identical | eligible |
| `LuminaryLabs-Publish/PhantomCommand` | `b1293276a98e9279f3bf02f88d6a4b0d1ce87824` | identical | next oldest |
| `LuminaryLabs-Publish/PrehistoricRush` | `8ebddd3d89e02227898fbcd7ce75d7fb56efeaa4` | identical | eligible |
| `LuminaryLabs-Publish/TheLongHaul` | `2c21dbcd06f823633b2bad3d9977ab1ebe6bcbdd` | identical | eligible |
| `LuminaryLabs-Publish/TheOpenAbove` | `28bed180bac93a326dfa1a31ab54699387698086` | identical | eligible |
| `LuminaryLabs-Publish/TheUnmappedHouse` | `37ac9fef5a546e5e7a47a7c7748ba3423cc28c2c` | identical | selected oldest |
| `LuminaryLabs-Publish/ZombieOrchard` | `8e7212f0ec9961c3289b6a58316cde7a9e7df417` | identical | eligible |
| `LuminaryLabs-Publish/TheCavalryOfRome` | not evaluated | excluded | prohibited |

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
new or otherwise undocumented: 0
runtime-ahead: 0
selected prior timestamp: 2026-07-17T22-39-01-04-00
next oldest timestamp: PhantomCommand at 2026-07-17T23-41-44-04-00
```

## Complete interaction loop

```txt
boot
  -> parse saved story state
  -> resolve current authored scene
  -> construct StageKit, renderer, scene, camera, lights and target
  -> load geometry, materials and hotspot volumes
  -> project story controls and Notebook state
  -> start recursive requestAnimationFrame

player loop
  -> inspect through canvas raycast or DOM button
  -> record inspection and grant clues
  -> update story copy, Notebook and persistence
  -> settle scene completion
  -> show interlude
  -> Continue to the next scene or terminal state

render loop
  -> animate() creates a new RAF callback closure
  -> request the next frame
  -> read elapsed time
  -> clone base camera position into a new Vector3
  -> apply pointer parallax to the clone
  -> copy the clone into the camera
  -> update material and post-process time
  -> render stage to the offscreen target
  -> render post process to the default framebuffer
  -> repeat without scratch reuse, allocation counters or a frame-work digest
```

## Domains in use

```txt
static browser shell and document lifecycle
fixed-aspect viewport and resize projection
authored story descriptors and narrative content
story state, scenes, clues, inspections, route, interlude, terminal and save
DOM, keyboard, pointer, canvas, hover, focus and semantic projection
Three.js scene, camera, geometry, materials, lights, shadows, shaders and raycasting
WebGL renderer, drawing buffer, multisampled target and post processing
RAF scheduling, frame timing, camera parallax and transient frame scratch
syntax validation, static artifact, Pages deployment and audit governance
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `static-page-shell-kit` | stage mount, story panel, hotspot list, Notebook, hover label, interlude, initial Loading copy |
| `aspect-frame-kit` | 1920x1080 design aspect, browser-window fit, DOM frame placement |
| `story-data-kit` | scene descriptors, opening copy, hotspots, clue grants, completion rules, camera, materials, post descriptors |
| `browser-story-runtime-kit` | state boot, scene resolution, inspection, Continue, reset, UI projection, persistence calls |
| `scene-route-kit` | scene ID resolution, authored-order advancement |
| `inspection-ledger-kit` | scene-keyed inspected hotspot state |
| `clue-ledger-kit` | clue grant, clue query |
| `notebook-log-kit` | prepend narrative log, bounded retention |
| `interlude-timer-kit` | delayed completion interlude |
| `terminal-route-kit` | prototype-complete DOM projection |
| `localstorage-save-kit` | parse, shallow merge, whole-slot replacement, delete save |
| `stage-render-kit` | WebGL renderer, scene, camera, lights, shadows, DPR admission, offscreen target, callbacks, recursive RAF |
| `scene-descriptor-consumer-kit` | camera, geometry, material, hotspot, fog, post configuration |
| `anime-material-kit` | procedural ShaderMaterial, fixed light direction, toon response, elapsed-time animation |
| `post-process-kit` | grain, vignette, chromatic shift, distortion, scan lines |
| `hotspot-volume-kit` | invisible raycast volumes, descriptor attachment |
| `hotspot-picking-kit` | coordinate normalization, raycast, hotspot dispatch |
| `camera-parallax-kit` | pointer-driven camera offsets and per-frame camera-position clone |
| `render-target-composition-kit` | multisampled stage pass, post pass, target resizing |
| `debug-json-projection-kit` | story-field serialization, Notebook projection |
| `package-syntax-check-kit` | Node syntax checks |
| `static-pages-deploy-kit` | static Pages delivery |
| `repo-local-agent-ledger-kit` | root pointers, timestamped audit records |
| `central-ledger-sync-kit` | central selection mirror, findings history |

```txt
implemented source-backed kits: 24
proposed render-loop allocation authority surfaces: 20
```

## Source-backed finding

```txt
recursive RAF callback expression: requestAnimationFrame(() => this.animate())
new callback closure per animate invocation: source-visible
camera scratch expression: this.baseCamera.position.clone()
new THREE.Vector3 per loaded-scene frame: source-visible
reused camera scratch vector: absent
stable retained RAF callback identity: absent
frame allocation counter: absent
allocation budget result: absent
GC or heap observation: absent
RenderFrameWorkDigest: absent
FirstFrameWorkBoundPresentationAck: absent
```

Conditional arithmetic at 60 accepted frames per second:

```txt
RAF callback closures: 60 / second
camera Vector3 clones: 60 / second
source-visible minimum: 120 transient objects / second
source-visible minimum: 7,200 transient objects / minute
```

## Proposed authority

**Proposed only; no runtime implementation was added:**

`the-unmapped-house-render-loop-frame-allocation-scratch-authority-domain`

```txt
RenderFrameWorkAdmissionCommand
  -> RenderFrameWorkAdmissionResult

FrameScratchLeaseCommand
  -> FrameScratchLeaseResult

FrameAllocationObservationCommand
  -> FrameAllocationObservationResult

RenderFrameWorkSettlementCommand
  -> RenderFrameWorkSettlementResult

RenderFrameProjectionCommitCommand
  -> RenderFrameWorkDigest
  -> FirstFrameWorkBoundPresentationAck
```

## Proposed surfaces

```txt
the-unmapped-house-render-loop-frame-allocation-scratch-authority-domain
render-frame-work-manifest-kit
raf-callback-lease-kit
frame-scratch-vector-kit
frame-scratch-lease-kit
frame-allocation-observation-kit
frame-allocation-budget-kit
frame-work-admission-command-kit
frame-work-admission-result-kit
frame-work-settlement-kit
frame-work-settlement-result-kit
stale-frame-work-rejection-kit
frame-work-digest-kit
render-frame-projection-commit-kit
first-frame-work-bound-presentation-ack-kit
steady-state-allocation-fixture-kit
camera-parallax-scratch-fixture-kit
hidden-page-frame-work-fixture-kit
source-artifact-pages-frame-work-parity-kit
browser-heap-observation-fixture-kit
```

## Smallest safe implementation

1. Retain one RAF callback identity instead of creating the callback inside every frame.
2. Allocate one camera-position scratch vector with the StageKit generation.
3. Replace `clone()` with `scratch.copy(basePosition)` before applying parallax.
4. Add counters that distinguish source-owned frame allocations from provider/browser allocations.
5. Bind observations and any budget result to the frame and stage generation.
6. Prove steady-state behavior in an executable browser fixture before making a performance claim.

## Boundary

Documentation only. Runtime JavaScript, HTML, CSS, story content, interaction, rendering, persistence, package scripts, tests, workflows and deployment are unchanged. No heap profile, garbage-collection trace, browser performance measurement, artifact smoke or Pages smoke was run.