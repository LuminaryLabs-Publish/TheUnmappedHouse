# START HERE: The Unmapped House scene-entry narrative projection

**Last updated:** `2026-07-16T16-58-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed repository head:** `34ac6209e2e434ce68e809f9b3a656b43e638ba1`  
**Status:** `scene-entry-narrative-projection-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates scene-entry narrative projection. Inspection writes hotspot copy into the main story paragraph. On Continue, the successor scene, stage, title, hotspot list, route and save are adopted, but `renderUi()` only assigns successor `openingText` when the paragraph is empty or exactly `Loading`. Ordinary uninterrupted progression can therefore present the next room with the previous room's final hotspot text.

## Plan ledger

**Goal:** make scene entry publish one explicit narrative result bound to the same scene generation as the stage, title, hotspot list, Notebook and save.

- [x] Compare the complete current Publish inventory against central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible repositories have synchronized central ledgers and root `.agent` state.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits and their services.
- [x] Trace inspection copy, completion, interlude, Continue, stage adoption, UI projection and persistence.
- [x] Define one parent authority with 17 coordinating surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, content, rendering, persistence, package scripts and deployment unchanged.
- [ ] Implement and execute scene-entry narrative fixtures.

## Active gap

```txt
final inspection in scene N
  -> scene-text = scene N hotspot text
  -> completion interlude
  -> Continue adopts scene N+1
  -> stage, title and hotspots become scene N+1
  -> renderUi preserves non-empty scene-text
  -> first scene N+1 frame still shows scene N hotspot text
```

This is a deterministic source-backed visible-coherence defect. No browser fixture was executed in this documentation-only pass.

## Required authority

`the-unmapped-house-scene-entry-narrative-projection-authority-domain`

```txt
SceneEntryCommand
  -> bind content, route, story, stage, UI and save revisions
  -> resolve boot, transition, resume or re-entry policy
  -> select the accepted opening narrative source
  -> publish SceneEntryNarrativeResult

SceneEntryProjectionCommand
  -> project title, opening copy, stage and hotspot list as one scene generation
  -> reject stale predecessor narrative revisions
  -> publish SceneEntryProjectionResult
  -> publish FirstSceneEntryFrameAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-16T16-58-39-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-16T16-58-39-04-00-scene-entry-narrative-projection-dsk-map.md`
5. `narrative-projection-audit/2026-07-16T16-58-39-04-00-opening-copy-scene-revision-contract.md`
6. `interaction-audit/2026-07-16T16-58-39-04-00-scene-entry-command-result-map.md`
7. `gameplay-audit/2026-07-16T16-58-39-04-00-scene-entry-copy-carryover-loop.md`
8. `render-audit/2026-07-16T16-58-39-04-00-stale-previous-scene-copy-visible-frame-gap.md`
9. `deploy-audit/2026-07-16T16-58-39-04-00-scene-entry-copy-source-build-pages-fixture-gate.md`
10. `central-sync-audit/2026-07-16T16-58-39-04-00-oldest-selection-scene-entry-narrative-reconciliation.md`
11. `turn-ledger/2026-07-16T16-58-39-04-00.md`
12. `next-steps.md`
13. `validation.md`

## Retained audits

Hotspot availability, story-content validation, startup readiness, save concurrency/schema, audio, focus, motion preference, announcements, interlude progression, page lifecycle, terminal settlement, WebGL recovery, viewport, scene-transition atomicity, provider admission, raw hotspot picking, save/reset convergence and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Make scene entry assign narrative copy from an explicit entry policy, not from the current DOM string. Then bind the resulting story-text revision to the accepted scene, stage and first visible frame.