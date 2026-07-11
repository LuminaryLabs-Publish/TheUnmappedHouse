# Known gaps: The Unmapped House

Timestamp: `2026-07-11T10-18-05-04-00`

## Plan ledger

**Goal:** keep all story, persistence, inspection, transition, callback, render-resource, teardown, and validation gaps explicit while promoting runtime-session lifecycle into an implementation-ready contract.

- [x] Preserve StoryManifest and save-admission prerequisites.
- [x] Preserve inspection-command and completion-proof prerequisites.
- [x] Preserve atomic Continue transition and first-frame prerequisites.
- [x] Add callback lease, session generation, resource retirement, renderer disposal, reset, and teardown gaps.
- [x] Define the lifecycle fixture gate.

## Story-manifest and persistence gaps

- No stable story manifest id, schema version, canonical indexes, or definition fingerprint exists.
- Nested story and render descriptors remain mutable.
- The `.v1` storage key contains an unversioned raw object.
- Parsed save data is shallow-merged without field validation.
- Unknown scenes, hotspots, clues, route entries, and malformed collection types are not reconciled safely.
- Story revision, save revision, explicit phase, state fingerprint, typed load/save results, and bounded persistence journal are absent.
- Live state and DOM mutate before storage success is known.

## Inspection and completion gaps

- Side-panel and raycast ingress still pass full hotspot descriptors into mutation.
- No command id, input sequence, expected story revision, expected stage epoch, or typed result exists.
- Caller-supplied clue grants and copy remain trusted.
- Completion is derived from global clue strings rather than canonical inspection and clue-grant receipts.
- Re-reading completed scenes can write new log rows and persistence effects without a typed no-op result.

## Continue and transition gaps

- Continue is a direct button callback with no completion-proof admission or duplicate guard.
- Story identity and route mutate before stage preparation or persistence succeeds.
- `StageKit.loadScene()` clears the live stage before replacement success.
- No detached successor group, transition id, rollback result, or durable terminal phase exists.
- Story, stage, DOM, persistence, and first rendered frame have no shared transaction identity.

## Runtime-session gaps

- No `sessionId`, monotonic session generation, or lifecycle state machine exists.
- The browser runtime cannot report `running`, `stopping`, `stopped`, `disposing`, `disposed`, or `failed`.
- Public interaction paths are not fenced by a current session generation.
- No detached session snapshot, stop result, disposal result, or lifecycle journal exists.
- Stop and dispose idempotency cannot be proven.

## Frame-loop gaps

- The recursive RAF id is not retained.
- No cancel path exists.
- No running/disposed check prevents queued callbacks from rendering or recursing.
- No stale-generation rejection exists.
- Frame ids and stage epochs are absent from render observations.

## Listener gaps

- Window resize is registered through an anonymous function.
- Canvas mousemove and click are registered through anonymous functions.
- Global keydown is registered through an anonymous function.
- Exact target/type/function/options tuples are not retained.
- Listeners cannot be deterministically removed or counted.
- Old hotspot-button closures are not fenced by session generation or story revision.

## Timeout gaps

- The 450 ms interlude timeout handle is not retained.
- The timeout has no scene id, story revision, completion proof, or session generation.
- Reset, transition, stop, and dispose cannot cancel it deterministically.
- A stale queued callback has no typed no-op path.

## Scene-resource gaps

- Scene loads have no `stageEpoch`.
- `stageGroup.clear()` detaches objects without disposing geometries or materials.
- `this.materials = []` discards tracked shader-material references before retirement.
- Hotspot materials are never included in the material list.
- Layer, prop, and hotspot resources have no inventory or ownership metadata.
- Predecessor resource retirement is not correlated to a committed successor or first visible frame.
- Preparation failure can leave a partial live stage and no rollback resource graph.

## Renderer-resource gaps

- The WebGL render target is never disposed.
- Post-plane geometry and post material are never disposed.
- The renderer is never disposed.
- The renderer canvas is never explicitly removed.
- WebGL context retirement is not requested or reported.
- Remaining resource counts cannot be observed after teardown.

## Reset gaps

- `KeyR` clears storage and calls `location.reload()`.
- No stop or disposal receipt precedes reload.
- Reset does not prove that callbacks, listeners, timeouts, resources, or context ownership were retired.
- No new session generation or first post-reset frame receipt exists.
- Lifecycle correctness depends on page destruction rather than a testable domain.

## Validation gaps

- `npm run check` performs syntax checks only.
- No StoryManifest, StorySnapshot, save-admission, migration, inspection, transition, or first-frame fixtures exist.
- No frame-loop cancellation fixture exists.
- No listener or timeout retirement fixture exists.
- No stage resource census or disposal fixture exists.
- No renderer/canvas/context teardown fixture exists.
- No reset-generation or stale-callback fixture exists.
- No browser teardown smoke exists.

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