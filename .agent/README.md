# The Unmapped House Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheUnmappedHouse`.

## Latest tracker

```txt
.agent/trackers/2026-07-08T01-38-23-04-00/project-breakdown.md
```

## Latest kit registry

```txt
.agent/kit-registry.json
```

## Tracker history

```txt
.agent/trackers/2026-07-08T00-08-03-04-00/project-breakdown.md
.agent/trackers/2026-07-08T01-38-23-04-00/project-breakdown.md
```

## Current repo read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype. Its product surface is a text-first inspection game wrapped around a reusable Stage Kit: Three.js locked-camera diorama scenes, procedural stage props, invisible hotspot volumes, clue-gated scene completion, interlude transitions, localStorage state, anime shader materials, and WebGL post-processing.

The live route remains:

```txt
index.html
  -> src/game.js
  -> src/stage-kit.js
  -> src/story-data.js
```

The strongest reusable system is still `StageKit`. It owns renderer setup, locked camera composition, pointer parallax, shader material creation, post-process rendering, scene descriptor loading, layer/prop/hotspot creation, hover labels, raycast picking, resizing, and animation.

The main blocker is story authority shape. `src/game.js` mutates state directly from UI handlers. Inspection, clue grants, repeat inspection, room completion, interlude display, next-scene routing, save writes, reset, and debug projection do not yet produce typed result envelopes, stable reason codes, command journals, or DOM-free fixture replay.

## Interaction loop

```txt
open index.html
  -> read current room text
  -> hover stage hotspots or use side-panel buttons
  -> inspect hotspots
  -> collect clue grants
  -> complete the room when required clues are found
  -> read interlude / map update
  -> continue to the next scene
  -> persist route and clues with localStorage
  -> reset local save with R when needed
```

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

## Runtime-implied kit inventory

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
unmapped-house-story-command-envelope-kit
unmapped-house-inspection-action-kit
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

Commit to `TheUnmappedHouse Story Command Authority + Fixture Replay Gate`:

```txt
preserve current static route, visuals, story copy, StageKit behavior, localStorage key, and Pages workflow
  -> add StorySourceSnapshot and StageSceneSnapshot helpers
  -> add StoryCommandEnvelope for inspect_hotspot, continue_scene, reset_save, and load_save
  -> add StoryCommandResult with accepted/rejected status and stable reason
  -> move inspectHotspot mutation into pure applyInspectionCommand
  -> move nextScene mutation into pure applyContinueSceneCommand
  -> emit InspectionResult, SceneCompletionResult, SceneTransitionResult, SaveResult, and RouteJournal entries
  -> keep existing UI as a consumer of result records
  -> expose additive window.GameHost.getState diagnostics
  -> add DOM-free fixture harness for first-room completion, repeat inspection, unknown hotspot, transition, full route, save/load, and reset
  -> defer deeper StageKit renderer extraction until story authority fixtures are stable
```

## Next acceptance target

```txt
The browser prototype still loads from index.html.
All existing authored scenes, visuals, hotspot buttons, hover labels, and raycast clicks still work.
Hotspot buttons and raycast clicks both produce StoryCommandResult records.
First-time inspection grants each clue exactly once.
Repeat inspection returns reason=repeat_inspection and does not duplicate clues.
Unknown hotspot returns accepted=false with reason=unknown_hotspot.
Continue before completion returns accepted=false with reason=scene_incomplete.
Room completion produces SceneCompletionResult.
Continue after completion produces SceneTransitionResult.
RouteJournal captures accepted inspection and transition events.
SaveResult wraps load/save/reset paths.
window.GameHost.getState exposes story, stage, save, journal, latestResult, and fixture diagnostics.
DOM-free fixtures prove core story progression without WebGL or localStorage.
```
