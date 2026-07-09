# Architecture Audit: Story Authority Ledger Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
      imports StageKit
      imports story-data
      captures DOM nodes
      owns SAVE_KEY
      owns mutable story state
      owns currentScene
      owns hotspot inspection
      owns continuation
      owns localStorage write/read
      owns debug JSON projection
  -> src/stage-kit.js
      imports Three.js from CDN
      owns fixed 16:9 render surface
      owns descriptor-to-mesh translation
      owns raycast hotspot picking
  -> src/story-data.js
      owns scene, hotspot, clue, camera, stage, post, and interlude descriptors
```

## Source-owned domains already present

```txt
static-page-shell
fixed-aspect-frame
stage-render-host
stage-scene-descriptor
stage-layer-descriptor
stage-prop-descriptor
stage-hotspot-volume
hotspot-picking
anime-material
post-process-pass
story-data-source
browser-story-runtime
localstorage-save
notebook-log
interlude-overlay
browser-debug-projection
```

## Current anti-pattern

`src/game.js` is too many domains at once.

```txt
command adapter
command reducer
state authority
save adapter
route adapter
interlude scheduler
StageKit consumer
DOM projector
debug projector
reset adapter
```

Because the command result does not exist as a source-owned object, fixture rows cannot prove duplicate inspections, terminal continuation, malformed saves, scene transition, interlude intent, save intent, stage intent, or browser readback.

## DSK split target

```txt
story-source-manifest-kit
  owns product id, route id, save key, scene ids, command ids, source version, and expected ledger paths

story-source-snapshot-kit
  owns immutable story descriptor readback from src/story-data.js

story-state-snapshot-kit
  owns normalized state readback from initial/load/current state

stage-scene-snapshot-kit
  owns StageKit-facing scene descriptor readback without DOM/WebGL

story-command-envelope-kit
  owns inspect_hotspot, continue_scene, reset_story, load_state, save_state, project_ui, project_stage, readback_browser, readback_ledger commands

story-command-reason-kit
  owns stable reason codes for accepted, rejected, no_mutation, terminal, malformed, duplicate, missing_scene, missing_hotspot, incomplete_scene, and ledger_mismatch rows

story-preflight-kit
  owns descriptor, command, target, save, route, and ledger checks before mutation

story-command-result-kit
  owns accepted/rejected/no_mutation result shape

story-reducer-kit
  owns pure state transitions and event records

story-projection-kit
  owns text, log, clue, route, completion, debug, and notebook projection records

save-projection-kit
  owns save/write/clear/no_write intent records

interlude-projection-kit
  owns delayed interlude intent without hiding it in setTimeout

stage-projection-kit
  owns StageKit loadScene intent records

browser-adapter-plan-kit
  owns DOM/StageKit/localStorage effects the browser should perform

browser-adapter-readback-kit
  owns proof of what the browser actually consumed

gamehost-story-diagnostics-kit
  exposes additive window.GameHost.getState().story diagnostics

repo-local-ledger-readback-kit
  proves .agent pointers match timestamped files

central-ledger-readback-kit
  proves LuminaryLabs-Dev/LuminaryLabs points back to the repo-local state

dom-free-story-fixture-kit
  runs command/result/projection/readback rows without DOM or WebGL
```

## Implementation boundary

Do not rewrite `StageKit` first.

Do not add new scenes first.

Start with pure `src/story-authority/*` files plus `scripts/validate-story-authority.mjs`, then splice `src/game.js` as a browser adapter after fixture parity exists.
