# Architecture audit: inspection control focus continuity DSK map

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Status:** `inspection-control-focus-continuity-authority-audited`

## Summary

The story runtime owns accepted inspection state, while `renderUi()` owns a destructive DOM reprojection. Focus is browser-owned and is not represented in either state, so an accepted keyboard command can remove its own active control.

## Plan ledger

**Goal:** introduce one semantic authority between inspection settlement and DOM projection without restructuring the story or renderer domains.

- [x] Map existing runtime and presentation owners.
- [x] Preserve all 24 implemented kits.
- [x] Separate story mutation from control projection.
- [x] Define stable control, list, focus and result identities.
- [x] Define scene replacement and interlude handoff boundaries.
- [ ] Implement and prove the authority.

## Current ownership

```txt
browser-story-runtime-kit
  owns inspectHotspot and renderUi sequencing

inspection-ledger-kit
  owns scene-keyed inspected state

clue-ledger-kit
  owns clue grants and queries

scene-route-kit
  owns scene advancement

static-page-shell-kit
  owns #hotspot-list container

hotspot-picking-kit
  dispatches canvas-selected hotspots into inspectHotspot

browser focus
  implicit and untracked
```

## Missing authority surfaces

```txt
1  the-unmapped-house-inspection-control-focus-continuity-authority-domain
2  inspection-control-projection-command-envelope-kit
3  hotspot-control-id-kit
4  hotspot-control-list-revision-kit
5  focus-anchor-id-kit
6  focus-revision-kit
7  inspection-activation-origin-kit
8  keyed-hotspot-control-projection-kit
9  hotspot-control-state-descriptor-kit
10 active-control-capture-kit
11 accepted-control-focus-restore-kit
12 removed-control-fallback-policy-kit
13 scene-heading-focus-transfer-kit
14 interlude-focus-handoff-adapter-kit
15 stale-control-projection-rejection-kit
16 duplicate-control-projection-rejection-kit
17 inspection-control-projection-result-kit
18 first-focus-stable-inspection-frame-ack-kit
19 keyboard-focus-browser-fixture-kit
20 artifact-pages-focus-parity-kit
```

## Command boundary

```txt
InspectionControlProjectionCommand
  commandId
  documentGeneration
  sceneRevision
  inspectionRevision
  expectedControlListRevision
  activationOrigin
  activeHotspotControlId
  changedHotspotIds

prepare
  -> resolve stable controls from scene hotspot IDs
  -> retain unchanged DOM nodes
  -> update labels and inspected state in place
  -> choose accepted focus target

commit
  -> publish one control-list revision
  -> restore or transfer focus
  -> publish typed result and first stable frame acknowledgement
```

## Domain boundary

This authority does not absorb story progression, interlude modal focus, live-region messaging, hotspot raycasting, persistence or WebGL rendering. It coordinates the accepted inspection revision with the semantic DOM control projection only.