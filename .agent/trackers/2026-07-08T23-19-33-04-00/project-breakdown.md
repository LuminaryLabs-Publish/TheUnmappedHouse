# Project Breakdown Tracker

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, update root `.agent` docs, identify loop/domains/services/kits, and log the result centrally.

## Checklist

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared Publish repos against central `LuminaryLabs-Dev/LuminaryLabs` ledger paths.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/TheUnmappedHouse`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read `package.json`, `src/game.js`, `src/stage-kit.js`, and `src/story-data.js`.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified services the kits offer.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, interaction, gameplay, story-authority, and deploy audits.
- [x] Added this tracker and turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log.
- [ ] Did not run local/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, recently added but undocumented, missing sampled root `.agent` state, or otherwise undocumented.

`TheUnmappedHouse` was selected as the central-ledger catch-up fallback because repo-local `.agent` state had advanced to `2026-07-08T23-08-29-04-00`, while central tracking still pointed at `2026-07-08T21-00-12-04-00`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central alignment 2026-07-08T21-31-35-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    selected / central catch-up from 2026-07-08T21-00-12-04-00 and root state 2026-07-08T23-08-29-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central alignment 2026-07-08T21-50-56-04-00
```

## Interaction loop

```txt
current:
  open index.html
    -> src/game.js imports StageKit plus story data
    -> loadState shallow-merges localStorage into initial state
    -> currentScene falls back to scenes[0] if sceneId is invalid
    -> StageKit loads current scene
    -> hotspot button or raycast click calls inspectHotspot
    -> inspectHotspot mutates inspected/clues/text/log/completion/interlude/UI/save
    -> continue button calls nextScene
    -> nextScene mutates route/interlude/stage/UI/save
    -> KeyR clears localStorage and reloads
    -> debug panel emits ad hoc JSON

target:
  UI event or StageKit callback
    -> StoryCommandEnvelope
    -> StoryPreflight
    -> StoryCommandResult
    -> StoryProjection / SaveProjection / InterludeProjection / StageProjection
    -> StoryBrowserAdapterPlan
    -> BrowserAdapterReadback
    -> GameHostStoryDiagnostics
    -> fixture row
```

## Domains

```txt
implemented:
  static-page-shell
  browser-app-runtime
  story-source
  story-state
  localstorage-save
  notebook-log
  route-state
  interlude-overlay
  stage-render-host
  fixed-aspect-frame
  fixed-camera-composition
  scene-descriptor
  stage-layer-descriptor
  stage-prop-descriptor
  stage-hotspot-volume
  hotspot-raycast-picking
  hover-label-projection
  anime-material-shader
  webgl-post-process
  debug-json-projection

missing-next:
  story-source-manifest
  story-source-snapshot
  story-source-preflight
  story-state-snapshot
  stage-scene-snapshot
  story-command-envelope
  story-command-validation
  story-command-reason-authority
  story-command-result-authority
  story-event-record
  story-result-reducer
  story-projection
  save-projection
  interlude-projection
  stage-projection
  story-browser-adapter-plan
  browser-adapter-readback
  GameHost-story-diagnostics
  fixture-replay
```

## Services

```txt
implemented services:
  createInitialState, loadState, saveState, hasClue, grantClues, writeLog, sceneComplete, inspectHotspot, showInterlude, nextScene, renderUi, KeyR reset, StageKit renderer/camera/raycaster/lights/render-target setup, StageKit animeMaterial, StageKit loadScene, StageKit createLayer, StageKit createProp, StageKit createHotspot, StageKit handlePointer, StageKit pick, StageKit clickHotspot, StageKit resize, StageKit animate, story scene descriptors, syntax check.

next services:
  createStorySourceManifest, createStorySourceSnapshot, validateStorySourceSnapshot, createStoryPreflight, createStoryStateSnapshot, createStageSceneSnapshot, createStoryCommandEnvelope, validateStoryCommand, createStoryCommandReason, createStoryCommandResult, createStoryEventRecord, applyStoryCommand, projectStoryUiState, projectSaveIntent, projectInterludeIntent, projectStageIntent, createStoryBrowserAdapterPlan, readBackBrowserAdapterPlan, projectGameHostStoryDiagnostics, runStoryFixtureSequence.
```

## Main finding

`src/game.js` remains the authority bottleneck. It owns browser input, command execution, mutation, save writes, interlude timing, route transitions, StageKit load timing, and debug projection.

The next runtime work should not touch the current visual renderer first. It should add source-owned story command/result/projection/readback contracts and fixture rows, then make `src/game.js` consume those records.

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T23-19-33-04-00-story-browser-adapter-readback-dsk-map.md
.agent/render-audit/2026-07-08T23-19-33-04-00-stage-projection-consumer-readback.md
.agent/interaction-audit/2026-07-08T23-19-33-04-00-hotspot-command-adapter-readback.md
.agent/gameplay-audit/2026-07-08T23-19-33-04-00-story-result-adapter-loop.md
.agent/story-authority-audit/2026-07-08T23-19-33-04-00-central-ledger-adapter-readback-contract.md
.agent/deploy-audit/2026-07-08T23-19-33-04-00-fixture-check-wire-map.md
.agent/trackers/2026-07-08T23-19-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T23-19-33-04-00.md
```

## Next safe ledge

```txt
TheUnmappedHouse Story Browser Adapter Readback + Central Ledger Catch-up Fixture Gate
```

## Validation

```txt
runtime source changed: no
local validation run: no
browser validation run: no
branch created: no
pushed to main: yes
```
