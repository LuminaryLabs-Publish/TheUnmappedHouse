# START HERE: The Unmapped House render-loop frame allocation and scratch ownership

**Last updated:** `2026-07-18T09-40-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `37ac9fef5a546e5e7a47a7c7748ba3423cc28c2c`  
**Status:** `render-loop-frame-allocation-scratch-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates two source-visible transient constructions in the permanent render loop. Every `animate()` invocation creates a new RAF arrow callback; after scene load, every frame also clones the base camera position into a new `THREE.Vector3`. At 60 accepted frames per second, this is a source-visible minimum of 120 transient objects per second before unobserved Three.js, WebGL or browser work.

## Checklist

- [x] Compare all 11 Publish repositories and exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 24 implemented kits and their services.
- [x] Trace RAF callback creation, camera scratch allocation, frame submissions and proof gaps.
- [x] Define 20 proposed render-loop allocation authority surfaces.
- [x] Add the timestamped tracker and audit family.
- [x] Keep runtime, rendering, story, persistence, tests and deployment unchanged.
- [ ] Implement retained callback/scratch state and execute browser, artifact and Pages fixtures.

## Active gap

```txt
animate()
  -> create new RAF arrow callback
  -> request next frame
  -> clone base camera position
  -> mutate clone for parallax
  -> render stage pass
  -> render post pass
  -> publish no allocation result or frame-work digest
```

At a hypothetical 60 accepted frames per second:

```txt
60 RAF callback closures / second
60 camera Vector3 clones / second
120 source-visible transient objects / second
7,200 source-visible transient objects / minute
```

This is source arithmetic, not a heap, GC or performance measurement.

## Required authority

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

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-18T09-40-39-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-18T09-40-39-04-00-render-loop-frame-allocation-scratch-dsk-map.md`
4. `frame-work-audit/2026-07-18T09-40-39-04-00-callback-scratch-allocation-contract.md`
5. `render-audit/2026-07-18T09-40-39-04-00-transient-frame-allocation-presentation-gap.md`
6. `gameplay-audit/2026-07-18T09-40-39-04-00-story-inspection-frame-work-loop.md`
7. `interaction-audit/2026-07-18T09-40-39-04-00-frame-work-command-result-map.md`
8. `deploy-audit/2026-07-18T09-40-39-04-00-frame-allocation-browser-fixture-gate.md`
9. `turn-ledger/2026-07-18T09-40-39-04-00.md`
10. `next-steps.md`
11. `known-gaps.md`
12. `validation.md`

## Retained audits

The `2026-07-17T22-39-01-04-00` render-resolution audit and all earlier lighting, pointer, runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, WebGL, progression and deployment findings remain retained in `kit-registry.json`.

## Next safe ledge

Retain one RAF callback and one camera scratch vector per StageKit generation, add source-owned allocation observations, and prove equivalent camera/parallax output before claiming performance improvement.