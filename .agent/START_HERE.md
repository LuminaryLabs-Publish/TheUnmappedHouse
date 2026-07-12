# START HERE: The Unmapped House Render-Surface Resolution Authority

Last updated: `2026-07-12T13-08-15-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates render-surface allocation. `StageKit` first allocates the renderer and a multisampled offscreen target at the fixed `1920 x 1080` design size multiplied by device pixel ratio, then immediately resizes both to the live aspect frame. Later resize events repeat drawing-buffer and target reallocations without a pixel budget, WebGL capability admission, resize generation, rollback or visible-frame receipt.

## Plan ledger

**Goal:** make CSS layout, device pixel ratio, renderer drawing-buffer size and offscreen target allocation one bounded, revisioned transaction that can reject unsupported plans, roll back failed allocation and prove the first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible synchronized repository.
- [x] Identify the complete interaction and render loop.
- [x] Identify all active domains.
- [x] Preserve all 24 implemented kits and their offered services.
- [x] Trace constructor allocation, aspect-frame resize, DPR policy, multisampling, render-target use and visible submission.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime render-surface authority and executable browser fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-12T10-30-00-04-00 selected
AetherVale         2026-07-12T10-48-19-04-00
TheOpenAbove       2026-07-12T11-15-16-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheCavalryOfRome   excluded
```

## Active render loop

```txt
StageKit constructor
  -> create antialiased WebGLRenderer
  -> cap DPR at 2
  -> allocate renderer at 1920 x 1080 CSS units
  -> allocate samples:2 target at 1920 x 1080 x DPR
  -> call resize immediately

resize
  -> sample innerWidth, innerHeight and devicePixelRatio
  -> compute and apply fixed-aspect CSS frame
  -> resize renderer drawing buffer through setPixelRatio + setSize
  -> resize offscreen target to viewport x DPR
  -> publish no plan, revision, allocation result or rollback receipt

frame
  -> render stage into multisampled target
  -> render post-process pass to default framebuffer
  -> publish no surface/frame provenance
```

## Main finding

A DPR cap does not bound total work. A `3840 x 2160` aspect frame at DPR `2` requests a `7680 x 4320` drawing buffer and offscreen target, or `33,177,600` pixels each. The offscreen target also requests two samples, before accounting for depth, resolve storage, the default framebuffer or implementation overhead.

The constructor also allocates the fixed design surface before the first live resize. On a narrow mobile viewport, it can transiently allocate a `3840 x 2160` target and renderer buffer before shrinking to the actual aspect frame.

## Domains and kits

```txt
implemented kits: 24
planned render-surface authority kits: 22
```

The current domains cover browser hosting, story descriptors, persistence, progression, timers, modal and terminal projection, keyboard and pointer input, fixed-aspect layout, Three.js/WebGL rendering, DPR sampling, drawing-buffer and offscreen-target allocation, diagnostics, validation and Pages deployment.

## Required authority

```txt
the-unmapped-house-render-surface-resolution-authority-domain
```

It must own surface identity and revision, viewport observation, DPR policy, pixel and multisample budgets, WebGL capability admission, renderer and offscreen target plans, allocation readback, stale resize rejection, atomic commit, rollback, resource retirement, observations and first-visible-frame proof.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T13-08-15-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T13-08-15-04-00-render-surface-resolution-dsk-map.md`
5. `render-surface-audit/2026-07-12T13-08-15-04-00-pixel-budget-capability-commit-contract.md`
6. `render-audit/2026-07-12T13-08-15-04-00-startup-dpr-offscreen-allocation-gap.md`
7. `interaction-audit/2026-07-12T13-08-15-04-00-viewport-observation-surface-result-map.md`
8. `gameplay-audit/2026-07-12T13-08-15-04-00-resize-scene-visible-cost-loop.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Introduce a pure render-surface planner that receives CSS dimensions, DPR, WebGL limits and quality policy, chooses bounded physical dimensions and samples, prepares renderer and target allocations, verifies actual dimensions and framebuffer completeness, commits one surface revision or preserves the predecessor, then acknowledges the first visible frame.