# Architecture Audit: Story Command Fixture Proof DSK Map

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Current architecture

```txt
index.html
  -> src/game.js
  -> src/story-data.js
  -> src/stage-kit.js
  -> src/aspect-frame.js
```

## Domain map

| Domain | Current owner | Status |
| --- | --- | --- |
| Static browser shell | `index.html` | stable |
| Fixed 16:9 frame | `src/aspect-frame.js` | stable |
| Story source descriptors | `src/story-data.js` | stable source data |
| Browser story runtime | `src/game.js` | bottleneck |
| Story state | `src/game.js` | browser-bound |
| Save state | `src/game.js` + `localStorage` | browser-bound |
| Clue ledger | `src/game.js` | browser-bound |
| Inspection ledger | `src/game.js` | browser-bound |
| Completion policy | `src/game.js` | browser-bound |
| Interlude policy | `src/game.js` | browser-bound |
| Terminal route policy | `src/game.js` | browser-bound |
| Stage renderer | `src/stage-kit.js` | stable, lacks readback rows |
| Scene descriptor consumption | `src/stage-kit.js` | stable, lacks fixture rows |
| Hotspot volume/picking | `src/stage-kit.js` | callback-only |
| Debug projection | `src/game.js` | ad hoc JSON |

## Current kit services

```txt
static-page-shell-kit
  -> mounts app, stage, story panel, hotspot list, debug, hover label, interlude, continue button

aspect-frame-kit
  -> computes and applies canonical 1920x1080 frame

story-data-kit
  -> exports gameTitle and scenes with stage/hotspot/post/interlude descriptors

browser-story-runtime-kit
  -> load/save, inspect, clue grants, logs, completion, interlude, continue, terminal, reset, UI projection

stage-render-kit
  -> WebGL renderer, scene, camera, lights, fog, render target, post-process, animation

hotspot-picking-kit
  -> raycast hover/click callback into browser story runtime
```

## Next DSK boundary

```txt
StorySourceManifest
  -> StorySourceFingerprint
  -> StoryStateSnapshot
  -> StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryProjectionRecord
  -> SaveIntentRecord
  -> InterludeIntentRecord
  -> StageLoadIntentRecord
  -> TerminalRouteIntentRecord
  -> BrowserAdapterPlan
  -> BrowserAdapterReadback
  -> DOMFreeStoryFixture
```

## Main architecture finding

`StageKit` should not be rewritten yet.

The architecture needs a pure story authority layer first. Once command results and adapter plans exist, `src/game.js` can become a thinner browser adapter that consumes source-owned records and exposes readback.

## Defer

```txt
new scenes
new rooms
inventory
audio
renderer extraction
visual polish
StageKit rewrite
```
