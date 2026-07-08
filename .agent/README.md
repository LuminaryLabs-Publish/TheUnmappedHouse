# The Unmapped House Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheUnmappedHouse`.

## Latest tracker

```txt
.agent/trackers/2026-07-08T00-08-03-04-00/project-breakdown.md
```

## Latest kit registry

```txt
.agent/kit-registry.json
```

## Tracker history

```txt
.agent/trackers/2026-07-08T00-08-03-04-00/project-breakdown.md
```

## Current repo read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype. Its current product shape is a text-first inspection game wrapped around a reusable Stage Kit: Three.js locked-camera diorama scenes, procedural stage props, invisible hotspot volumes, clue-gated scene completion, interlude transitions, localStorage state, anime shader materials, and WebGL post-processing.

The live route is:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

The main blocker is not visual rendering. The main blocker is authority shape: inspection, clue grants, completion, transitions, route updates, and save writes currently mutate state directly without typed result records, stable rejection reasons, a command journal, a `window.GameHost` diagnostics surface, or DOM-free fixture replay.

## Current explicit kit inventory

```txt
unmapped-house-static-shell-kit
unmapped-house-stage-kit
unmapped-house-fixed-camera-diorama-kit
unmapped-house-anime-material-shader-kit
unmapped-house-stage-postprocess-kit
unmapped-house-hotspot-raycast-kit
unmapped-house-hover-label-kit
unmapped-house-story-data-kit
unmapped-house-story-state-save-kit
unmapped-house-clue-ledger-kit
unmapped-house-scene-completion-kit
unmapped-house-interlude-overlay-kit
unmapped-house-notebook-debug-kit
unmapped-house-static-pages-deploy-kit
```

## Current candidate kit inventory

```txt
unmapped-house-app-runtime-kit
unmapped-house-story-ui-projection-kit
unmapped-house-localstorage-save-kit
unmapped-house-route-state-kit
unmapped-house-stage-descriptor-kit
unmapped-house-stage-layer-kit
unmapped-house-stage-prop-kit
unmapped-house-stage-hotspot-volume-kit
unmapped-house-fixed-camera-parallax-kit
unmapped-house-postprocess-memory-kit
unmapped-house-static-validation-kit
```

## Next cutover kit inventory

```txt
unmapped-house-inspection-action-kit
unmapped-house-inspection-command-envelope-kit
unmapped-house-inspection-result-contract-kit
unmapped-house-inspection-rejection-reason-kit
unmapped-house-clue-ledger-reducer-kit
unmapped-house-scene-completion-result-kit
unmapped-house-scene-transition-result-kit
unmapped-house-route-state-journal-kit
unmapped-house-save-result-kit
unmapped-house-story-snapshot-projector-kit
unmapped-house-stage-snapshot-projector-kit
unmapped-house-gamehost-diagnostics-kit
unmapped-house-command-journal-kit
unmapped-house-dom-free-fixture-kit
unmapped-house-hotspot-fixture-matrix-kit
unmapped-house-scene-completion-fixture-kit
unmapped-house-stage-descriptor-validation-kit
```

## Immediate next product direction

Commit to `TheUnmappedHouse Inspection Result Contract + Scene Transition Fixture Gate`:

```txt
preserve current static route, visuals, story text, StageKit behavior, localStorage key, and Pages workflow
  -> add StoryStateSnapshot and StageSceneSnapshot helpers
  -> add InspectionCommandEnvelope and InspectionResult contracts
  -> add stable InspectionReason values
  -> move mutation out of inspectHotspot into a pure inspection reducer
  -> preserve UI behavior by consuming result records
  -> add SceneCompletionResult and SceneTransitionResult
  -> add RouteJournal entries for inspections and transitions
  -> add SaveResult around localStorage persistence
  -> expose window.GameHost.getState() diagnostics
  -> add DOM-free fixture coverage for first-room completion, repeat inspection, unknown hotspot, transition, full route, save/load, and reset
  -> defer StageKit renderer extraction until story authority fixtures are stable
```

## Next acceptance target

```txt
The browser prototype still loads from index.html.
Hotspot buttons and raycast clicks both produce typed InspectionResult records.
First-time inspection grants clues once.
Repeat inspection is classified as repeat_inspection and does not duplicate clues.
Unknown hotspot is rejected with unknown_hotspot.
Room completion emits SceneCompletionResult.
Continue emits SceneTransitionResult.
RouteJournal captures accepted inspection and transition events.
window.GameHost.getState() exposes story, stage, save, journal, latestResult, and fixture diagnostics.
DOM-free smoke proves core story progression without rendering.
```
