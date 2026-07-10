# TheUnmappedHouse project breakdown — 2026-07-10T07-20-08-04-00

## Selection

Selected repo: `LuminaryLabs-Publish/TheUnmappedHouse`.

Reason: the current public `LuminaryLabs-Publish` list is tracked for all checked non-Cavalry repos and sampled root `.agent` state is present. `TheCavalryOfRome` remains excluded. `TheUnmappedHouse` was the oldest eligible documented fallback in the central ledger at selection time.

## Plan ledger

```txt
[x] Compared the current Publish repo list against central tracking.
[x] Excluded TheCavalryOfRome.
[x] Selected one repo only: TheUnmappedHouse.
[x] Read root .agent state and central ledger state.
[x] Read package.json, src/game.js, src/story-data.js, and src/stage-kit.js.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and next-cut kits.
[x] Refreshed root .agent docs.
[x] Added tracker, turn-ledger, architecture, render, interaction, gameplay, story-authority, and deploy audits.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source edit.
[ ] npm run check.
[ ] Browser smoke.
[ ] DOM-free story fixture run.
```

## Runtime files read

```txt
package.json
src/game.js
src/story-data.js
src/stage-kit.js
```

## Interaction loop

```txt
open index.html
  -> #aspect-frame mounts #stage, #story-panel, #hotspot-list, #state-debug, #hover-label, and #interlude
  -> script type=module loads ./src/game.js
  -> src/game.js imports StageKit and story descriptors from src/story-data.js
  -> DOM nodes are captured at module scope
  -> localStorage is shallow-merged into createInitialState()
  -> currentScene resolves from saved sceneId or scenes[0]
  -> StageKit is constructed with inspectHotspot as callback
  -> StageKit.loadScene(currentScene) consumes camera/stage/hotspot/post descriptors
  -> renderUi() writes title/text/buttons/debug JSON
  -> side-panel button or StageKit raycast click calls inspectHotspot(hotspot)
  -> first inspection mutates inspected state, grants clues, writes text/log, checks completion, schedules interlude, renders UI, and saves
  -> repeat inspection writes text/log/UI/save without typed no_mutation result
  -> continue button calls nextScene()
  -> nextScene mutates current scene, route, interlude DOM, StageKit scene, UI, and save state
  -> terminal route writes prototype-complete text directly into DOM state
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
story-authority-next
story-command-result-next
story-adapter-ledger-next
browser-adapter-readback-next
stage-load-readback-next
dom-free-story-fixture-next
repo-local-agent-ledger
central-ledger-sync
```

## Kit services

```txt
story-data-kit: source descriptors for game title, scenes, hotspots, grants, completion requirements, interludes, camera, stage, and post settings.
browser-story-runtime-kit: browser-bound command handling, mutation, persistence, route progression, DOM projection, reset, and debug JSON.
stage-render-kit: WebGL renderer, fixed frame, camera, lights, fog, scene descriptor consumption, hotspot volumes, raycast picking, hover, and post-process.
aspect-frame-kit: fixed 16:9 layout calculation and application.
localstorage-save-kit: shallow story-state persistence.
notebook-log-kit: latest story log records.
debug-json-projection-kit: ad hoc current scene, clue, route, inspection, completion, and latest-log projection.
repo-local-agent-ledger-kit: stores repo-local audit state.
central-ledger-sync-kit: stores central tracking state.
planned story-authority services: source manifest, fingerprints, snapshots, preflight, command envelopes, reason catalog, command results, projection records, adapter ledger rows, diagnostics, replay, and DOM-free fixture rows.
```

## Kits

### Implemented/current kits

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

### Next-cut kits

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
story-adapter-ledger-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
repo-local-ledger-readback-kit
central-ledger-readback-kit
```

## Main finding

`TheUnmappedHouse` should not start next with new story rooms, inventory, audio, renderer extraction, or a `StageKit` rewrite.

The blocker is story authority and browser adapter proof. `src/game.js` still owns command dispatch, mutation, save writes, interlude timing, route changes, StageKit scene loading, DOM projection, reset, and debug JSON together.

## Next safe ledge

```txt
TheUnmappedHouse Story Authority Adapter Ledger Refresh + Browser Fixture Gate
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
```
