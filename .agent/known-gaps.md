# Known gaps: The Unmapped House

Timestamp: `2026-07-11T01-38-28-04-00`

## Story-phase gaps

- No explicit story phase is persisted.
- Completion, interlude pending, interlude open, transitioning and terminal states are split across derived clues, a browser timer, mutable variables and DOM classes.
- A completed scene can reload with every hotspot inspected but no visible or scheduled interlude.
- Boot does not reconcile a completed snapshot into an interlude-ready phase.
- The final scene has no persisted terminal state.

## Interlude timer gaps

- The 450 ms timer id is not retained.
- The callback carries no target scene id, command id, save revision, deadline or runtime epoch.
- The callback closes over mutable `currentScene`.
- Timers are not cancelled during transition, reset, reload preparation or disposal.
- No stale-callback rejection exists.
- No deterministic remaining-delay recovery exists after reload.

## Continue-command gaps

- Continue is a direct button callback, not a canonical command.
- `nextScene()` does not require scene completion or `interlude_open` phase.
- Hidden, stale, duplicated or programmatic activations have no admission boundary.
- There is no request id, expected scene, expected phase or expected save revision.
- Accepted, rejected, duplicate and no-op outcomes are not represented.
- Repeated final Continue activations have no terminal idempotency contract.

## Completion-proof gaps

- Completion trusts a global clue-string array.
- Completion evidence is not scene-scoped, source-versioned or revision-bound.
- No immutable proof lists the exact required and satisfied clue ids.
- Persisted clues from incompatible source data are not reconciled.
- Already-inspected hotspot handling bypasses completion evaluation.

## Persistence gaps

- The save has no schema version, story manifest id or source fingerprint.
- Parsed data is shallow-merged without field validation.
- Save revisions, state fingerprints and expected-revision checks are absent.
- Read denial, invalid JSON, write denial, quota failure and clear failure are not distinguished.
- Story mutation, timer scheduling, DOM projection and stage replacement occur before durable success is known.
- No pending transition envelope or deterministic recovery protocol exists.

## Projection and render gaps

- Interlude visibility is DOM-only and cannot be reconstructed from authoritative state.
- Debug JSON exposes aggregate mutable story state but not phase, deadline, command result, save revision or stage identity.
- No phase revision correlates story projection, StageKit scene, rendered frame or save envelope.
- A visible stage can be ahead of the durable story revision.
- Scene opening copy can remain stale because `renderUi()` only installs opening text when the current text is empty or equals `Loading`.

## Stage and lifecycle gaps

- `StageKit.loadScene()` clears the committed group before replacement preparation succeeds.
- Retired geometries, materials and hotspot resources are not disposed.
- RAF ids are not retained or cancellable.
- Resize, pointer, click and keyboard listeners lack centralized teardown.
- No idempotent `dispose()` contract exists.
- No stage epoch or stage commit result exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No story-phase reducer fixture exists.
- No reload-during-pending or reload-during-open interlude fixture exists.
- No stale timer, duplicate timer or timer cancellation fixture exists.
- No Continue admission or idempotency fixture exists.
- No terminal reload fixture exists.
- No phase/save/stage/render correlation fixture exists.
- No browser smoke exercises completed-scene reload recovery.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
