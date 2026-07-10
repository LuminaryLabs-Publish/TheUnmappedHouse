# Story authority audit: Command Correlation Record Contract

Timestamp: `2026-07-10T14-28-47-04-00`

## Problem statement

`src/story-data.js` is the content source, but `src/game.js` interprets source objects and performs mutation plus browser effects directly. The runtime therefore has no source-owned, DOM-free authority record proving why a command was accepted, rejected, or treated as no mutation.

## Required authority records

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
StoryStateSnapshot
StoryInputRecord
StoryCommandEnvelope
StoryPreflightRecord
StoryCommandResult
StoryTransitionRecord
StoryEffectIntent
StoryEffectReadback
StoryProjectionRecord
StoryReplayRow
StoryCommandCorrelationRow
GameHostStoryDiagnostics
```

## Source manifest

The manifest should identify the authored source without serializing live objects:

```js
{
  sourceId: "the-unmapped-house.story.v1",
  schemaVersion: 1,
  gameTitle,
  sceneIds,
  hotspotIdsByScene,
  requiredCluesByScene,
  fingerprint
}
```

## Correlation row

```js
{
  correlationId,
  inputId,
  commandId,
  preflightId,
  resultId,
  beforeStateId,
  afterStateId,
  transitionIds,
  effectIntentIds,
  effectReadbackIds,
  projectionId,
  saveObservationId,
  stageObservationIds,
  sourceFingerprint
}
```

## Authority rules

- Commands use source ids, not live descriptor object identity.
- Source validation happens before mutation.
- Every command produces one deterministic result.
- Rejected commands produce no state mutation and no external effects except diagnostics.
- `no_mutation` commands may request reread copy/log projection, but must not re-grant clues or re-trigger completion.
- Completion is emitted only on the transition from incomplete to complete.
- Continue is accepted only when the current scene is complete.
- Terminal progression is a typed result, not direct DOM copy.
- Browser effects are described as intents and acknowledged through readbacks.
- Replay from the same source fingerprint, initial state, and command sequence must produce equal result/state rows.

## Browser adapter boundary

`src/game.js` should eventually become a thin consumer:

```txt
capture input
  -> create source-owned command
  -> execute authority transition
  -> consume projection/save/interlude/terminal/stage intents
  -> record effect readbacks
  -> publish diagnostics
```

It should no longer decide clue grants, completion, route progression, or terminal meaning.

## GameHost diagnostics target

```js
{
  source: { sourceId, schemaVersion, fingerprint },
  state: { stateId, sceneId, clues, inspected, route, complete },
  lastInput,
  lastCommand,
  lastPreflight,
  lastResult,
  lastCorrelation,
  lastProjection,
  lastSaveObservation,
  lastStageLoadObservation,
  lastStagePickObservation,
  journal
}
```

All fields must be detached and JSON-safe.

## First proof gate

The first implementation should prove source manifest stability plus four inspect outcomes:

```txt
accepted first inspect
no_mutation repeat inspect
rejected unknown hotspot
rejected scene mismatch
```

Only then should continue, terminal, save, interlude, and StageKit observations be adapted.
