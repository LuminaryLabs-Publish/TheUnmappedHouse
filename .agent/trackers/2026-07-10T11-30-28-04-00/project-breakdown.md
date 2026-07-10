# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T11-30-28-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/TheUnmappedHouse
```

## Selection reason

The current public `LuminaryLabs-Publish` repository list was compared against the central ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent` state, recently added, or otherwise undocumented.

`TheUnmappedHouse` was selected as the oldest eligible documented fallback after `ZombieOrchard` advanced to `2026-07-10T11-20-54-04-00`. `TheCavalryOfRome` remained excluded by rule.

## Current product read

`TheUnmappedHouse` is a fixed-camera anime horror point-and-click prototype. The player inspects hotspots across three story scenes, gathers clues, triggers interludes, and reaches a terminal prototype-complete route.

The route is stable. The next useful work is not more rooms, inventory, audio, visual polish, or a `StageKit` rewrite. The next useful work is source-owned story command/readback proof and a DOM-free fixture.

## Interaction loop

```txt
index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit and scenes/gameTitle from src/story-data.js
  -> DOM nodes are captured at module scope
  -> loadState shallow-merges localStorage over createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit constructs renderer, camera, post pass, raycaster, fixed frame, hover, and click callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi writes title, scene text, hotspot buttons, and debug JSON
  -> button click or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspect mutates inspected/clues/log/text, checks completion, renders, and saves
  -> repeat inspect writes text/log/UI/save but returns no typed no_mutation result
  -> completion schedules showInterlude via setTimeout
  -> continue mutates scene/route, hides interlude, calls StageKit.loadScene, renders, and saves
  -> final continue writes prototype-complete copy directly into interlude DOM
  -> KeyR clears localStorage and reloads
```

## Domains in use

```txt
static-browser-shell
fixed-aspect-frame
story-panel-dom
interlude-dom-route
hover-label-dom
story-source-descriptor
scene-source-descriptor
hotspot-source-descriptor
stage-source-descriptor
post-process-source-descriptor
browser-story-runtime
story-state
save-state
scene-route-state
clue-ledger
inspected-hotspot-ledger
notebook-log-state
completion-policy
interlude-policy
terminal-route-policy
stage-render-host
three-cdn-runtime
stage-scene-consumption
anime-shader-material
post-process-pass
hotspot-volume
raycast-picking
hover-label-projection
side-panel-hotspot-input
keyboard-reset-input
debug-json-projection
story-source-manifest-next
story-command-envelope-next
story-command-preflight-next
story-command-result-next
story-projection-ledger-next
story-adapter-ledger-next
browser-adapter-readback-next
stage-load-readback-next
stage-pick-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Services the kits offer

- `static-page-shell-kit`: mounts the fixed 16:9 browser route, stage, story panel, hover label, and interlude shell.
- `aspect-frame-kit`: computes and applies the canonical 1920 x 1080 display frame.
- `story-data-kit`: provides story title, scenes, hotspots, camera, stage layers, props, post settings, clue grants, requirements, and interlude copy.
- `browser-story-runtime-kit`: owns current state, saved state, hotspot inspection, clue grants, completion checks, route mutation, DOM projection, reset, and localStorage persistence.
- `stage-render-kit`: owns Three.js renderer, camera, scene, lights, fog, target texture, post pass, stage meshes, props, hotspots, resize, animation, and render submission.
- `hotspot-picking-kit`: maps pointer/raycast hits to hotspot callbacks and hover text.
- `debug-json-projection-kit`: writes current aggregate state into the notebook debug panel.
- Planned proof services: source manifest, source fingerprint, command envelope, preflight, command result, projection record, adapter ledger, save/interlude/stage intent rows, StageKit readback, GameHost diagnostics, and DOM-free fixture rows.

## Current kits

```txt
static-page-shell-kit
aspect-frame-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
story-data-kit
browser-story-runtime-kit
localstorage-save-kit
notebook-log-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

## Next-cut kits

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-source-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-command-preflight-kit
story-command-result-kit
story-projection-ledger-kit
save-intent-record-kit
interlude-intent-record-kit
terminal-route-result-kit
stage-load-intent-kit
stage-load-readback-kit
stage-pick-readback-kit
browser-adapter-plan-kit
story-adapter-ledger-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Main finding

`src/game.js` is still the command authority and the browser effect adapter. It interprets hotspot/continue/reset input, mutates state, grants clues, checks completion, schedules interludes, writes terminal copy, saves to localStorage, projects DOM, reloads the page, and commands `StageKit` directly.

`StageKit` is a useful render consumer and should not be rewritten first, but it currently exposes no serializable load, pick, hover, or render-readback rows that can be tied to story command results.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Readback Ledger Refresh + DOM-Free Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in this run
```
