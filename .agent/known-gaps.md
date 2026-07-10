# Known gaps: The Unmapped House

Timestamp: `2026-07-10T17-29-23-04-00`

## Scene descriptor gaps

- Scene descriptors have no schema version, source fingerprint, validation result, or detached normalized snapshot.
- Camera vectors, FOV, fog, geometry sizes, prop kinds, hotspot ids, material values, and post values are trusted at runtime.
- Duplicate hotspot ids and unsupported descriptor combinations are not rejected before mutation.
- No deterministic descriptor-to-resource plan exists.

## Stage-load authority gaps

- `StageKit.loadScene()` mutates the live stage directly and returns no result.
- The current stage is cleared before the replacement is validated or fully built.
- Layer, prop, and hotspot creation is incremental; an exception can leave a partial replacement.
- Background, fog, camera, and post uniforms can be partially updated before failure.
- No prior-stage retention, rollback, or failed-load recovery path exists.
- No scene epoch, build-plan id, load request id, commit id, or frame acknowledgement exists.

## Resource-lifetime gaps

- `stageGroup.clear()` detaches meshes but does not dispose their geometries.
- Shader materials are replaced in `this.materials` before retirement/disposal can be observed.
- Hotspot geometries and transparent materials are not tracked for disposal.
- Resource ownership is implicit and split across group children, `materials`, `hotspots`, render targets, and constructor fields.
- No created/retained/retired/disposed/leaked resource ledger exists.
- The constructor starts a permanent RAF and browser listeners with no teardown contract.
- `StageKit.dispose()` does not exist.

## Story/render correlation gaps

- `nextScene()` mutates `currentScene`, `state.sceneId`, and route before any typed StageKit load acknowledgement.
- Story state has no expected stage epoch or presented frame id.
- A successful save does not prove the renderer consumed the same scene.
- A StageKit exception can interrupt the transition with no typed story result or rollback.
- Terminal projection has no stage/story presentation record.

## Interaction gaps

- Raycast picks forward live hotspot descriptor objects through a callback.
- Pick hit/miss paths return no JSON-safe observation.
- Pick observations have no scene id or epoch id.
- Stale hits from a retired scene cannot be detected by contract.
- Side-panel and raycast origins are discarded before story mutation.

## Save and lifecycle companion gaps

- Save data has no internal schema/source fingerprint and is shallow-merged.
- Unknown nested scene/hotspot/clue ids are not reconciled.
- Story lifecycle remains implicit across clues, timers, DOM classes, and terminal copy.
- Continue and reset return no typed result.
- Interlude and terminal state do not round-trip.

## Validation gaps

- `npm run check` performs syntax checks only.
- No descriptor-preflight fixture exists.
- No invalid-descriptor failure-injection matrix exists.
- No atomic scene replacement or rollback fixture exists.
- No geometry/material disposal fixture exists.
- No frame-loop/listener teardown fixture exists.
- No story-scene/stage-epoch/frame correlation fixture exists.
- No stale hotspot pick fixture exists.
- No browser smoke automation exists.

## Deferred work

```txt
new story rooms
additional branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
