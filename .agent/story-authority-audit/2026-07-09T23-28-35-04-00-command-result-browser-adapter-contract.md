# Story authority audit: command result browser adapter contract

Timestamp: `2026-07-09T23-28-35-04-00`

## Authority split target

```txt
source-owned story authority
  -> validates command intent
  -> mutates pure story state
  -> returns result, projection, save, interlude, and stage-load intents

browser adapter
  -> listens to DOM and StageKit callbacks
  -> sends command envelopes to story authority
  -> consumes returned records
  -> writes DOM/localStorage/StageKit only from those records
  -> exposes readback diagnostics
```

## Current source-authority bottleneck

`src/game.js` currently owns all of the following in one browser module:

- DOM node capture.
- Save-key selection.
- Initial state creation and localStorage merge.
- Hotspot command dispatch.
- Direct story mutation.
- Clue grants.
- Log writes.
- Completion detection.
- Interlude timing.
- Scene route transition.
- StageKit scene loading.
- DOM projection.
- Debug JSON.
- Reset and reload.

## Contract requirements

A first source-owned contract should preserve visible behavior while adding:

- `StoryCommandEnvelope`
- `StoryCommandResult`
- `StoryReasonCode`
- `StoryStateSnapshot`
- `StoryProjectionRecord`
- `SaveIntentRecord`
- `InterludeIntentRecord`
- `StageLoadIntentRecord`
- `StoryReplayRow`
- `BrowserAdapterReadback`

## Compatibility constraints

- Existing `localStorage` key should continue to load safely.
- Existing scene ids and hotspot ids must remain unchanged.
- Existing DOM copy and sequence should remain unchanged.
- `StageKit.loadScene(scene)` should be called from adapter records, not direct route mutation.
- Debug JSON can be additive, but existing useful fields should not disappear.

## Fixture target

Add a DOM-free script that imports story descriptors and pure story authority modules, then asserts:

- first hotspot inspection accepted;
- repeat hotspot inspection returns `no_mutation`;
- completion schedules interlude;
- continue loads the next scene;
- final continue returns terminal route;
- replay rows include before/after snapshot ids and reason codes.
