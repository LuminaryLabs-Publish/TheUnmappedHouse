# START HERE: The Unmapped House interlude focus and route admission

**Last updated:** `2026-07-14T17-00-55-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `interlude-focus-route-admission-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine required hotspots, clue-led progression, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The active audit isolates interlude focus and route admission. The overlay is visually hidden with opacity and pointer-event suppression, but its Continue button remains keyboard-focusable and `nextScene()` does not require completion evidence. Keyboard activation can bypass required clues. When the overlay is open, background controls remain focusable and focus is neither transferred nor restored.

## Plan ledger

**Goal:** make modal presentation, focus ownership, command admission, route progression and first visible successor proof agree.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheUnmappedHouse` by the oldest synchronized timestamp.
- [x] Trace hidden Continue, background controls, route checks and focus behavior.
- [x] Preserve all 24 implemented kits and services.
- [x] Define 20 interlude focus/route authority surfaces.
- [x] Add the timestamped tracker and audit family.
- [ ] Implement and execute keyboard, focus, screen-reader and route-bypass fixtures.

## Active loop

```txt
page boots
  -> hidden interlude remains in keyboard focus order
  -> hotspot inspections grant clues and save state
  -> completion schedules the visual interlude

premature keyboard path
  -> Tab reaches invisible Continue
  -> Enter calls nextScene without completion validation
  -> successor route is saved

open interlude path
  -> focus remains on the background
  -> background hotspot commands remain keyboard-active
  -> no semantic modal, inertness or focus result exists
```

## Required authority

```txt
the-unmapped-house-interlude-focus-route-admission-authority-domain
```

It coordinates completion evidence, interlude generation, semantic modal state, background inertness, focus capture and transfer, route-command admission, successor-scene settlement, focus restoration and `FirstFocusStableSceneFrameAck`.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T17-00-55-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T17-00-55-04-00-interlude-focus-route-admission-dsk-map.md`
5. `accessibility-audit/2026-07-14T17-00-55-04-00-modal-focus-background-inert-contract.md`
6. `interaction-audit/2026-07-14T17-00-55-04-00-interlude-focus-command-result-map.md`
7. `gameplay-audit/2026-07-14T17-00-55-04-00-hidden-continue-route-bypass-loop.md`
8. `render-audit/2026-07-14T17-00-55-04-00-interlude-focus-visible-frame-gap.md`
9. `deploy-audit/2026-07-14T17-00-55-04-00-focus-route-browser-fixture-gate.md`
10. `central-sync-audit/2026-07-14T17-00-55-04-00-repo-ledger-interlude-focus-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Retained audits

Page lifecycle, terminal completion, WebGL recovery, save admission, viewport, scene transition, provider admission, hotspot picking, save/reset, ordinary interlude timing and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

First remove hidden Continue from command admission and add a completion guard in the route boundary. Then add semantic modal state, inert background controls, deterministic focus transfer/restoration and browser proof.