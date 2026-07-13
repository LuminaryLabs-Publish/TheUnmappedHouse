# START HERE: The Unmapped House scene-transition composition authority

**Last updated:** `2026-07-13T09-03-20-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `scene-transition-composition-authority-audited`  
**Retained statuses:** `render-provider-admission-authority-central-reconciled`, `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current audit isolates scene-transition composition. `nextScene()` advances story state and closes the interlude before `StageKit.loadScene()` destructively replaces the stage; UI projection and persistence happen afterward. A stage, DOM or storage failure can therefore leave story, stage, interlude, UI and save on different scene revisions.

## Plan ledger

**Goal:** require one prepared and terminal scene-transition result before story, stage, interlude, UI or save ownership changes.

- [x] Compare the full ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked and root-documented.
- [x] Find no new, missing or unsynchronized eligible repository.
- [x] Select only `TheUnmappedHouse` by the oldest documented timestamp.
- [x] Trace boot, completion, interlude and scene-advance behavior.
- [x] Preserve all 24 implemented kits and their services.
- [x] Define the scene-transition composition authority and proof gates.
- [x] Create a new timestamped tracker and audit family.
- [ ] Implement and execute the authority.

## Selection

```txt
TheUnmappedHouse   2026-07-13T04-47-00-04-00 selected oldest
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
PhantomCommand     2026-07-13T05-59-03-04-00
HorrorCorridor     2026-07-13T07-00-29-04-00
ZombieOrchard      2026-07-13T07-41-11-04-00
MyCozyIsland       2026-07-13T08-04-17-04-00
PrehistoricRush    2026-07-13T08-39-12-04-00
TheCavalryOfRome   excluded
```

## Active scene transition

```txt
Continue
  -> assign currentScene = next
  -> mutate sceneId, route and log
  -> close interlude
  -> loadScene(next)
       -> clear current stage
       -> rebuild camera, materials, geometry and hotspots
  -> renderUi()
  -> saveState()
  -> later RAF presents the stage
```

There is no transition ID, predecessor revision, detached participant preparation, atomic commit, rollback result or first matching visible-frame acknowledgement.

## Required authority

```txt
the-unmapped-house-scene-transition-composition-authority-domain
```

It must coordinate story, route, stage, interlude, UI and save participants without taking over their bounded meaning. Every accepted transition must commit all participants together and publish `FirstSceneFrameAck`; every rejected transition must preserve the complete predecessor set.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T09-03-20-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T09-03-20-04-00-scene-transition-composition-authority-dsk-map.md`
5. `scene-transition-audit/2026-07-13T09-03-20-04-00-story-stage-ui-save-atomicity-contract.md`
6. `interaction-audit/2026-07-13T09-03-20-04-00-scene-command-participant-result-map.md`
7. `gameplay-audit/2026-07-13T09-03-20-04-00-next-scene-cross-participant-transition-loop.md`
8. `render-audit/2026-07-13T09-03-20-04-00-scene-story-visible-frame-coherence-gap.md`
9. `deploy-audit/2026-07-13T09-03-20-04-00-scene-transition-fixture-gate.md`
10. `central-sync-audit/2026-07-13T09-03-20-04-00-repo-ledger-scene-transition-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Next safe ledge

Add a non-mutating `prepareSceneTransition()` path that validates the authored successor and builds detached story, stage, UI and save candidates. Commit those candidates only after every participant reports prepared.