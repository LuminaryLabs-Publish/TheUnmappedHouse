# START HERE: The Unmapped House render resolution and framebuffer budget

**Last updated:** `2026-07-17T22-39-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `187299734460752e3f91eaa4ce76efd781ca3dc2`  
**Status:** `render-resolution-framebuffer-budget-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates an unbounded physical-render-surface contract. The stage fits a 1920x1080 design viewport to the browser window, admits device pixel ratio up to `2`, sizes both the default drawing buffer and a two-sample offscreen target from that full viewport, and executes a scene pass plus post pass every RAF. No render scale, maximum pixel/sample budget, resize coalescing, allocation fallback or matching-frame resolution digest exists.

## Checklist

- [x] Compare all 11 Publish repositories and exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 24 implemented kits and their services.
- [x] Trace viewport, DPR, drawing-buffer, offscreen-target, sample and frame-pass ownership.
- [x] Define 19 render-resolution authority surfaces.
- [x] Add the timestamped tracker and audit family.
- [x] Keep runtime, rendering, story, persistence, tests and deployment unchanged.
- [ ] Implement bounded resolution admission and execute browser, resize, fallback, artifact and Pages fixtures.

## Active gap

```txt
browser window
  -> largest 16:9 CSS viewport
  -> DPR up to 2
  -> default drawing buffer at viewport x DPR
  -> offscreen target at viewport x DPR with samples=2
  -> full scene pass + post pass every RAF
  -> no explicit pixel/sample budget or quality result
```

At DPR `2`, the initial 1920x1080 target is 3840x2160, or 8,294,400 target pixels and 16,588,800 multisample positions. This is dimensional evidence, not a measured memory or performance claim.

## Required authority

`the-unmapped-house-render-resolution-framebuffer-budget-authority-domain`

```txt
RenderResolutionAdmissionCommand
  -> RenderResolutionAdmissionResult

RenderTargetResizeCommand
  -> RenderTargetResizeResult

RenderBudgetSettlementCommand
  -> RenderBudgetResult

RenderResolutionProjectionCommitCommand
  -> RenderResolutionDigest
  -> FirstResolutionBoundFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T22-39-01-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T22-39-01-04-00-render-resolution-framebuffer-budget-dsk-map.md`
4. `render-resolution-audit/2026-07-17T22-39-01-04-00-dpr-framebuffer-sample-budget-contract.md`
5. `render-audit/2026-07-17T22-39-01-04-00-unbounded-dpr-offscreen-target-frame-gap.md`
6. `gameplay-audit/2026-07-17T22-39-01-04-00-story-inspection-render-budget-loop.md`
7. `interaction-audit/2026-07-17T22-39-01-04-00-render-resolution-command-result-map.md`
8. `deploy-audit/2026-07-17T22-39-01-04-00-render-resolution-browser-fixture-gate.md`
9. `turn-ledger/2026-07-17T22-39-01-04-00.md`
10. `next-steps.md`
11. `known-gaps.md`
12. `validation.md`

## Retained audits

The `2026-07-17T10-16-33-04-00` custom-material lighting/shadow audit and all earlier pointer, runtime-fault, narrative, hotspot, story, save, audio, focus, lifecycle, rendering, progression and deployment findings remain retained in `kit-registry.json`.

## Next safe ledge

Add an explicit quality manifest and admission result before changing dimensions. Keep CSS layout and hotspot coordinate semantics stable while bounding physical drawing-buffer and target area.