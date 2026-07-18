# Architecture audit: render-loop frame allocation and scratch DSK map

**Timestamp:** `2026-07-18T09-40-39-04-00`  
**Status:** `render-loop-frame-allocation-scratch-authority-audited`

## Current composition

```txt
static-page-shell-kit
  -> browser-story-runtime-kit
  -> StageKit
       -> stage-render-kit
       -> camera-parallax-kit
       -> anime-material-kit
       -> render-target-composition-kit
       -> hotspot-picking-kit
       -> recursive requestAnimationFrame
```

## Current frame ownership

```txt
StageKit.animate()
  -> creates callback closure for the next RAF
  -> reads elapsed time
  -> clones base camera position
  -> applies pointer offsets
  -> updates camera and material uniforms
  -> submits stage pass
  -> submits post pass
```

The stage generation owns persistent renderer, camera, target and material state. It does not own a retained frame callback identity, reusable camera scratch vector, source-owned allocation counters, an allocation budget result, or a presented-frame digest.

## Implemented DSK and service census

The repository retains 24 source-backed kit responsibilities:

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

Their services cover browser composition, story data and mutation, persistence, inspection and routing, Three.js scene construction, custom materials and post processing, hotspot picking, camera parallax, diagnostics, syntax checking, Pages deployment and audit governance.

## Missing parent domain

`the-unmapped-house-render-loop-frame-allocation-scratch-authority-domain`

## Proposed child surfaces

```txt
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

## Command/result boundary

```txt
RenderFrameWorkAdmissionCommand
  stageGeneration
  frameGeneration
  frameWorkManifestRevision
  callbackLeaseId
  scratchLeaseId
  -> RenderFrameWorkAdmissionResult

FrameScratchLeaseCommand
  -> allocate or recover reusable frame scratch
  -> FrameScratchLeaseResult

FrameAllocationObservationCommand
  -> record source-owned allocations separately from unknown provider work
  -> FrameAllocationObservationResult

RenderFrameWorkSettlementCommand
  -> accept, degrade, reject stale or flag over-budget work
  -> RenderFrameWorkSettlementResult

RenderFrameProjectionCommitCommand
  -> RenderFrameWorkDigest
  -> FirstFrameWorkBoundPresentationAck
```

## Smallest stable integration

The authority should remain inside the existing StageKit composition. The first implementation does not require a renderer replacement or story-domain restructuring: retain one RAF callback, retain one `THREE.Vector3` scratch value, replace `clone()` with `copy()`, and add generation-bound observations and browser proof.