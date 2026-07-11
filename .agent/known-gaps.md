# Known gaps: The Unmapped House

Timestamp: `2026-07-11T06-21-57-04-00`

## Inspection-command gaps

- Both input paths pass full hotspot descriptor objects directly into the mutator.
- No canonical `InspectHotspotCommand` exists.
- No command id, input sequence, source, expected story revision or expected stage epoch exists.
- No typed `accepted`, `rejected`, `duplicate`, `no_op` or `failed` result exists.
- Re-read behavior is an implicit mutation path rather than an explicit no-op/read result.

## Scene and hotspot authority gaps

- `inspectHotspot()` does not prove that the supplied hotspot belongs to `currentScene`.
- The caller supplies hotspot id, label, text, log copy and clue grants.
- Side-panel callbacks capture descriptor objects instead of stable scene/hotspot ids.
- Pick meshes store full descriptor objects in `mesh.userData.hotspot`.
- No story manifest id, definition fingerprint or canonical hotspot index exists.
- No stale-scene or unknown-hotspot rejection policy exists.

## Clue and completion gaps

- Clues are global strings without owner scene, source hotspot, command id or story revision.
- Caller-supplied `grants` are trusted.
- Current-scene completion checks only global string inclusion.
- Old-scene, future-scene, orphaned or forged clue provenance is not distinguishable.
- No immutable `SceneCompletionProof` exists for Continue admission.
- Multiple near-simultaneous final inspections have no one-shot completion/interlude result.

## Dual-ingress gaps

- Side-panel and raycast requests are not normalized through one queue.
- Same-hotspot input from both surfaces is not deduplicated.
- A queued old button closure can carry an old descriptor after `currentScene` changes.
- A raycast observation has no frame id or stage epoch.
- Input source and causal ordering are absent from diagnostics.

## Story-phase gaps

- No explicit story phase is persisted.
- Completion, interlude pending, interlude open, transitioning and terminal state are split across clues, timers, mutable variables and DOM classes.
- A completed scene can reload with no visible or scheduled interlude.
- Inspections are not rejected while an interlude or transition is active.
- The final scene has no persisted terminal state.

## Continue and transition gaps

- Continue remains a direct button callback.
- `nextScene()` does not require a scene-scoped completion proof.
- Story identity mutates before detached stage preparation or durable persistence succeeds.
- `StageKit.loadScene()` clears the live stage before replacement success.
- Story, stage, DOM, save and first rendered frame have no shared transaction id.
- No rollback result exists.

## Render and stage-epoch gaps

- Hotspot meshes have no committed stage epoch.
- Pick observations have no rendered frame id.
- Hover state and hover-label state are not explicitly retired on scene replacement.
- Accepted inspection feedback is not correlated to a rendered frame.
- Old-stage observations cannot be deterministically rejected.

## Resource-lifecycle gaps

- `stageGroup.clear()` detaches objects without disposing geometry or materials.
- RAF ids are not retained or cancellable.
- Resize, pointer, click and keyboard listeners lack centralized teardown.
- No idempotent runtime or `StageKit.dispose()` exists.

## Persistence gaps

- The save has no schema version, story manifest id or source fingerprint.
- Parsed data is shallow-merged without field validation.
- Save revisions and expected-revision checks are absent.
- Existing inspection/clue data cannot be reconciled against canonical story ownership.
- Storage failures do not return typed results.

## Validation gaps

- `npm run check` performs syntax checks only.
- No story-manifest or hotspot-index fixture exists.
- No stale, forged, duplicate or cross-scene inspection fixture exists.
- No clue-provenance or scene-completion-proof fixture exists.
- No dual-ingress idempotency fixture exists.
- No hotspot-stage-epoch or committed-feedback-frame fixture exists.
- Existing transition, rollback, resource-retirement and browser fault fixtures are also absent.

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
