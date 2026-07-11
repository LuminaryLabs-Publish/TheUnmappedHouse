# Known gaps: The Unmapped House

Timestamp: `2026-07-11T10-12-03-04-00`

## Plan ledger

**Goal:** keep all known story, persistence, interaction, transition, render and lifecycle gaps explicit while promoting the Continue transaction findings from general notes to an implementation-ready contract.

- [x] Preserve manifest and save-admission prerequisites.
- [x] Preserve inspection-command prerequisites.
- [x] Expand Continue mutation-order failures.
- [x] Expand stage preparation and rollback failures.
- [x] Expand Three.js resource-retirement failures.
- [x] Expand first-frame and terminal-state failures.
- [x] Record missing validation rows.

## Story-manifest gaps

- The exported `scenes` array has no manifest id, schema version or content fingerprint.
- Nested scene, hotspot, clue, stage, material and post descriptors remain mutable.
- Scene and hotspot identity, clue ownership and requirement resolution are not validated.
- Story and StageKit cannot prove they consumed the same immutable definition.

## Save and load gaps

- The `.v1` key stores an unversioned raw object.
- Parsed data is shallow-merged without field validation.
- Unknown scene ids, route ids, inspected ids and clue strings are not reconciled.
- Story phase, story revision, save revision, manifest fingerprint and state fingerprint are absent.
- `saveState()` has no typed result, conflict check or storage-failure handling.
- Live state can advance even when persistence fails.

## Inspection-command gaps

- Side-panel and raycast paths pass full descriptor objects directly into mutation.
- No canonical hotspot lookup, command id, input sequence, expected story revision or expected stage epoch exists.
- Caller-supplied text and clue grants are trusted.
- No accepted, duplicate, rejected, no-op or failed inspection result exists.
- Completion has no canonical proof receipt.

## Interlude gaps

- Completion schedules an unretained 450 ms timeout.
- The callback has no story revision, scene id, stage epoch or runtime-session fence.
- No timeout lease can be cancelled during reset, disposal or a future overlapping transition.
- Interlude pending/open state is not durable.
- Multiple completion evaluations have no duplicate scheduling result.

## Continue-admission gaps

- Continue is a direct button callback.
- No command id, expected story revision, expected stage epoch or completion proof is supplied.
- No explicit policy distinguishes next-scene, terminal, duplicate, stale and blocked commands.
- Repeated button presses have no typed no-op or duplicate result.

## Story-transition gaps

- `currentScene`, `state.sceneId`, route and notebook mutate before stage preparation.
- Interlude DOM hides before transition success.
- No immutable transition plan or candidate StorySnapshot exists.
- Story, DOM, persistence and stage changes have no shared transaction id.
- No monotonic story revision or transition revision exists.
- No compensation policy exists for partial failure.

## Stage-preparation gaps

- `StageKit.loadScene()` clears the live stage before constructing the replacement.
- Background, fog, camera, post uniforms and children mutate directly on the live scene.
- No detached stage group is prepared and validated first.
- A failure can leave a partial replacement scene.
- No preparation result reports resource counts, hotspot bindings or descriptor identity.
- No rollback can restore the previous stage.

## Resource-retirement gaps

- `stageGroup.clear()` detaches objects without disposing geometry or materials.
- `this.materials = []` loses tracked scene-material references before retirement.
- Hotspot geometries and transparent materials are not disposed.
- No retired-resource ledger identifies the previous stage epoch.
- No idempotent scene-resource disposal contract exists.
- No full `StageKit.dispose()` retires renderer, render target, post material, post geometry, listeners or RAF.

## Persistence-commit gaps

- Persistence occurs after story and stage mutation.
- A failed write can leave visible and durable state divergent.
- No expected save revision or conflict result exists.
- No durable transition receipt correlates save revision to story revision and stage epoch.
- No recovery policy exists for save success followed by stage commit failure.

## Frame-acknowledgement gaps

- Recursive RAF frames have no ids.
- Stage epochs are absent.
- Continue receives no first-rendered-frame receipt.
- Debug output cannot distinguish prepared, committed, visible, failed or rolled back.
- Camera, hotspots, post uniforms and story DOM have no shared committed-frame fingerprint.

## Terminal-state gaps

- Final Continue changes only interlude copy.
- No durable terminal phase, terminal receipt or terminal transition revision is stored.
- Repeated final Continue presses are not classified.
- Reset and reload behavior from terminal state is not explicitly specified.

## Validation gaps

- `npm run check` is syntax-only.
- No Continue admission fixture exists.
- No detached stage preparation or injected-failure fixture exists.
- No story/save/stage rollback fixture exists.
- No geometry/material disposal-count fixture exists.
- No first-frame acknowledgement fixture exists.
- No terminal idempotency fixture exists.
- No stale timeout or stale Continue fixture exists.
- No browser scene-transition smoke exists.

## Deferred work

```txt
new rooms or story branches
inventory
audio
renderer replacement
shader redesign
camera retuning
visual polish
```
