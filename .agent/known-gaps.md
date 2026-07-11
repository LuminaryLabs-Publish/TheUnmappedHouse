# Known gaps: The Unmapped House

Timestamp: `2026-07-11T00-00-26-04-00`

## Persistence capability gaps

- Storage availability is not admitted before runtime construction.
- `loadState()` collapses invalid JSON, read denial and other access errors into one silent fresh-state fallback.
- `saveState()` calls `localStorage.setItem()` without catch, result or reason.
- Reset calls `localStorage.removeItem()` without catch, result or reason.
- There is no explicit ephemeral-versus-fatal policy when persistence is unavailable.

## Durable commit gaps

- The save has no revision or state fingerprint.
- Callers cannot know which story snapshot was durably committed.
- Story mutation, timer scheduling and DOM projection occur before inspection writes.
- Story mutation, StageKit replacement and DOM projection occur before Continue writes.
- A failed write can leave the visible story ahead of the durable save.
- A failed final inspection write can still open the delayed interlude.
- A failed Continue write can show the next scene until reload returns to the previous scene.
- No pending transition envelope supports interrupted scene-change recovery.
- No compare-and-set or expected-revision rule rejects stale writes.

## Save-envelope gaps

- The save has no schema version, story manifest id or source fingerprint.
- Parsed JSON is shallow-merged over the initial object.
- Field types, scene ids, hotspot ids, clue ids, route rows and log rows are not validated.
- Unknown or stale source identities are not reconciled.
- Corrupt arrays can make normal runtime operations throw.
- `flags` is persisted but has no current owner or contract.
- No saved-at metadata, command id, transaction id or persistence attempt id exists.

## Story-phase and resume gaps

- No explicit story phase exists.
- Completion is saved separately from delayed interlude projection.
- Interlude pending/open state is DOM-only and is lost on reload.
- The 450 ms timer id, target scene, command id and readiness deadline are not retained.
- Reloading a completed scene can hide progression permanently.
- The terminal route is DOM-only and is not persisted.

## Completion-authority gaps

- Completion trusts one global clue-string array.
- Persisted clues from another scene can satisfy current-scene requirements.
- There is no scene-scoped completion proof.
- Evidence has no source identity or save revision.

## Interaction-command gaps

- Side-panel and raycast paths pass live descriptor objects directly to mutation logic.
- No canonical Inspect, Continue or Reset command exists.
- Input origin, request id, expected phase, expected scene and expected save revision are absent.
- Unknown, stale, duplicate and wrong-phase requests have no typed rejection contract.
- Accepted results do not prove persistence success.

## Story-stage transaction gaps

- `nextScene()` mutates story state before stage loading and persistence succeed.
- Interlude visibility is cleared before commit success is known.
- No detached next-story snapshot exists.
- No StageKit prepare/commit/discard boundary exists.
- No transaction correlates story scene, save revision, stage commit and stage epoch.
- A stage or final-save failure can leave story, storage and rendering divergent.

## Boot and lifecycle gaps

- StageKit starts RAF in its constructor.
- RAF ids are not retained or cancellable.
- Window, canvas and keyboard listeners have no centralized teardown.
- The initial save occurs after WebGL resources, listeners and RAF are acquired.
- A boot write failure has no reverse-order cleanup stack.
- StageKit has no idempotent `dispose()` method.
- Retired scene geometries, materials and hotspot resources are not disposed.

## Diagnostics gaps

- Debug JSON exposes aggregate mutable story state only.
- Persistence capability, mode, attempt, result and save revision are unavailable.
- Pending transaction and recovery state are unavailable.
- No command-to-persistence-to-stage correlation exists.
- No bounded JSON-safe effect journal exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No injected storage adapter exists.
- No read-denial, write-denial, quota, stale-revision or clear-failure fixture exists.
- No inspection write-failure fixture exists.
- No pending/final transition recovery fixture exists.
- No boot rollback or remount fixture exists.
- No browser smoke exercises storage denial or interrupted persistence.
- Existing story source, phase, stage commit, resource and disposal fixtures remain absent.

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