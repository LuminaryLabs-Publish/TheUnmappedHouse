# Known gaps: The Unmapped House

Timestamp: `2026-07-11T20-11-26-04-00`

## Plan ledger

**Goal:** keep story, pointer, inspection, lifecycle, rendering, resolution, WebGL recovery, diagnostics, and validation gaps explicit while promoting pointer picking into an implementation-ready contract.

- [x] Preserve StoryManifest and StorySnapshot authority as prerequisites.
- [x] Trace mousemove, click, normalized coordinates, hover, raycasting, parallax, resize, scene loading, side-panel activation, and story mutation.
- [x] Define pointer sample, modality, revision provenance, stale rejection, typed pick result, parity, observation, journal, and fixture gaps.
- [x] Preserve inspection, Continue, lifecycle, surface, context, and committed-frame work downstream.

## Story and persistence gaps

- No canonical StoryManifest id, schema, indexes, deep freeze, or fingerprint exists.
- The `.v1` save remains an unversioned raw object with broad-catch parsing and shallow merge.
- No semantic admission, migration, reconciliation, quarantine, typed persistence result, bootstrap rollback, or first-bootstrap-frame result exists.
- Inspections, clues, route, current scene, completion, and terminal state can disagree.

## Pointer observation gaps

- The runtime uses `mousemove`, not one canonical pointer-event adapter.
- The shared pointer begins at `(0, 0)` and has no sample id.
- Input modality is not recorded.
- Client coordinates, canvas-local coordinates, normalized coordinates, and canvas-rect identity are not retained as one immutable result.
- No pointer id, event type, timestamp, session generation, stage epoch, surface revision, camera revision, hotspot-set revision, context generation, resource generation, or visible frame id is attached to a sample.
- Hover samples and activation samples are not distinct authority types.
- No leave, cancel, blur, visibility, suspension, restart, or disposal reset contract exists.

## Canvas activation and pick gaps

- The click listener ignores the click event object.
- `clickHotspot()` raycasts with ambient pointer state from the most recent `mousemove`.
- A click before the first mousemove raycasts the canvas center.
- Touch- or pen-oriented activation can depend on default or stale mouse coordinates.
- A resize can retire the canvas geometry without invalidating predecessor pointer state.
- A scene transition can replace camera and hotspot meshes without invalidating predecessor pointer state.
- Context recovery, surface fallback, restart, and disposal have no pointer-sample invalidation path.
- No immutable pick plan exists.
- No typed hit, miss, stale, rejected, unsupported, or failed result exists.
- No stale-result check runs after raycasting.
- Hits expose full mutable hotspot descriptors rather than canonical hotspot ids.
- Misses have no explicit result or diagnostic row.

## Hover and parallax gaps

- Hover state is stored as a mutable descriptor.
- The hover label has no stage, surface, camera, hotspot-set, context, or frame provenance.
- Pointer leave does not explicitly clear hover.
- Window blur does not explicitly clear hover.
- Pointer cancellation is not handled.
- Parallax continues from the last mouse sample until another movement occurs.
- Hover state is not fenced during scene transition, context loss, restart, or disposal.

## Canvas and side-panel parity gaps

- Side-panel buttons close over complete hotspot descriptors.
- Canvas hits dispatch complete hotspot descriptors from `mesh.userData`.
- Neither path returns a typed activation result.
- No canonical activation command unifies the two sources.
- No proof shows both sources resolve the same hotspot id, inspection receipt, clue receipts, completion proof, persistence candidate, story revision, or visible frame.
- No input-modality capability result declares which paths are supported.

## Inspection and transition gaps

- No command identity, sequence, canonical lookup, immutable receipt, clue provenance, or typed inspection result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- Continue mutates live story state before replacement stage and persistence success.
- No transition lock, rollback, stage epoch, first-successor-frame, retirement result, or durable terminal phase exists.
- Pointer and hover state are not explicitly invalidated during Continue.

## Runtime lifecycle and resource gaps

- RAF, resize, pointer, click, keyboard, button closures, context events, and timeouts are not managed through revocable leases.
- `stageGroup.clear()` detaches resources without disposing geometries or materials.
- Renderer, target, post resources, canvas, and WebGL context have no explicit teardown result.
- No `sessionId`, session generation, callback fence, resource inventory, or idempotent stop/dispose contract exists.

## Render composition and resolution gaps

- CSS aspect-frame geometry and internal GPU resolution are conflated inside `StageKit.resize()`.
- DPR is sampled directly and capped only at `2`; no pixel or capability budget exists.
- Renderer and target dimensions are derived without one canonical plan or read-back result.
- No resize generation, surface revision, atomic commit, rollback, stale-result rejection, or first-visible-frame surface acknowledgement exists.
- Pointer normalization cannot cite an admitted surface revision.

## WebGL context lifecycle gaps

- The application installs no context-loss or restoration listener.
- No canonical context state, `contextGeneration`, or `resourceGeneration` exists.
- No render suspension or pointer-pick capability fence exists.
- No complete rebuild plan covers renderer state, target storage, post binding, materials, geometries, hotspot resources, and picking state.
- No restore transaction, rollback result, stale rejection, or first recovered frame acknowledgement exists.
- Pointer samples cannot be invalidated when context or resource generation changes.

## Visible-frame and diagnostics gaps

- No barrier proves pointer sample, canvas rectangle, camera projection, hotspot set, context generation, and displayed frame agree.
- The debug panel exposes story state but no pointer, modality, pick, stage, surface, camera, hotspot, context, resource, or visible-frame identities.
- No detached clone-safe pointer/pick observation exists.
- No bounded pointer/pick journal exists.

## Validation gaps

- `npm run check` performs syntax checks only.
- No browser input is generated during validation.
- No click-before-move, touch, pen, leave, cancel, blur, resize, scene-change, context-change, stale-pick, miss, or parity fixture exists.
- No fixture iterates all nine hotspots through both canvas and side-panel paths.
- No accepted pick is correlated with a visible frame.
- Existing validation does not execute StoryManifest, persistence, pointer picking, inspection, transition, lifecycle, render-surface, resource retirement, context recovery, or committed-frame behavior.

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
