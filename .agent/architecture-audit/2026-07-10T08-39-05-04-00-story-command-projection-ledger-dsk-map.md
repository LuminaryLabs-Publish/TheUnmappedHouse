# Architecture audit: story command projection ledger DSK map

Timestamp: `2026-07-10T08-39-05-04-00`

## Current DSK shape

`TheUnmappedHouse` already has clear descriptor and renderer seams, but the story authority seam is still browser-bound.

```txt
index.html
  -> DOM shell and fixed frame
  -> src/game.js browser-story-runtime-kit
  -> src/story-data.js story-data-kit
  -> src/stage-kit.js stage-render-kit
  -> Three.js CDN runtime
```

## Domain map

```txt
static-browser-shell
  owns: index.html app frame, story panel, interlude, hover label, debug node
  consumers: browser-story-runtime-kit, stage-render-kit

fixed-aspect-frame
  owns: DESIGN_WIDTH, DESIGN_HEIGHT, DESIGN_ASPECT, computeAspectFrame, applyAspectFrame
  consumers: stage-render-kit

story-source-descriptor
  owns: gameTitle, scenes, hotspots, grants, requirements, interludes, stage descriptors, post descriptors
  consumers: browser-story-runtime-kit, stage-render-kit

browser-story-runtime
  owns today: command dispatch, mutation, route progression, save writes, UI projection, reset, debug JSON
  should consume next: source-owned command result and projection ledger rows

stage-render-host
  owns: Three renderer, camera, lights, shader materials, scene group, post target, resize loop, RAF render loop
  should expose next: stage-load/readback rows tied to story result ids

hotspot-input
  owns today: StageKit raycast hit callback and side-panel button callbacks
  should emit next: command envelopes with source scene/hotspot ids and stable reason outcomes

story-command-projection-next
  should own: command envelopes, preflight, results, projection records, save/interlude/terminal/stage intents, adapter rows

central-ledger-sync
  owns: repo-level tracking in LuminaryLabs-Dev/LuminaryLabs
```

## DSK inventory

Current DSKs:

```txt
static-page-shell-kit
aspect-frame-kit
story-data-kit
browser-story-runtime-kit
stage-render-kit
scene-descriptor-consumer-kit
anime-material-kit
post-process-kit
hotspot-volume-kit
hotspot-picking-kit
localstorage-save-kit
notebook-log-kit
debug-json-projection-kit
repo-local-agent-ledger-kit
central-ledger-sync-kit
```

Next DSKs:

```txt
story-source-manifest-kit
story-source-fingerprint-kit
story-source-snapshot-kit
story-command-envelope-kit
story-preflight-kit
story-command-result-kit
story-projection-ledger-kit
save-intent-record-kit
interlude-intent-record-kit
terminal-route-result-kit
stage-load-intent-kit
browser-adapter-plan-kit
story-adapter-ledger-kit
browser-adapter-readback-kit
gamehost-story-diagnostics-kit
dom-free-story-fixture-kit
```

## Architecture finding

`src/game.js` is still both the source-authority runtime and the browser adapter. That makes accepted, rejected, repeated, completed, continue, terminal, save, interlude, projection, and stage-load outcomes observable only by browser side effects.

The architecture should first add a DOM-free source authority layer that returns records. Then `src/game.js` can stay as the browser adapter and consume those records without changing visible behavior.

## Safe next cut

```txt
story-data.js descriptors
  -> source manifest/fingerprint
  -> command envelope
  -> preflight
  -> command result
  -> projection/save/interlude/stage-load intents
  -> adapter ledger row
  -> browser adapter consumption
  -> GameHost readback
```
