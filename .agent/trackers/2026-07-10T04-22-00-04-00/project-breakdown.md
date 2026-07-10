# TheUnmappedHouse Project Breakdown

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Goal

Refresh repo-local `.agent` documentation for one eligible `LuminaryLabs-Publish` repo, capture the current interaction loop/domains/services/kits, and sync central tracking.

## Selection result

```txt
selected repo: LuminaryLabs-Publish/TheUnmappedHouse
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
selection rule: oldest eligible documented fallback
```

The current public Publish repo list was compared against central ledger state.

No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

After `ZombieOrchard` advanced to `2026-07-10T04-11-36-04-00`, `TheUnmappedHouse` was the oldest eligible documented fallback.

## Public Publish repos observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T02-51-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T02-38-56-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T02-31-58-04-00
LuminaryLabs-Publish/TheUnmappedHouse     selected / oldest eligible fallback / prior central latest 2026-07-10T02-19-14-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T03-59-57-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Source readback

Files read this pass:

```txt
package.json
index.html
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Note: `src/story.js` is not present. The story source of truth is `src/story-data.js`.

## Current interaction loop

```txt
index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit and story descriptors from src/story-data.js
  -> DOM nodes are captured at module scope
  -> loadState() shallow-merges localStorage into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as onHotspot callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi() writes title, text, hotspot buttons, and debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text into interlude DOM
  -> KeyR clears localStorage and reloads
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
story-command-result-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Kit services

```txt
static-page-shell-kit: HTML app shell, fixed frame containers, story panel, interlude, hover label, module entry
aspect-frame-kit: 1920x1080 canonical frame, letterbox/pillarbox sizing, frame scale
story-data-kit: game title, scene descriptors, hotspot descriptors, grants, completion requirements, interlude copy, camera/stage/post descriptors
browser-story-runtime-kit: load state, save state, inspect hotspot, grant clues, log notes, check completion, show interlude, advance scene, terminal route, reset, render debug JSON
stage-render-kit: Three renderer, fixed frame, camera, lights, fog, render target, post scene, animation loop
scene-descriptor-consumer-kit: consumes layers, props, hotspots, camera, post settings from scene descriptors
anime-material-kit: triplanar-ish shader texture, toon lighting, material uniforms
post-process-kit: grain, vignette, chromatic offset, distortion, memory scanline pass
hotspot-volume-kit: invisible hotspot meshes with source hotspot userData
hotspot-picking-kit: pointer normalization, raycaster picking, hover label, click dispatch
localstorage-save-kit: story state persistence under SAVE_KEY
debug-json-projection-kit: scene/clue/route/inspection/completion/latest log projection
```

## Kits

Current kits:

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
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Main finding

`TheUnmappedHouse` should not get new story rooms, inventory, audio, renderer extraction, or a `StageKit` rewrite next.

The durable blocker is still `src/game.js`: it owns story command interpretation, mutation, clue grants, completion checks, interlude scheduling, save writes, StageKit loading, terminal copy, DOM projection, reset, and debug JSON together.

## Next safe ledge

```txt
TheUnmappedHouse Story Command Fixture Proof + Browser Adapter Readback Gate
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
