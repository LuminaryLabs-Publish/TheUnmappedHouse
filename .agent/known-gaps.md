# Known gaps: The Unmapped House

Timestamp: `2026-07-10T20-38-24-04-00`

## Atomic scene replacement gaps

- `StageKit.loadScene()` clears the committed group before the replacement is validated or fully built.
- Scene creation mutates live camera, fog, post uniforms and group membership incrementally.
- A descriptor or resource-construction failure can leave a partial or blank stage.
- No prepare/commit split exists.
- No typed stage-load result records request, validation, preparation, commit or failure.
- No committed scene identity or monotonically increasing `stageEpoch` exists.

## Three.js resource gaps

- `Group.clear()` detaches prior meshes but does not dispose their geometries or materials.
- `this.materials = []` drops prior anime-material references before cleanup.
- Hotspot `MeshBasicMaterial` resources are never included in the material list.
- No scene-local ledger owns geometries, materials, textures or object roots.
- Persistent post geometry, post material, render target and renderer have no teardown owner.
- No duplicate-disposal guard or disposed-resource accounting exists.
- Traversing the current route creates 28 stage meshes while only the newest scene remains attached.

## Frame-loop and listener gaps

- Recursive RAF starts in the constructor and its id is not retained.
- The frame loop has no explicit running, paused or disposed state.
- Resize, pointer-move and click handlers are anonymous closures and cannot be deterministically removed.
- No visibility or host-detachment policy exists.
- Repeated construction can create additional frame loops and listener sets.
- `dispose()` is absent and idempotent teardown is unproven.

## Hotspot and interaction gaps

- Hotspot meshes retain full live descriptor objects rather than canonical source refs.
- Pick results contain no scene id, source revision, stage epoch or commit id.
- Stale picks cannot be rejected by contract.
- `hovered` and hover-label visibility are not explicitly reset during scene replacement.
- Side-panel and raycast paths still lack one typed canonical story-command result.

## Diagnostics gaps

- Debug JSON exposes story state but not renderer lifecycle state.
- No stage build, commit, failure or disposal journal exists.
- Current live resource counts and cumulative disposed counts are unavailable.
- No JSON-safe record proves which scene is actually committed for rendering.
- Raw Three.js objects remain the only detailed runtime evidence.

## Validation gaps

- `npm run check` performs syntax checks only.
- No pure stage-build-plan fixture exists.
- No failure-injection test proves the old scene survives replacement failure.
- No resource-ledger test proves exact disposal counts.
- No stale-stage-epoch pick fixture exists.
- No listener/RAF teardown fixture exists.
- No browser smoke repeatedly loads all scenes and disposes the host.

## Upstream story-authority gaps retained

- `story-data.js` still has no schema version, manifest id or source fingerprint.
- Saves are shallow-merged without schema validation or source reconciliation.
- Descriptor objects still cross the input-to-mutation boundary.
- Completion still trusts persisted global clue strings.
- Interlude timers still lack command, scene and source correlation.

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
