# Architecture audit: Story Command Adapter Readback DSK Map

Timestamp: `2026-07-10T13-01-11-04-00`

## Current architecture

```txt
index.html
  -> fixed 16:9 DOM shell
  -> src/game.js browser story runtime
  -> src/stage-kit.js Three.js descriptor renderer
  -> src/story-data.js scene/hotspot source descriptors
```

## DSK map

```txt
story-data-kit
  owns title, scenes, hotspots, grants, requirements, interludes, camera, stage, post descriptors

browser-story-runtime-kit
  owns source command interpretation, state mutation, save writes, route progression, DOM projection, reset, debug JSON

stage-render-kit
  owns Three.js renderer, camera, material shaders, descriptor loading, hotspot volumes, pick callback, hover label, post pass

aspect-frame-kit
  owns fixed 16:9 layout and scale math

next story-authority kits
  own source manifest, command envelope, preflight, results, projection rows, adapter rows, and replay

next readback kits
  own stage-load readback, pick readback, browser adapter readback, and GameHost story diagnostics
```

## Main architectural problem

`src/game.js` is both the story authority and the browser adapter.

It decides what a command means, mutates state, writes localStorage, schedules interludes, changes routes, loads StageKit scenes, writes DOM, handles terminal copy, and projects debug JSON.

## Required architecture split

```txt
source-owned story authority
  -> accepts StoryCommandEnvelope
  -> returns StoryCommandResult + StoryProjectionRecord + adapter intents

browser adapter
  -> consumes projection/save/interlude/stage-load/terminal intents
  -> writes DOM/localStorage/StageKit only after result rows exist

StageKit adapter
  -> consumes StageLoadIntentRecord
  -> returns StageLoadReadback and StagePickReadback rows
```

## Do not do first

```txt
new story content
inventory
audio
renderer extraction
StageKit rewrite
visual polish
```
