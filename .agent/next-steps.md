# Next steps: The Unmapped House

Timestamp: `2026-07-10T14-28-47-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Command Correlation Ledger Refresh + StageKit Observation Fixture Gate
```

## Goal

Add a DOM-free story authority and correlation ledger that preserves the current visible route while making every inspect, continue, and reset action traceable through source validation, result, transition, browser effect, save observation, StageKit observation, and JSON-safe diagnostics.

## Implementation checklist

- [ ] Add a source manifest and stable fingerprint for `src/story-data.js`.
- [ ] Add independently constructible initial state and detached state snapshots.
- [ ] Define inspect, continue, and reset command envelopes using source ids.
- [ ] Add deterministic preflight and stable reason codes.
- [ ] Return typed accepted, no-mutation, and rejected results.
- [ ] Add transition rows for inspection, clue grant, log, completion, scene, and route changes.
- [ ] Describe DOM, interlude, terminal, save, and stage operations as effect intents.
- [ ] Record effect readbacks with command/result correlation.
- [ ] Add StageKit load and pick observation methods without rewriting the renderer.
- [ ] Add source-versioned save envelopes and storage-adapter observations.
- [ ] Convert `src/game.js` into a consumer of source-owned results and effect intents.
- [ ] Expose additive JSON-safe `GameHost` story diagnostics.
- [ ] Add a DOM-free fixture and wire it into package validation.
- [ ] Preserve all current scene copy, hotspot behavior, camera framing, shaders, and post settings.

## Suggested files

```txt
src/story-authority/source-manifest.js
src/story-authority/source-fingerprint.js
src/story-authority/state.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/transitions.js
src/story-authority/correlation.js
src/story-authority/effects.js
src/story-authority/replay.js
src/story-authority/diagnostics.js
src/story-authority/save-envelope.js
src/story-authority/storage-adapter.js
scripts/validate-story-correlation.mjs
```

## Required records

```txt
StorySourceManifest
StorySourceFingerprint
StoryStateSnapshot
StoryInputRecord
StoryCommandEnvelope
StoryPreflightRecord
StoryCommandResult
StoryTransitionRecord
StoryEffectIntent
StoryEffectReadback
StoryProjectionRecord
SaveEnvelope
SaveLoadObservation
SaveWriteObservation
StageLoadObservation
StagePickObservation
StoryReplayRow
StoryCommandCorrelationRow
GameHostStoryDiagnostics
```

## First implementation slice

Start with a pure inspect command path:

```txt
source manifest
  -> initial state
  -> inspect command by sceneId/hotspotId
  -> preflight
  -> typed result
  -> transitions
  -> projection/save intents
  -> correlation row
```

Prove these four cases first:

```txt
inspect accepted
inspect repeat -> no_mutation/already_inspected
inspect unknown -> rejected/unknown_hotspot
inspect scene mismatch -> rejected/scene_mismatch
```

## Second implementation slice

Add continue and terminal routing:

```txt
continue incomplete -> rejected/scene_incomplete
continue completed -> accepted + route transition + stage-load intent
continue final -> accepted + terminal-route intent
```

## Third implementation slice

Adapt the browser and StageKit:

- Keep existing DOM structure and visible copy.
- Wrap StageKit load and pick operations with additive observations.
- Record side-panel and raycast input origin while requiring equivalent story results.
- Add save and interlude readbacks.
- Publish a bounded command/correlation journal.

## Validation target

```txt
node scripts/validate-story-correlation.mjs
npm run check
```

## Do not do first

```txt
new story rooms
inventory
audio
renderer extraction
StageKit rewrite
new shader work
visual polish
```
