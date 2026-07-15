# START HERE: The Unmapped House story announcement semantic projection

**Last updated:** `2026-07-14T22-01-31-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `story-announcement-semantic-projection-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine required hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates assistive-technology announcement ownership. The complete story panel is `aria-live="polite"` and contains the heading, narrative text, every hotspot button and the complete Notebook/debug JSON. `renderUi()` repeatedly rebuilds that subtree, but no dedicated semantic message, deduplication policy or screen-reader acknowledgement exists.

## Plan ledger

**Goal:** separate stable controls and diagnostics from one intentional, revisioned story-status surface.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace story, DOM, render and accessibility projection.
- [x] Preserve all 24 implemented kits and services.
- [x] Define 20 announcement-authority surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement and execute screen-reader and deployment-parity fixtures.

## Active loop

```txt
boot
  -> load browser state and resolve the current scene
  -> construct the Three.js stage and recursive RAF
  -> render title, narrative text, hotspot buttons and Notebook JSON
  -> expose the complete story panel as aria-live="polite"

inspection
  -> canvas raycast or DOM button calls inspectHotspot
  -> mutate inspected, clues and log
  -> call renderUi
  -> clear and rebuild every hotspot button
  -> replace the complete debug JSON projection
  -> keep all mutations inside the polite live region
  -> save browser state

completion and route
  -> schedule or open the interlude
  -> continue to the next scene
  -> rebuild title, controls and debug projection again
  -> no dedicated semantic announcement result or acknowledgement exists
```

## Required authority

```txt
the-unmapped-house-story-announcement-semantic-projection-authority-domain
```

```txt
StoryAnnouncementCommand
  -> bind StoryRevision, SceneRevision, command identity and message kind
  -> resolve one concise authored SemanticMessageDescriptor
  -> exclude interactive controls and debug JSON from live-region ownership
  -> validate priority, duplicate, stale and superseded announcements
  -> coalesce related inspection, clue and completion updates
  -> atomically publish one dedicated status-region projection
  -> publish StoryAnnouncementResult
  -> publish FirstSemanticAnnouncementAck

route and interlude transitions
  -> require accepted scene and interlude results
  -> publish one scene-arrival or terminal message
  -> preserve keyboard focus and control semantics independently
  -> expose deterministic screen-reader fixture evidence
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T22-01-31-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T22-01-31-04-00-story-announcement-semantic-projection-dsk-map.md`
5. `accessibility-audit/2026-07-14T22-01-31-04-00-live-region-control-debug-exclusion-contract.md`
6. `interaction-audit/2026-07-14T22-01-31-04-00-story-announcement-command-result-map.md`
7. `gameplay-audit/2026-07-14T22-01-31-04-00-inspection-live-region-mutation-loop.md`
8. `render-audit/2026-07-14T22-01-31-04-00-live-region-story-frame-coherence-gap.md`
9. `deploy-audit/2026-07-14T22-01-31-04-00-screen-reader-announcement-fixture-gate.md`
10. `central-sync-audit/2026-07-14T22-01-31-04-00-repo-ledger-story-announcement-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Interlude focus/route admission, page lifecycle, terminal completion, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save/reset, ordinary interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Remove `aria-live` from the complete interactive panel, add a dedicated semantic status element and bind concise messages to accepted story revisions before adding screen-reader proof.
