# Known gaps: The Unmapped House

Timestamp: `2026-07-11T04-00-07-04-00`

## Story-phase gaps

- No explicit story phase is persisted.
- Completion, interlude pending, interlude open, transitioning and terminal states are split across clues, a timer, mutable variables and DOM classes.
- A completed scene can reload with every hotspot inspected but no visible or scheduled interlude.
- The final scene has no persisted terminal state.

## Continue-command gaps

- Continue is a direct button callback, not a canonical command.
- `nextScene()` does not require completion, `interlude_open`, expected story revision or expected stage epoch.
- Hidden, repeated or stale activations have no typed admission result.
- No request id or transition id exists.

## Transition-atomicity gaps

- `currentScene`, `state.sceneId`, route and log mutate before stage preparation or durable save succeeds.
- The interlude closes before the next stage is known to be buildable.
- DOM, persistence and stage replacement are separate direct effects rather than one commit protocol.
- A stage failure can leave in-memory story state ahead of the durable save.
- A storage failure can leave the visible stage ahead of the reload state.
- No rollback snapshot or deterministic recovery result exists.

## Stage-preparation gaps

- `StageKit.loadScene()` clears the live committed group before validating or preparing the replacement.
- Geometry, materials and hotspot meshes are allocated directly into live stage state.
- No detached build group, build plan, preparation result or discard operation exists.
- Scene descriptor errors can leave a blank or partially built stage.
- Camera, fog and post-process state mutate as part of the same unguarded operation.

## Commit and first-frame gaps

- No stage commit id or stage epoch exists.
- No result correlates story revision, save revision, stage identity, DOM projection and rendered frame.
- A successful `loadScene()` does not prove the next frame rendered the new stage.
- Prior resources cannot be safely retired based on first-frame acknowledgement.
- No timeout or failure policy exists for an unacknowledged commit.

## Resource-lifecycle gaps

- `stageGroup.clear()` detaches prior objects without disposing geometry or materials.
- Resetting `materials` and `hotspots` drops useful release references.
- Hotspot box geometries and invisible materials are not explicitly disposed.
- RAF ids are not retained or cancellable.
- Resize, pointer, click and keyboard listeners lack centralized teardown.
- No idempotent `StageKit.dispose()` or runtime disposal exists.

## Persistence gaps

- The save has no schema version, story manifest id or source fingerprint.
- Parsed data is shallow-merged without field validation.
- Save revisions, state fingerprints and expected-revision checks are absent.
- Read denial, invalid JSON, write denial, quota failure and clear failure are not distinguished.
- No pending transition envelope or recovery protocol exists.

## Projection gaps

- Interlude visibility and terminal state remain DOM-only.
- Scene opening copy can remain stale because `renderUi()` only installs opening text when text is empty or equals `Loading`.
- Debug JSON has no phase, command, transition, save, stage or frame correlation rows.

## Validation gaps

- `npm run check` performs syntax checks only.
- No stage preparation or descriptor-failure fixture exists.
- No persistence-failure discard fixture exists.
- No atomic transition rollback fixture exists.
- No first-frame acknowledgement fixture exists.
- No prior-stage resource-retirement fixture exists.
- No browser fault-injection smoke exists.

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