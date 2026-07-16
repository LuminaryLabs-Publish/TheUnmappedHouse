# START HERE: The Unmapped House hotspot availability and discovery projection

**Last updated:** `2026-07-16T09-58-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Reviewed pre-audit documentation head:** `a90e7e4fa7da0ecfe0863236608d0a397a9dad7d`  
**Status:** `hotspot-availability-discovery-projection-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine authored hotspots, clue-led completion, localStorage persistence, DOM inspection controls, and a descriptor-driven Three.js stage.

The active audit isolates hotspot availability. Every authored hotspot is immediately listed as an enabled DOM button and installed as an invisible canvas-pick volume. The raycaster tests hotspot volumes without scene-geometry occlusion, and scene transitions do not explicitly retire the previous hover label. No shared result binds listed, visible, hoverable, pickable, discovered, enabled, modal-available, and current-generation state.

## Plan ledger

**Goal:** make all hotspot projections consume one revision-bound availability result before interaction or visible-frame acknowledgement.

- [x] Compare the complete current Publish inventory against central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible repositories have synchronized central ledgers and root `.agent` state.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits, and their services.
- [x] Trace authored hotspot creation, list projection, hover, picking, inspection, modal state, and scene transition.
- [x] Define one parent authority with 17 coordinating surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, content, rendering, persistence, package scripts, and deployment unchanged.
- [ ] Implement and execute hotspot parity fixtures.

## Active gap

```txt
currentScene.hotspots
  -> every record becomes an enabled DOM button
  -> every record becomes an invisible raycast volume
  -> raycaster intersects only hotspot volumes
  -> no shared availability result
  -> no explicit visible/occluded/discovered/modal policy
  -> no listed/pickable/visible parity result
  -> prior hover evidence is not explicitly retired on scene change
```

The current nine hotspots are simple and no player-facing defect was reproduced. This is an authority and future-content scalability gap.

## Required authority

`the-unmapped-house-hotspot-availability-discovery-projection-authority-domain`

```txt
HotspotAvailabilityCommand
  -> bind content, scene, story, clue, inspection, modal, camera and frame revisions
  -> resolve discovery, visibility, occlusion, enablement and interaction mode
  -> publish HotspotAvailabilityResult

HotspotProjectionCommand
  -> project one accepted set to DOM list, hover and canvas picking
  -> retire stale hover/focus evidence
  -> publish HotspotParityResult

HotspotInteractionCommand
  -> reject unavailable, occluded, modal-suspended or stale work
  -> publish HotspotInteractionResult
  -> publish FirstAvailableHotspotFrameAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-16T09-58-49-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-16T09-58-49-04-00-hotspot-availability-discovery-dsk-map.md`
5. `hotspot-availability-audit/2026-07-16T09-58-49-04-00-listing-picking-occlusion-contract.md`
6. `interaction-audit/2026-07-16T09-58-49-04-00-hotspot-availability-command-result-map.md`
7. `gameplay-audit/2026-07-16T09-58-49-04-00-hotspot-discovery-bypass-loop.md`
8. `render-audit/2026-07-16T09-58-49-04-00-listed-pickable-visible-hotspot-parity-gap.md`
9. `deploy-audit/2026-07-16T09-58-49-04-00-hotspot-parity-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-16T09-58-49-04-00-oldest-selection-hotspot-availability-reconciliation.md`
11. `turn-ledger/2026-07-16T09-58-49-04-00.md`
12. `next-steps.md`
13. `validation.md`

## Retained audits

Story-content validation, startup readiness, save concurrency/schema, audio, focus, motion preference, announcements, interlude progression, page lifecycle, terminal settlement, WebGL recovery, viewport, scene composition, provider admission, raw hotspot picking, save/reset convergence, and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Introduce a pure availability resolver after accepted story-content adoption, then derive both DOM and canvas candidate sets from its immutable result.