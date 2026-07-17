# START HERE: The Unmapped House runtime frame fault containment

**Last updated:** `2026-07-16T23-40-57-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed repository head:** `3f01f418cf6b1e2138ec71f92cd327e832a7cdbb`  
**Status:** `runtime-frame-fault-containment-backoff-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates runtime frame failure. `StageKit.animate()` requests its successor RAF before camera, material, offscreen-render and post-render phases. If one phase throws, another callback is already queued. The runtime has no typed frame result, bounded retry, backoff, retirement, safe fallback, explicit restart or recovered-frame acknowledgement.

## Plan ledger

**Goal:** make every frame attempt settle exactly once and prevent persistent failures from running at display-refresh cadence.

- [x] Compare all 11 Publish repositories and exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, active domains, all 24 implemented kits and services.
- [x] Trace RAF scheduling and camera, material, scene-render and post-render phases.
- [x] Define 20 runtime-frame-fault authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, content, rendering, persistence, tests and deployment unchanged.
- [ ] Implement and execute fault, backoff, retirement, restart and parity fixtures.

## Active gap

```txt
StageKit.animate
  -> request successor RAF
  -> update camera
  -> update material uniforms
  -> render offscreen scene
  -> render post pass

phase throws
  -> current callback exits
  -> successor callback remains scheduled
  -> no terminal fault settlement or bounded retry policy
```

No production crash loop was reproduced. This is a source-backed lifecycle and executable-proof gap.

## Required authority

`the-unmapped-house-runtime-frame-fault-containment-backoff-authority-domain`

```txt
FrameAttemptCommand
  -> bind runtime, scene, renderer, target and frame generations
  -> execute named phases
  -> publish FrameAttemptResult

FrameFaultSettlementCommand
  -> classify and deduplicate the fault
  -> apply bounded retry and backoff
  -> retire the runtime exactly once when exhausted
  -> publish FrameFaultSettlementResult

FrameRecoveryCommand
  -> replace or resume resources against expected generations
  -> publish FrameRecoveryResult
  -> publish FirstRecoveredFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T23-40-57-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T23-40-57-04-00-runtime-frame-fault-containment-dsk-map.md`
4. `runtime-fault-audit/2026-07-16T23-40-57-04-00-frame-retry-retirement-recovery-contract.md`
5. `render-audit/2026-07-16T23-40-57-04-00-repeating-frame-fault-visible-surface-gap.md`
6. `gameplay-audit/2026-07-16T23-40-57-04-00-frame-fault-story-mutation-divergence-loop.md`
7. `interaction-audit/2026-07-16T23-40-57-04-00-frame-fault-command-result-map.md`
8. `deploy-audit/2026-07-16T23-40-57-04-00-runtime-frame-fault-source-build-pages-fixture-gate.md`
9. `turn-ledger/2026-07-16T23-40-57-04-00.md`
10. `next-steps.md`
11. `known-gaps.md`
12. `validation.md`

## Retained audits

The `2026-07-16T16-58-39-04-00` scene-entry narrative audit and all earlier hotspot, story, save, audio, focus, lifecycle, rendering, accessibility and deployment findings remain retained in `kit-registry.json`.

## Next safe ledge

Introduce a frame-attempt boundary before changing scheduling semantics. First prove a persistent injected render failure produces bounded retries, one safe visible failure state and an idempotent restart.