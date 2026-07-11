# Known gaps: The Unmapped House

Timestamp: `2026-07-11T08-11-14-04-00`

## Story-manifest gaps

- The exported `scenes` array has no manifest id, schema version or content fingerprint.
- Nested scene, hotspot, clue, stage, material and post descriptors remain mutable.
- Scene ids are not checked for uniqueness.
- Hotspot ids are not checked for uniqueness within a scene.
- Granted and required clues have no canonical ownership index.
- Requirements are not checked against scene-owned grants.
- Descriptor shape, numeric bounds and canonical ordering are not validated.
- The renderer and story runtime cannot prove they consumed the same immutable definition.

## Save-envelope gaps

- The storage key ends in `.v1`, but the stored value is not a versioned envelope.
- No schema version, manifest id, manifest fingerprint, story revision or save revision is stored.
- No explicit story phase, migration version or state fingerprint is stored.
- No writer/session identity or expected-revision conflict check exists.
- Save size and collection bounds are unrestricted.

## Load-admission gaps

- Parsed data is shallow-merged over the initial object without field validation.
- Missing save, malformed JSON and incompatible data collapse into silent fallback behavior.
- Non-array `clues`, `route` or `log` values can fail later runtime operations.
- Unknown saved scene ids silently display scene zero while the invalid `state.sceneId` remains persisted.
- Unknown flags, inspected entries, clue strings and route ids are retained.
- No typed load result, reason, migration record or reconciliation report exists.

## Reconciliation and migration gaps

- The current raw object shape has no explicit migration adapter.
- Inspected hotspot ids are not checked against scene ownership.
- Global clue strings are not reconstructed from canonical inspections.
- Forged clue strings can satisfy scene requirements without a valid source inspection.
- Orphaned, unknown and cross-scene data cannot be distinguished.
- Route order is not reconciled against canonical scene order.
- Completion and interlude phase are not recomputed after load.
- A successful migration cannot be proven idempotent.

## Save-transaction gaps

- Live state and DOM mutate before localStorage write success is known.
- `saveState()` exposes no typed result and does not catch quota, security or serialization failures.
- Save revision and state fingerprint are absent.
- Concurrent tabs can overwrite each other without conflict detection.
- No persistence journal correlates before/after revisions, fingerprints and storage outcomes.

## Story-state gaps

- `flags` is persisted but has no current contract or validation.
- `clues` and `inspected` are independent mutable authority sources.
- Notebook rows are persisted as free-form strings without bounded schema validation.
- Completion is derived from global clue inclusion rather than canonical receipts.
- Interlude pending/open and terminal state are not persisted.
- The final scene has no durable terminal phase.

## Inspection-command gaps

- Both input paths still pass full hotspot descriptor objects directly into mutation.
- No canonical command id, source, input sequence, expected story revision or expected stage epoch exists.
- No typed accepted, rejected, duplicate, no-op or failed result exists.
- Caller-supplied text and clue grants remain trusted.
- Inspection authority cannot be made reliable until manifest and save admission are canonical.

## Continue and transition gaps

- Continue remains a direct button callback with no completion-proof admission.
- Story identity mutates before detached stage preparation or durable persistence succeeds.
- `StageKit.loadScene()` clears the live stage before replacement success.
- Story, stage, DOM, save and first rendered frame have no shared transaction id.
- No rollback result exists.

## Render and lifecycle gaps

- StageKit consumes mutable descriptors directly.
- Scene render preparation has no manifest fingerprint or scene-definition fingerprint.
- Hotspot meshes have no committed stage epoch.
- `stageGroup.clear()` detaches objects without disposing geometry or materials.
- RAF ids and listeners are not centrally owned or retired.
- No idempotent runtime or `StageKit.dispose()` exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No manifest uniqueness, clue-ownership or definition-fingerprint fixture exists.
- No snapshot schema or state-fingerprint fixture exists.
- No malformed-save, incompatible-version, migration or reconciliation fixture exists.
- No storage-failure or concurrent-save conflict fixture exists.
- Inspection, transition, render-correlation and lifecycle fixtures remain absent.

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
