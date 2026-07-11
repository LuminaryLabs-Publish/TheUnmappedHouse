# Known gaps: The Unmapped House

Timestamp: `2026-07-11T13-49-30-04-00`

## Plan ledger

**Goal:** keep manifest, persistence, inspection, Continue, stage-resource, lifecycle, and validation gaps explicit while promoting the atomic Continue boundary into an implementation-ready contract.

- [x] Preserve StoryManifest, StorySnapshot, and inspection-proof prerequisites.
- [x] Trace completion timeout, Continue, story mutation, live stage replacement, projection, persistence, terminal handling, and frame submission.
- [x] Define admission, detached preparation, atomic commit, rollback, retirement, first-frame, result, journal, and fixture gaps.
- [x] Preserve runtime lifecycle and committed-frame follow-on gates.

## Manifest and persistence gaps

- No stable manifest id, schema version, canonical indexes, or manifest fingerprint exists.
- The `.v1` save is an unversioned raw object shallow-merged without field admission.
- No explicit story phase, story revision, save revision, state fingerprint, typed result, migration, reconciliation, or rollback exists.
- `localStorage.setItem()` happens after live story, stage, and DOM mutation.

## Inspection and completion-proof gaps

- Side-panel and raycast paths submit full hotspot descriptors.
- No command identity, sequence, scene/revision/stage admission, immutable inspection receipt, clue provenance, or typed result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- No immutable `SceneCompletionProof`, consumption state, or exactly-once interlude lease exists.

## Continue admission gaps

- Continue is a direct click callback with no command envelope.
- No completion-proof id, expected story revision, expected stage epoch, sequence, source, or session fence is required.
- Duplicate or programmatic Continue calls can advance repeatedly.
- No transition lock or proof reservation prevents double consumption.

## Completion timeout gaps

- The 450 ms timeout id is not retained.
- The callback reads mutable `currentScene` when it executes.
- No completion-proof id, story revision, stage epoch, session generation, cancellation, or stale-callback result exists.
- A scene change before callback execution can project the wrong interlude copy.

## Story and stage atomicity gaps

- `currentScene`, `state.sceneId`, route, and log mutate before successor stage preparation.
- `StageKit.loadScene()` clears the active group before replacement success is known.
- Successor layers, props, materials, hotspots, camera, fog, and post settings are constructed incrementally in live ownership.
- No detached successor group, resource inventory, preparation result, candidate stage epoch, or validation step exists.
- A constructor or descriptor failure can leave a partial successor under successor story identity.

## Persistence and rollback gaps

- The candidate snapshot is not built before live mutation.
- Persistence occurs after story, stage, and UI changes.
- Storage failure can leave visible and persisted scenes divergent.
- No rollback snapshot, rollback result, recovery state, or retry contract exists.
- Completion proof consumption cannot be coordinated with durable commit.

## Render and frame-proof gaps

- `loadScene()` returns no transition id, stage epoch, resource revision, or commit receipt.
- The recursive RAF is independent of Continue and renders whichever mutable state exists next.
- No first-successor-frame id or consumer acknowledgement exists.
- Story revision, stage epoch, camera, hotspot set, fog, materials, post settings, and frame id are not correlated.

## Resource-retirement gaps

- `stageGroup.clear()` detaches resources without disposing geometry or materials.
- Resetting `materials` and `hotspots` loses ownership references.
- No predecessor resource inventory or retirement receipt exists.
- There is no rule requiring predecessor retirement to wait for successor first-frame acknowledgement.
- Partial successor resources have no deterministic cleanup on preparation failure.

## Terminal-state gaps

- When no successor exists, only interlude text changes.
- No terminal story phase, terminal proof consumption, terminal transition id, or persisted terminal result exists.
- Reload behavior after prototype completion is undefined.

## Runtime lifecycle gaps

- No `sessionId`, session generation, lifecycle state, or callback lease authority exists.
- RAF, resize, pointer, click, keyboard, button closures, and interlude timeouts are not revocable.
- Renderer, render target, post resources, canvas, and WebGL context have no explicit teardown result.

## Validation gaps

- `npm run check` performs syntax checks only.
- No Continue admission, duplicate, stale revision, stale stage, prepare failure, persistence failure, rollback, terminal, resource retirement, or first-frame fixture exists.
- No browser failure-injection smoke proves predecessor preservation or retry.

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