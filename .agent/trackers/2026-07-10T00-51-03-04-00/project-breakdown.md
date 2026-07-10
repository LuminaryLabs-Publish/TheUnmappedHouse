# Project breakdown: The Unmapped House

Timestamp: `2026-07-10T00-51-03-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/TheUnmappedHouse`

Reason: the current public `LuminaryLabs-Publish` list was checked and contained 9 repos. `TheCavalryOfRome` stayed excluded. No checked public non-Cavalry repo was new, missing from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `TheUnmappedHouse` was the oldest eligible documented fallback by central ledger timestamp.

## Current interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit plus gameTitle/scenes from src/story-data.js
  -> DOM nodes are captured at module scope
  -> localStorage key the-unmapped-house.stage-prototype.v1 is shallow-merged into createInitialState()
  -> currentScene resolves from saved state.sceneId or scenes[0]
  -> StageKit is constructed with #stage, #hover-label, and inspectHotspot as onHotspot
  -> StageKit.loadScene(currentScene) consumes camera, stage layers, props, hotspots, fog, background, and post settings
  -> renderUi() projects title, opening text, hotspot buttons, and ad hoc debug JSON
  -> side-panel click or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspect marks state.inspected, grants clues, writes log/text, may schedule showInterlude(), renders UI, saves
  -> repeat inspect writes text/log/UI/save without a typed no_mutation result
  -> sceneComplete() checks requiresToComplete against state.clues
  -> showInterlude() opens the map-update overlay after completion
  -> continue button calls nextScene()
  -> nextScene loads the next scene into StageKit, mutates route, renders UI, saves
  -> terminal continue writes Prototype complete copy into the interlude DOM but does not emit a terminal result row
  -> KeyR removes localStorage and reloads
```

## Domains in use

```txt
static-browser-shell
fixed-aspect-frame
story-panel-dom
interlude-dom-route
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
story-command-authority-next
browser-adapter-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Services that kits offer

```txt
static-page-shell-kit: HTML shell, accessible stage/story/interlude containers, module entry
aspect-frame-kit: fixed 1920x1080 frame sizing, scale, position, aspect application
story-data-kit: game title, scene descriptors, hotspots, grants, requirements, interlude copy, camera/stage/post source data
browser-story-runtime-kit: load state, save state, inspect hotspot, grant clues, write log, completion check, continue route, terminal copy, reset, DOM debug
stage-render-kit: Three renderer, scene, camera, lights, fog, render target, post scene, shader material, resize, animation
scene-descriptor-consumer-kit: consumes layer/prop/hotspot descriptors into Three meshes and camera/post settings
hotspot-volume-kit: creates invisible hotspot meshes and carries source hotspot data in userData
hotspot-picking-kit: pointer normalization, raycaster picking, hover state, click dispatch
anime-material-kit: triplanar/noise/toon shader material for stage layers and props
post-process-kit: grain, vignette, chromatic, distortion, memory, scanline pass
localstorage-save-kit: shallow browser persistence through SAVE_KEY
debug-json-projection-kit: current ad hoc scene/clue/route/inspection/completion JSON projection
planned story-authority kits: command envelopes, source snapshots, preflight, reason catalog, command results, projection records, save/interlude/stage intents, adapter readback, replay rows, fixture rows
```

## Kits identified

Current explicit/runtime kits:

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

Next-cut kits:

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-source-snapshot-kit
story-state-snapshot-kit
stage-scene-snapshot-kit
story-command-envelope-kit
story-command-reason-kit
story-preflight-kit
story-command-result-kit
story-event-record-kit
story-replay-row-kit
story-projection-record-kit
save-intent-record-kit
interlude-intent-record-kit
terminal-route-result-kit
stage-load-intent-kit
browser-adapter-plan-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
```

## Main finding

`TheUnmappedHouse` does not need more story content, inventory, audio, or a StageKit rewrite next. The durable blocker is that `src/game.js` still owns story command authority and browser effects together.

The proof gap is specific: accepted hotspot inspections, repeat/no-mutation inspections, stale/unknown hotspot rejection, scene completion, continue, terminal route, save intent, interlude intent, stage-load intent, DOM projection, and debug output do not have source-owned result/readback rows.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Readback Catch-up + Browser Adapter Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
pushed to main: yes, documentation only
```
