# Architecture audit: story command adapter readback DSK map

Timestamp: `2026-07-10T02-19-14-04-00`

## System shape

```txt
index.html
  -> src/game.js
      -> StageKit
      -> story-data scenes
      -> localStorage
      -> DOM projection
```

`src/game.js` is currently both domain source consumer and browser effect adapter.

## DSK/domain map

| Domain | Current owner | Current behavior | Gap |
| --- | --- | --- | --- |
| Story source | `src/story-data.js` | Defines game title, scenes, hotspots, grants, requirements, interludes, camera, stage, post settings | No manifest or fingerprint |
| Story state | `src/game.js` | Holds scene id, clues, inspected map, log, text | No source-owned snapshot |
| Command authority | `src/game.js` | `inspectHotspot`, `nextScene`, reset key | No typed command envelope/result |
| Completion policy | `src/game.js` | Checks `requiresToComplete` against clues | Completion is side-effect driven |
| Save policy | `src/game.js` | Writes shallow state to localStorage | No save intent record |
| Interlude policy | `src/game.js` | Mutates overlay DOM | No interlude intent/readback row |
| Terminal route | `src/game.js` | Writes prototype-complete copy directly | No terminal result row |
| Stage scene consumption | `src/stage-kit.js` | Consumes scene descriptors into Three meshes and post pass | No load-consumption readback |
| Hotspot picking | `src/stage-kit.js` | Raycast callback to `inspectHotspot` | No serializable click/readback row |
| Browser adapter | `src/game.js` | Mutates DOM, StageKit, save state, debug JSON | Not separated from source authority |
| Central ledger | `.agent` and central repo | Tracks audit state | Needs current timestamp sync |

## Required source boundary

```txt
StoryCommandEnvelope
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryProjectionRecord
  -> SaveIntentRecord
  -> InterludeIntentRecord
  -> StageLoadIntentRecord
  -> TerminalRouteIntentRecord
  -> BrowserAdapterReadback
```

## Suggested modules

```txt
src/story-authority/source-manifest.js
src/story-authority/source-fingerprint.js
src/story-authority/state-snapshot.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/projections.js
src/story-authority/replay.js
src/story-authority/browser-adapter-plan.js
scripts/validate-story-authority.mjs
```

## Do not move first

- New rooms.
- Inventory.
- Audio.
- Renderer extraction.
- `StageKit` rewrite.
- Browser-only smoke gates.

The fixture should prove source authority before browser or visual expansion.
