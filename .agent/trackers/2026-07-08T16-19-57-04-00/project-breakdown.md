# Project Breakdown: TheUnmappedHouse

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update root `.agent` docs, identify interaction loop/domains/services/kits, and log the work centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger and sampled root `.agent` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read `package.json`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, interaction, gameplay, and story-authority audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Repo selected

```txt
LuminaryLabs-Publish/TheUnmappedHouse
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected as the oldest sampled root-agent fallback because its last root alignment was `2026-07-08T14-31-06-04-00`, older than the other sampled non-excluded repos.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T15:49:18-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T14:51:11-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / repo-local alignment 2026-07-08T16-10-36-04-00; central ledger still older at sampled readback
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled alignment 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback / oldest sampled root alignment 2026-07-08T14-31-06-04-00
```

## Source-backed finding

`TheUnmappedHouse` has a stable visual route, but its story authority is still host-owned.

`src/game.js` owns DOM bindings, `SAVE_KEY`, state load/save, module-level mutable `state` and `currentScene`, StageKit construction, inspection, clue grants, completion checks, interlude timing, next-scene routing, UI projection, debug JSON, reset, and save writes.

`src/stage-kit.js` owns the visual stage and should remain stable while source-owned story authority is added.

`src/story-data.js` owns three ordered scene descriptors and the static story source.

## Interaction loop

```txt
open index.html
  -> src/game.js loads story source and saved state
  -> StageKit loads the current fixed-camera scene
  -> hotspot side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> inspectHotspot mutates inspected state, grants clues, writes text/log, checks scene completion, schedules interlude, renders UI, and saves
  -> continue button calls nextScene()
  -> nextScene mutates scene id, route, interlude DOM, StageKit scene, UI, and save state
  -> KeyR clears localStorage and reloads
  -> debug panel emits an ad hoc JSON projection
```

## Domains in use

```txt
implemented:
  static-page-shell, static-pages-deploy, browser-app-runtime, story-source, story-state, localstorage-save, notebook-log, route-state, interlude-overlay, stage-render-host, fixed-aspect-frame, fixed-camera-composition, scene-descriptor, stage-layer-descriptor, stage-prop-descriptor, stage-hotspot-volume, hotspot-raycast-picking, hover-label-projection, anime-material-shader, webgl-post-process, debug-json-projection.

next-cut:
  story-source-snapshot, story-state-snapshot, stage-scene-snapshot, story-command-envelope, story-command-validation, story-command-reason-authority, story-command-result-authority, story-event-records, story-result-reducer, story-projection, save-projection, interlude-projection, story-host-adapter, GameHost-story-diagnostics, fixture-replay, fixture-result-summary.
```

## Services the kits offer

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, computeAspectFrame, applyAspectFrame, StageKit renderer/camera/raycaster/lights/render-target setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate, story scene descriptors, package syntax check.

needed next:
  createStorySourceSnapshot, validateStorySourceSnapshot, createGrantableClueIndex, createSceneCompletionIndex, createInitialStoryState, normalizeLoadedStoryState, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, validateStoryCommand, createStoryCommandReason, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, applyInspectionCommand, applyContinueSceneCommand, applySaveCommand, applyLoadCommand, applyResetCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectGameHostStoryDiagnostics, runStoryFixtureSequence, summarizeStoryFixtureResults.
```

## Kits identified

```txt
implemented or implied:
  unmapped-house-static-shell-kit, unmapped-house-static-pages-deploy-kit, unmapped-house-browser-runtime-kit, unmapped-house-story-data-kit, unmapped-house-story-runtime-kit, unmapped-house-story-state-save-kit, unmapped-house-localstorage-save-kit, unmapped-house-clue-ledger-kit, unmapped-house-scene-completion-kit, unmapped-house-interlude-overlay-kit, unmapped-house-route-state-kit, unmapped-house-notebook-debug-kit, unmapped-house-aspect-frame-kit, unmapped-house-stage-kit, unmapped-house-fixed-camera-diorama-kit, unmapped-house-stage-layer-kit, unmapped-house-stage-prop-kit, unmapped-house-stage-hotspot-volume-kit, unmapped-house-hotspot-raycast-kit, unmapped-house-hover-label-kit, unmapped-house-anime-material-shader-kit, unmapped-house-stage-postprocess-kit, unmapped-house-static-validation-kit.

next-cut:
  unmapped-house-story-source-snapshot-kit, unmapped-house-story-state-snapshot-kit, unmapped-house-stage-scene-snapshot-kit, unmapped-house-story-command-envelope-kit, unmapped-house-command-validation-kit, unmapped-house-story-command-result-kit, unmapped-house-story-command-reason-kit, unmapped-house-story-reducer-kit, unmapped-house-story-event-record-kit, unmapped-house-inspection-action-kit, unmapped-house-inspection-result-contract-kit, unmapped-house-clue-ledger-reducer-kit, unmapped-house-scene-completion-result-kit, unmapped-house-scene-transition-result-kit, unmapped-house-prototype-complete-result-kit, unmapped-house-save-result-kit, unmapped-house-save-projection-kit, unmapped-house-interlude-projection-kit, unmapped-house-route-state-journal-kit, unmapped-house-command-journal-kit, unmapped-house-story-ui-projection-kit, unmapped-house-gamehost-diagnostics-kit, unmapped-house-dom-free-fixture-kit.
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T16-19-57-04-00-story-authority-source-file-map.md
.agent/render-audit/2026-07-08T16-19-57-04-00-stage-snapshot-projection-boundary.md
.agent/interaction-audit/2026-07-08T16-19-57-04-00-story-result-host-adapter-contract.md
.agent/gameplay-audit/2026-07-08T16-19-57-04-00-route-completion-result-loop.md
.agent/story-authority-audit/2026-07-08T16-19-57-04-00-source-file-cutover-contract.md
.agent/trackers/2026-07-08T16-19-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T16-19-57-04-00.md
```

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Source File Cutover + Host Projection Fixture Gate
```

## Validation

```txt
runtime source changed: no
local npm run check: not run
browser smoke: not run
GitHub Pages smoke: not run
branch created: no
push target: main
```
