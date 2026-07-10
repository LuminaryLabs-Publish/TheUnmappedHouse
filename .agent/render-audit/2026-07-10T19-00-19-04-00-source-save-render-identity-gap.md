# Render audit: source, save and rendered-scene identity gap

Timestamp: `2026-07-10T19-00-19-04-00`

## Current render path

```txt
parsed save state.sceneId
  -> scenes.find(scene.id === state.sceneId)
  -> fallback to scenes[0] when not found
  -> StageKit.loadScene(currentScene)
  -> raw scene descriptor becomes live Three.js resources
  -> hotspot descriptor objects are stored on invisible meshes
  -> raycast forwards the descriptor object back to story mutation
```

## Identity split

When a persisted `sceneId` is unknown, `currentScene` falls back to the first scene but `state.sceneId` is not repaired before StageKit loads and the state is saved again. The runtime can therefore have these simultaneous values:

```txt
persisted scene id: unknown/stale value
resolved story scene: library-blank-map
loaded StageKit scene: library-blank-map
debug scene field: library-blank-map
save source revision: unknown
render source revision: unknown
```

The visual output looks valid while the persisted authority is invalid. There is no explicit repair row or source fingerprint proving why the fallback occurred.

## Hotspot render coupling

`createHotspot()` stores the entire authored hotspot object in `mesh.userData.hotspot`. `clickHotspot()` retrieves that object and calls the story callback directly.

This couples:

```txt
authored source descriptor
live render mesh
raycast result
story mutation request
```

A canonical render reference should instead be bounded data:

```txt
{
  manifestId,
  sourceFingerprint,
  sceneId,
  hotspotId,
  sceneEpochId
}
```

The story domain should resolve that reference through the current manifest rather than trusting a live descriptor object owned by the render host.

## Required render readback

```txt
manifestId
sourceFingerprint
requestedSceneId
resolvedSceneId
saveSceneIdBeforeRepair
saveSceneIdAfterRepair
stageSceneId
sceneEpochId
firstPresentedFrameId
hotspotReferenceCount
latestPickReference
latestPickResult
identityStatus
identityReason
```

## Required identity states

```txt
matched
save_repaired
source_migrated
stage_pending
stage_rejected
stale_pick_rejected
render_mismatch
```

## Relationship to the existing StageKit plan

The prior atomic StageKit audit remains valid:

```txt
preflight descriptors
build detached resources
commit one scene epoch
retire/dispose prior resources
acknowledge first frame
```

The source/save work adds the identity contract that the atomic commit should consume. StageKit should not invent source authority; it should receive canonical source identity and return render observations correlated to it.

## Fixture target

```txt
valid-save-scene-renders-matched
unknown-save-scene-repaired-before-render
stale-source-save-migrated-or-reset
stage-load-request-has-source-fingerprint
hotspot-mesh-stores-canonical-reference
raycast-result-resolves-through-manifest
stale-source-pick-rejected
save-resolved-stage-frame-identities-match
```

## Constraint

Do not alter the current shader, camera, composition, aspect ratio, post-processing or scene copy during this boundary work.
