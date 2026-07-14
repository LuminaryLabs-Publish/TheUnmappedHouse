# START HERE: The Unmapped House page lifecycle suspension and resume

**Last updated:** `2026-07-14T11-59-13-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `page-lifecycle-suspension-resume-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates browser page lifecycle. The stage owns an unbounded recursive RAF, elapsed shader time, raw completion timers and application-lifetime listeners, but no explicit hidden/freeze/pagehide/pageshow policy, restoration validation or first resumed-frame proof.

## Plan ledger

**Goal:** preserve accepted story truth while suspending disposable work and admitting exactly one coherent stage generation after restore.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace RAF, clock, timers, listeners, resources, viewport and story behavior across suspension.
- [x] Preserve all 24 implemented kits and services.
- [x] Define 22 lifecycle coordinating surfaces.
- [x] Add the timestamped tracker and audit family.
- [ ] Implement and execute lifecycle authority fixtures.

## Active loop

```txt
active page
  -> recursive RAF
  -> THREE.Clock elapsed shader time
  -> pointer, click and resize listeners
  -> hotspot settlement and localStorage writes
  -> raw delayed interlude timer

hidden, frozen or pagehide
  -> no lifecycle command
  -> no render lease retirement
  -> no clock or timer checkpoint

visible, resumed or pageshow
  -> prior participants continue implicitly
  -> no BFCache or context classification
  -> no resource and viewport revalidation
  -> no FirstResumedStageFrameAck
```

## Required authority

```txt
the-unmapped-house-page-lifecycle-suspension-resume-authority-domain
```

It coordinates document generation, lifecycle event admission, RAF ownership, clock policy, pending interlude timers, story checkpointing, interaction suspension, resource and viewport revalidation, restored participant adoption and `FirstResumedStageFrameAck`.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T11-59-13-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T11-59-13-04-00-page-lifecycle-suspension-resume-dsk-map.md`
5. `page-lifecycle-audit/2026-07-14T11-59-13-04-00-document-raf-clock-timer-contract.md`
6. `interaction-audit/2026-07-14T11-59-13-04-00-lifecycle-event-suspend-resume-result-map.md`
7. `gameplay-audit/2026-07-14T11-59-13-04-00-hidden-interlude-story-loop.md`
8. `render-audit/2026-07-14T11-59-13-04-00-hidden-resume-first-frame-gap.md`
9. `deploy-audit/2026-07-14T11-59-13-04-00-page-lifecycle-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-14T11-59-13-04-00-repo-ledger-page-lifecycle-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Terminal outcome settlement, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save commit/reset, ordinary interlude progression and stage resource lifecycle remain bounded retained authorities in `kit-registry.json`.

## Next safe ledge

Introduce a lifecycle controller that owns RAF and timer handles without changing story progression. First prove hidden/visible suspension and duplicate-RAF prevention, then add BFCache and resource-revalidation cases.