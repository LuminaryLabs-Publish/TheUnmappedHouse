# START HERE: The Unmapped House inspection control focus continuity

**Last updated:** `2026-07-15T08-28-25-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `inspection-control-focus-continuity-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine required hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, DOM inspection controls and a descriptor-driven Three.js stage.

The active audit isolates inspection-control focus continuity. Every accepted or repeated hotspot inspection calls `renderUi()`, which clears `#hotspot-list` and creates a new button for every hotspot. When a keyboard user activates a button, that focused node is removed during its own command and no stable control identity or focus restoration policy exists.

## Plan ledger

**Goal:** retain stable hotspot controls and settle focus with the accepted inspection revision while preserving authored story, clue, route and rendering behavior.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace DOM and canvas inspection, full list replacement, scene transition and focus ownership.
- [x] Identify the full interaction loop, domains, all 24 kits and services.
- [x] Define 20 inspection-control authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime, HTML, CSS, story, persistence and deployment unchanged.
- [ ] Implement keyed control projection and execute keyboard and Pages fixtures.

## Active loop

```txt
keyboard user focuses hotspot button
  -> Enter or Space dispatches click
  -> inspectHotspot accepts or repeats the inspection
  -> story text log clues and inspected state update
  -> renderUi clears the complete hotspot list
  -> the active button is removed
  -> replacement buttons receive new DOM identity
  -> no focus target or focus-stable frame is acknowledged
```

Canvas raycast inspection enters the same story mutation and list-reprojection path. Scene replacement also creates a new control generation without an explicit focus-transfer result.

## Required authority

```txt
the-unmapped-house-inspection-control-focus-continuity-authority-domain
```

```txt
InspectionControlProjectionCommand
  -> bind document scene inspection and control-list revisions
  -> resolve stable HotspotControlId values
  -> prepare keyed control updates without replacing unchanged nodes
  -> capture the active control and activation origin
  -> commit story and control projection together
  -> retain focus or transfer it to an authored fallback
  -> reject stale duplicate and superseded work
  -> publish InspectionControlProjectionResult
  -> publish FirstFocusStableInspectionFrameAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-15T08-28-25-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-15T08-28-25-04-00-inspection-control-focus-continuity-dsk-map.md`
5. `inspection-control-audit/2026-07-15T08-28-25-04-00-stable-control-identity-focus-contract.md`
6. `interaction-audit/2026-07-15T08-28-25-04-00-inspection-control-command-result-map.md`
7. `gameplay-audit/2026-07-15T08-28-25-04-00-keyboard-inspection-focus-reset-loop.md`
8. `render-audit/2026-07-15T08-28-25-04-00-hotspot-control-focus-frame-gap.md`
9. `deploy-audit/2026-07-15T08-28-25-04-00-keyboard-focus-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-15T08-28-25-04-00-oldest-selection-inspection-focus-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Motion preference, story announcements, interlude focus/route admission, page lifecycle, terminal completion, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save/reset, ordinary interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Replace destructive hotspot-list reconstruction with keyed updates based on `sceneId:hotspotId`, then prove that keyboard focus remains on the accepted control or moves to one explicit fallback.