# Known gaps: The Unmapped House

Timestamp: `2026-07-11T21-48-44-04-00`

## Plan ledger

**Goal:** keep story, persistence, pointer, inspection, transition, lifecycle, rendering, WebGL recovery, diagnostics and validation gaps explicit while promoting StoryManifest admission into an implementation-ready contract.

- [x] Trace authored story definitions through startup, progression, UI closures, StageKit consumption, hotspot `userData`, completion and persistence.
- [x] Define schema, index, graph, ownership, descriptor validation, freeze, fingerprint, admission result, observation, journal and fixture gaps.
- [x] Preserve StorySnapshot, pointer, inspection, Continue, lifecycle, surface, context and committed-frame work downstream.
- [ ] Implement and execute the manifest gate.

## StoryManifest gaps

- No root StoryManifest object exists.
- `gameTitle` and `scenes` are separate mutable exports.
- No manifest id, schema version, content version or deterministic fingerprint exists.
- No canonical initial-scene declaration exists outside array position zero.
- No scene, hotspot, clue, requirement or successor indexes exist.
- Scene progression is inferred from array order.
- Terminal state is inferred from the absence of `scenes[index + 1]`.
- No explicit successor graph or terminal descriptor exists.
- No validation proves scene ids are unique.
- No validation proves hotspot ids are unique within a scene.
- No validation proves clue grants and requirements resolve.
- No validation proves required clues are owned and reachable.
- No validation proves camera, geometry, material or post descriptors are supported and finite.
- The descriptor graph is not canonicalized or deep-frozen.
- No typed manifest admission result exists.
- No detached manifest observation or bounded journal exists.

## Manifest consumption gaps

- StageKit stores the supplied scene object by reference.
- Hotspot meshes store complete mutable hotspot descriptors in `mesh.userData`.
- Side-panel buttons close over complete mutable hotspot descriptors.
- No scene-plan hash, hotspot-set hash or manifest fingerprint is attached to stage resources.
- No visible frame cites the content identity that produced it.
- No stale-manifest or stale-descriptor result can be rejected.

## Story and persistence gaps

- The `.v1` save remains an unversioned raw object with broad-catch parsing and shallow merge.
- Saved data cites no manifest id, schema version or fingerprint.
- An unknown saved `sceneId` visually falls back to the first scene while the invalid id remains in persisted state.
- No semantic admission, migration, reconciliation, quarantine, typed persistence result, bootstrap rollback or first-bootstrap-frame result exists.
- Inspections, clues, route, current scene, completion and terminal state can disagree.

## Pointer observation and pick gaps

- The runtime uses `mousemove`, not one canonical pointer-event adapter.
- The click listener ignores the click event object and uses ambient pointer state.
- No pointer sample, input modality, revision provenance, stale-result rejection or typed pick result exists.
- Canvas and side-panel paths dispatch complete descriptors rather than canonical ids.

## Inspection and transition gaps

- No command identity, sequence, canonical lookup, immutable receipt, clue provenance or typed inspection result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- Continue mutates live story state before replacement stage and persistence success.
- Continue resolves successor by array position instead of an admitted graph.
- No transition lock, rollback, stage epoch, first-successor-frame, retirement result or durable terminal phase exists.

## Runtime lifecycle and resource gaps

- RAF, resize, pointer, click, keyboard, button closures, context events and timeouts are not managed through revocable leases.
- `stageGroup.clear()` detaches resources without disposing geometries or materials.
- Renderer, target, post resources, canvas and WebGL context have no explicit teardown result.
- No `sessionId`, session generation, callback fence, resource inventory or idempotent stop/dispose contract exists.

## Render composition and resolution gaps

- CSS aspect-frame geometry and internal GPU resolution are conflated inside `StageKit.resize()`.
- DPR is sampled directly and capped only at `2`; no pixel or capability budget exists.
- No resize generation, surface revision, atomic commit, rollback or first-visible-frame acknowledgement exists.

## WebGL context lifecycle gaps

- The application installs no context-loss or restoration listener.
- No canonical context state, context generation or resource generation exists.
- No complete rebuild, rollback or recovered-frame transaction exists.

## Visible-frame and diagnostics gaps

- No barrier proves manifest, snapshot, scene descriptor, stage resources, camera, hotspot set, post settings and displayed frame agree.
- The debug panel exposes story state but no manifest identity, version, fingerprint, snapshot revision or frame provenance.
- No detached clone-safe manifest observation exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No StoryManifest schema, duplicate-id, graph, ownership, descriptor, freeze, fingerprint or render-parity fixture exists.
- No fixture proves an unknown saved scene is reconciled instead of silently split from the visible scene.
- Existing validation does not execute StoryManifest, persistence, pointer picking, inspection, transition, lifecycle, render-surface, resource retirement, context recovery or committed-frame behavior.

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
