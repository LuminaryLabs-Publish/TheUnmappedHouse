# START HERE: The Unmapped House browser startup readiness authority

**Last updated:** `2026-07-15T23-00-03-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `browser-startup-readiness-failure-authority-audited`

## Summary

TheUnmappedHouse is a fixed-camera anime-horror point-and-click prototype with three scenes, nine hotspots, clue-led progression, localStorage persistence, semantic DOM controls, and a descriptor-driven Three.js stage.

The active audit isolates browser startup. The static shell begins at `Loading`, while `game.js`, local modules, and Three.js from unpkg must resolve before StageKit can construct WebGL resources, restore story state, prepare the first scene, project the UI, and present the first frame. No startup attempt, deadline, failure taxonomy, fallback, retry, or first-frame acknowledgement exists.

## Plan ledger

**Goal:** make startup a bounded transaction that visibly reaches one coherent first story frame or a semantic recoverable failure.

- [x] Compare the complete current Publish inventory and central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Identify the interaction loop, domains, all 24 kits, and their services.
- [x] Trace module graph, provider, WebGL, stage, story, UI, RAF, and deployment readiness.
- [x] Define 20 startup authority surfaces.
- [x] Add the timestamped audit family.
- [x] Keep runtime and deployment unchanged.
- [ ] Implement and execute startup success, failure, retry, artifact, and Pages fixtures.

## Active gap

```txt
Loading shell
  -> static module graph
  -> external Three.js provider
  -> WebGL and StageKit construction
  -> story and first-scene preparation
  -> UI projection and recursive RAF

failure at any phase
  -> no typed StartupResult
  -> no fallback replaces Loading
  -> no retry command
  -> no FirstPresentedStoryFrameAck
```

## Required authority

`the-unmapped-house-browser-startup-readiness-failure-authority-domain`

```txt
StartupAttemptCommand
  -> bind document module provider capability story stage and render generations
  -> publish monotonic startup phases
  -> enforce deadline and stale-attempt rejection
  -> prepare story scene and renderer candidates
  -> publish typed readiness or failure result
  -> project fallback and Retry when recoverable
  -> retire failed or superseded resources
  -> publish FirstReadyUiAck
  -> publish FirstPresentedStoryFrameAck
```

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-15T23-00-03-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-15T23-00-03-04-00-browser-startup-readiness-failure-dsk-map.md`
5. `startup-audit/2026-07-15T23-00-03-04-00-module-provider-webgl-readiness-contract.md`
6. `interaction-audit/2026-07-15T23-00-03-04-00-startup-command-result-map.md`
7. `gameplay-audit/2026-07-15T23-00-03-04-00-startup-failure-no-interaction-loop.md`
8. `render-audit/2026-07-15T23-00-03-04-00-loading-shell-first-frame-gap.md`
9. `deploy-audit/2026-07-15T23-00-03-04-00-startup-failure-artifact-pages-fixture-gate.md`
10. `central-sync-audit/2026-07-15T23-00-03-04-00-oldest-selection-startup-readiness-reconciliation.md`
11. `turn-ledger/2026-07-15T23-00-03-04-00.md`
12. `next-steps.md`
13. `validation.md`

## Retained audits

Story save concurrency, story audio, inspection focus, motion preference, story announcements, interlude focus/route, page lifecycle, terminal settlement, WebGL recovery, save schema, viewport, scene-transition composition, render-provider admission, hotspot picking, same-document save/reset convergence, interlude progression, and stage-resource lifecycle remain retained in `kit-registry.json`.

## Next safe ledge

Implement the shell-owned dynamic bootstrap and typed startup results before adding more presentation features.