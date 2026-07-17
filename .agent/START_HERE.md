# START HERE: The Unmapped House pointer presence retirement

**Last updated:** `2026-07-17T05-03-18-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `089ca19e7f6f9fe26dd89b1389eee97f3ff99cdb`  
**Status:** `pointer-presence-hover-parallax-retirement-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates pointer-state retirement. Canvas `mousemove` updates the raycast pointer, cached hovered hotspot, hover-label DOM and camera-parallax target. No leave, cancel, blur, visibility or scene-replacement path clears that evidence, so stale hover text and camera offset can survive after the pointer or scene context is no longer valid.

## Checklist

- [x] Compare all 11 Publish repositories and exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all domains, 24 implemented kits and their services.
- [x] Trace hover-label and parallax state through pointer exit and scene replacement.
- [x] Define 18 pointer-presence authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, content, rendering, persistence, tests and deployment unchanged.
- [ ] Implement retirement and execute browser, artifact and Pages fixtures.

## Active gap

```txt
mousemove inside canvas
  -> cache pointer, hovered hotspot and parallax
  -> show hover label

pointer leaves / cancels / focus is lost / document hides / scene changes
  -> no retirement path
  -> stale hover and parallax remain eligible
```

No production incident was reproduced. This is a source-backed interaction-state and visible-frame convergence gap.

## Required authority

`the-unmapped-house-pointer-presence-hover-parallax-retirement-authority-domain`

```txt
PointerSampleAdmissionCommand
  -> PointerSampleAdmissionResult

PointerPresenceRetirementCommand
  -> clear hover and neutralize parallax exactly once
  -> PointerPresenceRetirementResult

PointerProjectionCommitCommand
  -> PointerProjectionCommitResult
  -> FirstNeutralPointerFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T05-03-18-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T05-03-18-04-00-pointer-presence-retirement-dsk-map.md`
4. `pointer-presence-audit/2026-07-17T05-03-18-04-00-hover-parallax-retirement-contract.md`
5. `render-audit/2026-07-17T05-03-18-04-00-stale-hover-parallax-visible-frame-gap.md`
6. `gameplay-audit/2026-07-17T05-03-18-04-00-pointer-exit-scene-transition-loop.md`
7. `interaction-audit/2026-07-17T05-03-18-04-00-pointer-presence-command-result-map.md`
8. `deploy-audit/2026-07-17T05-03-18-04-00-pointer-presence-browser-fixture-gate.md`
9. `turn-ledger/2026-07-17T05-03-18-04-00.md`
10. `next-steps.md`
11. `known-gaps.md`
12. `validation.md`

## Retained audits

The `2026-07-16T23-40-57-04-00` runtime frame-fault audit, `2026-07-16T16-58-39-04-00` scene-entry narrative audit and all earlier hotspot, story, save, audio, focus, lifecycle, rendering, accessibility and deployment findings remain retained in `kit-registry.json`.

## Next safe ledge

Add one idempotent pointer-retirement path before changing picking or camera behavior. First prove a visible hover label and non-zero parallax return to a neutral frame after canvas leave and scene replacement.