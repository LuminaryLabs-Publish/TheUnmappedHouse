# START HERE: The Unmapped House render-surface viewport authority

**Last updated:** `2026-07-13T14-58-07-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-surface-viewport-authority-audited`  
**Retained statuses:** `scene-transition-composition-authority-central-reconciled`, `render-provider-admission-authority-central-reconciled`, `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current audit isolates render-surface viewport ownership. The page has two aspect-frame authorities, CSS and imperative JavaScript, while `StageKit.resize()` samples `innerWidth`, `innerHeight`, and DPR and then mutates the DOM frame, WebGL drawing buffer, offscreen target, and camera sequentially without a shared revision or terminal result.

## Plan ledger

**Goal:** make the 16:9 frame, renderer drawing buffer, offscreen target, camera projection and pointer transform adopt one validated viewport revision.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked and root-documented.
- [x] Find no new, missing or locally-ahead eligible repository.
- [x] Select only `TheUnmappedHouse` by the oldest central timestamp.
- [x] Trace CSS framing, JavaScript framing, DPR, WebGL allocation, render-target allocation, camera projection, picking and RAF.
- [x] Preserve all 24 implemented kits and their services.
- [x] Define the viewport authority and proof gates.
- [x] Create a new timestamped tracker and audit family.
- [ ] Implement and execute the authority.

## Selection

```txt
TheUnmappedHouse   2026-07-13T09-03-20-04-00 selected
AetherVale         2026-07-13T10-05-15-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
PhantomCommand     2026-07-13T11-41-10-04-00
HorrorCorridor     2026-07-13T11-58-45-04-00
ZombieOrchard      2026-07-13T13-01-03-04-00
TheOpenAbove       2026-07-13T13-39-10-04-00
PrehistoricRush    2026-07-13T13-58-35-04-00
MyCozyIsland       2026-07-13T14-39-40-04-00
TheCavalryOfRome  excluded
```

## Active viewport loop

```txt
window resize
  -> sample innerWidth, innerHeight and devicePixelRatio
  -> calculate a 16:9 frame
  -> overwrite #aspect-frame styles
  -> resize renderer drawing buffer
  -> resize offscreen render target
  -> update camera projection
  -> later RAF renders
  -> no shared viewport revision or terminal result
```

## Required authority

```txt
the-unmapped-house-render-surface-viewport-authority-domain
```

It must coordinate host measurement, aspect fitting, DPR and pixel budgeting, DOM frame placement, renderer and target allocation, camera projection, pointer transforms and visible-frame proof without absorbing their bounded implementations.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T14-58-07-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T14-58-07-04-00-aspect-frame-viewport-authority-dsk-map.md`
5. `viewport-audit/2026-07-13T14-58-07-04-00-aspect-frame-render-target-atomicity-contract.md`
6. `interaction-audit/2026-07-13T14-58-07-04-00-viewport-change-participant-result-map.md`
7. `gameplay-audit/2026-07-13T14-58-07-04-00-resize-picking-presentation-loop.md`
8. `render-audit/2026-07-13T14-58-07-04-00-render-surface-viewport-visible-frame-gap.md`
9. `deploy-audit/2026-07-13T14-58-07-04-00-viewport-fixture-gate.md`
10. `central-sync-audit/2026-07-13T14-58-07-04-00-repo-ledger-viewport-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Next safe ledge

Add a host-measurement function that returns a typed zero-size result and a pure `prepareViewportChange()` function that calculates the frame, DPR and allocation budget without mutating live DOM or GPU participants.
