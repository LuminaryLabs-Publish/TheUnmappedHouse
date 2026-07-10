# Story authority audit: browser adapter command result contract

Timestamp: `2026-07-10T00-51-03-04-00`

## Problem statement

The browser module currently acts as both source authority and adapter.

```txt
src/game.js
  -> parses browser interaction
  -> mutates source state
  -> grants clues
  -> computes completion
  -> schedules interlude
  -> mutates DOM
  -> writes save state
  -> loads StageKit scenes
  -> emits debug JSON
```

This prevents deterministic story validation outside the browser.

## Contract to add next

```txt
StoryCommandEnvelope
  id
  type
  source
  sceneId
  hotspotId optional
  createdAtFrame or fixture step

StoryPreflight
  status
  reason
  sceneId
  hotspotId
  knownScene
  knownHotspot
  alreadyInspected
  sceneCompleteBefore

StoryCommandResult
  id
  commandId
  status: accepted | rejected | no_mutation
  reason
  beforeSnapshot
  afterSnapshot
  events
  projections

StoryProjectionRecord
  text
  logEntry
  sidebarState
  debugState
  saveIntent
  interludeIntent
  stageLoadIntent
  terminalIntent

BrowserAdapterReadback
  commandId
  resultId
  projectionIdsConsumed
  saveWritten
  stageLoadApplied
  interludeApplied
  terminalApplied
```

## Compatibility requirements

- Preserve current `SAVE_KEY` compatibility.
- Preserve current visible copy and scene order.
- Preserve StageKit scene descriptors.
- Preserve existing side-panel and canvas hotspot click behavior.
- Preserve existing debug JSON fields while adding stable ids/readback if implemented.

## First source files

```txt
src/story-authority/source-manifest.js
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

## Fixture gate

```txt
node scripts/validate-story-authority.mjs
npm run check
```

## Main finding

The safe next implementation is an additive source-authority seam. `src/game.js` should become a browser consumer after DOM-free command/result rows are proven.
