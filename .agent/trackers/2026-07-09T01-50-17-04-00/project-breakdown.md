# Project Breakdown Tracker

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T01-50-17-04-00`

## Goal

Refresh the internal `.agent` breakdown for the selected Publish repo and align the central `LuminaryLabs-Dev/LuminaryLabs` ledger to the latest repo-local audit state.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared Publish repos against central `LuminaryLabs-Dev/LuminaryLabs` repo ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent/START_HERE.md`.
- [x] Read repo-local current audit, known gaps, next steps, validation, and kit registry.
- [x] Read `package.json`.
- [x] Read `index.html`.
- [x] Read `src/game.js`.
- [x] Read `src/stage-kit.js`.
- [x] Read `src/story-data.js`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services the kits offer.
- [x] Identified implemented and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added interaction audit.
- [x] Added gameplay audit.
- [x] Added story-authority audit.
- [x] Added deploy audit.
- [x] Added timestamped turn ledger entry.
- [x] Updated kit registry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed only to `main`.

## Selection result

No checked non-Cavalry Publish repo was new, ledger-absent, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`TheUnmappedHouse` was selected because repo-local `.agent` state had advanced to `2026-07-09T01-40-49-04-00` while central tracking still pointed at `2026-07-08T23-19-33-04-00`.

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
  -> debug panel emits ad hoc JSON
```

## Domains

```txt
implemented:
  static-page-shell, browser-app-runtime, story-source, story-state, localstorage-save, notebook-log, route-state, interlude-overlay, stage-render-host, fixed-aspect-frame, fixed-camera-composition, scene-descriptor, stage-layer-descriptor, stage-prop-descriptor, stage-hotspot-volume, hotspot-raycast-picking, hover-label-projection, anime-material-shader, webgl-post-process, debug-json-projection.

missing-next:
  story-source-manifest, story-source-snapshot, story-source-preflight, story-state-snapshot, stage-scene-snapshot, story-command-envelope, story-command-validation, story-command-reason-authority, story-command-result-authority, story-event-records, story-result-reducer, story-projection, save-projection, interlude-projection, stage-projection, story-browser-adapter-plan, browser-adapter-readback, story-host-adapter, GameHost-story-diagnostics, central-ledger-readback, fixture-replay.
```

## Services

```txt
implemented:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, computeAspectFrame, applyAspectFrame, StageKit renderer setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate.

needed:
  createStorySourceManifest, createStorySourceSnapshot, createStoryPreflight, createStoryCommandEnvelope, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectStageIntent, createStoryBrowserAdapterPlan, readBackBrowserAdapterPlan, projectGameHostStoryDiagnostics, createCentralLedgerReadback, runStoryFixtureSequence.
```

## Kits

```txt
implemented:
  unmapped-house-static-shell-kit, unmapped-house-browser-runtime-kit, unmapped-house-story-data-kit, unmapped-house-story-runtime-kit, unmapped-house-story-state-save-kit, unmapped-house-localstorage-save-kit, unmapped-house-clue-ledger-kit, unmapped-house-scene-completion-kit, unmapped-house-interlude-overlay-kit, unmapped-house-route-state-kit, unmapped-house-notebook-debug-kit, unmapped-house-aspect-frame-kit, unmapped-house-stage-kit, unmapped-house-fixed-camera-diorama-kit, unmapped-house-stage-layer-kit, unmapped-house-stage-prop-kit, unmapped-house-stage-hotspot-volume-kit, unmapped-house-hotspot-raycast-kit, unmapped-house-hover-label-kit, unmapped-house-anime-material-shader-kit, unmapped-house-stage-postprocess-kit, unmapped-house-static-validation-kit, unmapped-house-agent-state-kit.

next-cut:
  unmapped-house-story-source-manifest-kit, unmapped-house-story-source-snapshot-kit, unmapped-house-story-source-preflight-kit, unmapped-house-story-state-snapshot-kit, unmapped-house-stage-scene-snapshot-kit, unmapped-house-story-command-envelope-kit, unmapped-house-command-validation-kit, unmapped-house-story-command-result-kit, unmapped-house-story-command-reason-kit, unmapped-house-story-reducer-kit, unmapped-house-story-event-record-kit, unmapped-house-save-projection-kit, unmapped-house-interlude-projection-kit, unmapped-house-stage-projection-kit, unmapped-house-browser-adapter-plan-kit, unmapped-house-browser-adapter-readback-kit, unmapped-house-gamehost-diagnostics-kit, unmapped-house-central-ledger-readback-kit, unmapped-house-dom-free-fixture-kit.
```

## Main finding

`TheUnmappedHouse` should not start with more story rooms or a StageKit rewrite.

The next source pass should introduce story authority modules and fixtures so `src/game.js` stops being the source of truth and becomes a browser adapter with readback.

## Files changed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T01-50-17-04-00-story-adapter-central-readback-dsk-map.md
.agent/render-audit/2026-07-09T01-50-17-04-00-stage-projection-readback-freeze.md
.agent/interaction-audit/2026-07-09T01-50-17-04-00-hotspot-command-adapter-boundary.md
.agent/gameplay-audit/2026-07-09T01-50-17-04-00-story-result-route-loop.md
.agent/story-authority-audit/2026-07-09T01-50-17-04-00-source-preflight-adapter-readback-contract.md
.agent/deploy-audit/2026-07-09T01-50-17-04-00-npm-check-fixture-wire-map.md
.agent/trackers/2026-07-09T01-50-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T01-50-17-04-00.md
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
pushed to main: yes
```
