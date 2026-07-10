# Next steps: The Unmapped House

Timestamp: `2026-07-10T15-58-47-04-00`

## Next safe ledge

```txt
TheUnmappedHouse Story Lifecycle Transaction Ledger + StageKit Resource Observation Fixture Gate
```

## Goal

Separate pure story lifecycle authority from browser, storage, and render effects so every inspect, continue, and reset input produces a deterministic command/result/transaction, every external effect is exactly-once and acknowledged, save data is reconciled against the current story source, and StageKit reports detached load/pick/resource observations without changing the visible route.

## Plan ledger

### Source and state

- [ ] Add a stable source manifest for three scenes, nine hotspots, nine clues, route order, and descriptor schema.
- [ ] Add a deterministic source fingerprint.
- [ ] Move initial state construction into a DOM-free module.
- [ ] Add detached state ids/snapshots.
- [ ] Add explicit lifecycle values: `booting`, `exploring`, `completion_pending`, `interlude_open`, `advancing`, `terminal`, and `resetting`.
- [ ] Persist completed-scene ids, terminal state, and pending effects.

### Commands and transitions

- [ ] Define input records for side-panel, stage raycast, continue button, and keyboard reset origins.
- [ ] Convert live descriptor inputs to stable `sceneId` and `hotspotId` command payloads.
- [ ] Add deterministic preflight and stable reason codes.
- [ ] Return typed accepted-mutation, accepted-no-mutation, rejected, and effect-only results.
- [ ] Emit detached before/after state snapshots.
- [ ] Emit transitions for inspection, clue grant, log, completion, lifecycle, scene, route, terminal, and reset changes.
- [ ] Group command, result, transitions, and effects into one lifecycle transaction.

### Exactly-once effects

- [ ] Describe DOM, timer, StageKit, storage, and reload operations as effect intents.
- [ ] Assign stable effect ids and idempotency keys.
- [ ] Add browser effect readbacks with `applied`, `skipped`, or `failed` status.
- [ ] Ensure one scene-completion transaction schedules at most one interlude timer.
- [ ] Retain timer handles and support cancellation/readback during reset or disposal.
- [ ] Commit `interlude_open` only after the open effect is acknowledged.
- [ ] Commit scene advance only after required stage/projection/save effects are acknowledged.
- [ ] Enter and persist `terminal` before projecting terminal copy.

### Save reconciliation

- [ ] Add a payload schema version, source id, and source fingerprint.
- [ ] Replace shallow merge with nested validation and reconciliation.
- [ ] Validate scene, hotspot, clue, route, lifecycle, and terminal fields against the source manifest.
- [ ] Add load, write, clear, repair, reject, and failure observations.
- [ ] Preserve the existing v1 key behind a compatibility adapter until migration fixtures pass.

### StageKit observations and lifetime

- [ ] Return a JSON-safe `StageLoadObservation` from `loadScene()`.
- [ ] Return a JSON-safe `StagePickObservation` for hit and miss paths.
- [ ] Add bounded frame/viewport/camera/material/hotspot readback.
- [ ] Dispose detached scene geometries and materials before rebuilding.
- [ ] Add resource-disposal counts.
- [ ] Add `dispose()` to stop the frame loop and remove browser listeners.
- [ ] Keep camera, fog, shaders, post settings, hotspot volumes, and visible rendering unchanged.

### Browser adapter and diagnostics

- [ ] Convert `src/game.js` into a consumer of pure lifecycle transactions and effect intents.
- [ ] Preserve current copy, button behavior, 450 ms pacing, route order, and reset UX.
- [ ] Expose bounded JSON-safe `GameHost` diagnostics.
- [ ] Do not expose DOM nodes, timers, localStorage, or Three.js objects.

### Validation

- [ ] Add `scripts/validate-story-lifecycle.mjs`.
- [ ] Add `scripts/validate-save-reconciliation.mjs`.
- [ ] Add `scripts/validate-stage-observations.mjs`.
- [ ] Wire fixtures into `npm run check` after syntax validation.
- [ ] Prove side-panel/raycast result parity.
- [ ] Prove single completion/interlude effect.
- [ ] Prove next-scene and terminal transitions.
- [ ] Prove save repair and terminal round-trip.
- [ ] Prove StageKit load/pick/resource observations.
- [ ] Prove replay equality and JSON-safe diagnostics.

## First implementation slice

```txt
source manifest + fingerprint
  -> pure initial state with lifecycle=exploring
  -> inspect command by sceneId/hotspotId
  -> preflight
  -> typed result
  -> transitions
  -> lifecycle transaction
  -> projection/save effect intents
  -> fake effect readbacks
```

Prove:

```txt
inspect accepted
inspect repeat -> accepted_no_mutation/already_inspected
inspect unknown -> rejected/unknown_hotspot
inspect scene mismatch -> rejected/scene_mismatch
third required clue -> one scene_completed transition + one schedule_interlude intent
```

## Second implementation slice

```txt
timer acknowledgement
  -> interlude_open lifecycle
  -> continue preflight
  -> next scene transaction
  -> terminal transaction
```

## Third implementation slice

Adapt localStorage, DOM, and StageKit as effect consumers and add resource observations/disposal.

## Validation target

```txt
npm run check
```

## Do not do first

```txt
new rooms
inventory
audio
renderer replacement
StageKit rewrite
new shaders
camera retuning
visual polish
```