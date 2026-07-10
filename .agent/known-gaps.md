# Known gaps: The Unmapped House

Timestamp: `2026-07-10T15-58-47-04-00`

## Source and state gaps

- `src/story-data.js` has no manifest, schema version, source id, fingerprint, or detached source snapshot.
- Commands consume live descriptor objects rather than stable scene/hotspot ids.
- State has no stable id, detached snapshot, completed-scene ledger, lifecycle phase, pending-effect ledger, or terminal field.
- `flags` exists in state but has no current policy or documented consumer.
- Source ids in saved state are not validated against the current descriptors.

## Lifecycle-authority gaps

- `src/game.js` owns bootstrap, policy, mutation, timer scheduling, effects, persistence, StageKit calls, projection, reset, and diagnostics together.
- The visible lifecycle is implicit across clue state, a timer callback, DOM classes, and button visibility.
- No explicit `exploring`, `completion_pending`, `interlude_open`, `advancing`, or `terminal` state exists.
- Continue has no source-owned preflight; eligibility is implied by the visible interlude.
- Terminal completion is direct DOM copy and is not stored in state or persistence.
- Reset has no retained command/result/readback before reload.
- Deterministic replay is unavailable outside the browser.

## Command and correlation gaps

- No input, command, preflight, result, transition, transaction, effect, readback, state, save, stage, or correlation ids exist.
- Accepted, rejected, accepted-no-mutation, and effect-only outcomes are not typed.
- Side-panel and raycast origins are discarded before story mutation.
- Raycast misses disappear without an observation.
- Repeat inspection performs reread/log/UI/save work without an explicit `already_inspected` result.
- No stable reasons exist for scene mismatch, unknown hotspot, incomplete scene, closed interlude, stale state, source mismatch, or terminal repetition.

## Browser-effect gaps

- DOM projection is not described as serializable effect data.
- Interlude scheduling uses an anonymous timer with no idempotency key, handle registry, cancellation, or readback.
- Interlude open/close state exists only in DOM class/ARIA mutations.
- Stage load, save write, save clear, terminal projection, and reload are inline effects with no acknowledgement.
- Duplicate, skipped, failed, and replayed effects cannot be distinguished.
- Aggregate debug JSON cannot prove causal order or effect completion.

## Save-system gaps

- The key includes `v1`, but the payload has no internal schema version.
- Save data has no source id or source fingerprint.
- State is shallow-merged without nested type or id validation.
- An unknown saved scene can fall back visually while leaving `state.sceneId` unreconciled.
- Saved clues, route ids, inspected scene ids, and hotspot ids are not source-validated.
- Route order and uniqueness are not validated.
- Interlude pending/open and terminal state cannot round-trip because they are not part of state.
- Load, repair, rejection, write, clear, and failure observations do not exist.

## Render and StageKit gaps

- `StageKit.loadScene()` emits no detached scene-load observation.
- Layer, prop, hotspot, material, camera, fog, post, viewport, and render-target consumption cannot be fixture-read.
- `stageGroup.clear()` detaches old scene objects without geometry/material disposal calls.
- Prior material references are replaced before disposal status can be observed.
- The constructor starts a permanent animation loop and browser listeners with no `dispose()` contract.
- Hover and click picking are callback/DOM-only and preserve no input or pick rows.
- Diagnostics would otherwise require exposing live Three.js objects.

## Validation gaps

- `npm run check` performs syntax checks only.
- No DOM-free source/state/command/lifecycle fixture exists.
- No exactly-once effect journal fixture exists.
- No side-panel versus raycast parity fixture exists.
- No save reconciliation or failure-injection fixture exists.
- No terminal round-trip fixture exists.
- No StageKit load/pick/resource-disposal fixture exists.
- No replay equality or JSON-safe diagnostics fixture exists.
- No browser smoke automation exists.

## Deferred work

```txt
new story rooms
additional branches
inventory
audio
renderer replacement
StageKit rewrite
new shader work
camera retuning
visual polish
```