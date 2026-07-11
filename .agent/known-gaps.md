# Known gaps: The Unmapped House

Timestamp: `2026-07-10T22-21-17-04-00`

## Save-envelope gaps

- The save has no schema version, story manifest id or source fingerprint.
- `loadState()` shallow-merges arbitrary parsed JSON over the initial object.
- Field types, scene ids, hotspot ids, clue ids, route rows and log rows are not validated.
- Unknown or stale source identities are not reconciled.
- Corrupt `clues`, `route` or `log` values can make normal array operations throw.
- `flags` is persisted but has no current owner or contract.

## Story-phase and resume gaps

- No explicit story phase exists.
- Completion is saved before the delayed interlude is projected.
- Interlude pending/open state is DOM-only and is lost on reload.
- The 450 ms timer id, target scene, command id and readiness deadline are not retained.
- Reloading a completed scene hides the interlude permanently.
- Re-inspecting an already-seen final hotspot does not reschedule the interlude.
- The terminal route is DOM-only and is not persisted.

## Completion-authority gaps

- Completion trusts one global clue-string array.
- Persisted clues from another scene can satisfy the current scene requirements.
- There is no scene-scoped completion proof.
- There is no source identity attached to clue or inspection evidence.
- Completion has no command, result, event or state-fingerprint record.

## Interaction-command gaps

- Side-panel and raycast inspection paths pass descriptor objects directly to mutation logic.
- No canonical `InspectHotspot` command exists.
- Continue has no phase, scene, request, source or expected-state identity.
- Continue returns no accepted, rejected, failed or no-op result.
- Wrong-phase, stale and duplicate Continue requests are not rejected by contract.
- No command/result/event journal exists.

## Story-transition gaps

- `nextScene()` mutates current story state before stage loading succeeds.
- Interlude visibility is cleared before stage success is known.
- Story save occurs only after direct StageKit mutation.
- No previous/next state fingerprints exist.
- No transaction correlates story scene id, stage scene id, stage epoch and save revision.
- A stage failure can leave in-memory story state and rendered stage identity divergent.
- Repeated final Continue clicks have no terminal result identity.

## Render-host companion gaps

- `StageKit.loadScene()` clears the committed group before replacement preparation.
- Old scene geometries and materials are detached but not disposed.
- Hotspot materials are not tracked in the material list.
- No scene-local resource ledger exists.
- No stage epoch or typed stage-commit result exists.
- RAF and event listeners have no idempotent host teardown boundary.

## Diagnostics gaps

- Debug JSON exposes aggregate mutable story state only.
- No story phase, source fingerprint or state fingerprint is exposed.
- Pending interlude readiness and terminal state are unavailable.
- No story transition to stage commit correlation exists.
- No bounded JSON-safe command/result/event journal exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No story-source schema fixture exists.
- No save validation or reconciliation fixture exists.
- No reload-during-interlude fixture exists.
- No duplicate/wrong-phase Continue fixture exists.
- No terminal-state reload fixture exists.
- No story-stage transaction failure fixture exists.
- No browser smoke reloads each story phase.
- Existing stage build, resource, epoch and host-disposal fixtures remain absent.

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
