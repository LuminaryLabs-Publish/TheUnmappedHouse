# Render audit: manifest and scene-render provenance gap

Timestamp: `2026-07-11T08-11-14-04-00`

## Goal

Prove that every visible scene, hotspot volume and post-processing configuration came from the same admitted immutable story definition used by gameplay and persistence.

## Current render flow

```txt
mutable scene object from `scenes`
  -> StageKit.loadScene(sceneData)
  -> clear live group
  -> create layer and prop geometry/materials
  -> create invisible hotspot meshes
  -> attach full hotspot descriptor to mesh.userData
  -> configure camera, fog and post uniforms
  -> recursive RAF renders target and post pass
```

## Current gap

The stage receives no:

```txt
storyManifestId
storyManifestFingerprint
sceneDefinitionFingerprint
storyRevision
transitionId
stageEpoch
prepare/commit result
firstFrameId
```

The browser story runtime and StageKit share object references, not a stable definition identity. If source objects are mutated before or after scene construction, gameplay, persistence, side-panel buttons and rendered pick volumes can disagree without any diagnostic proof.

## Manifest-related render risks

- Duplicate or unknown hotspot ids can create ambiguous pick authority.
- Invalid camera, stage, material or post shapes are discovered only during live Three.js construction.
- An unknown saved scene id can display scene zero while persistence still claims another scene.
- Hotspot meshes retain full mutable descriptor objects rather than canonical ids and definition fingerprints.
- Stage replacement clears the group but does not dispose old geometry or material resources.
- No first rendered frame acknowledges the admitted scene definition.

## Required render contract

```txt
SceneRenderPlan
  manifestId
  manifestFingerprint
  sceneId
  sceneDefinitionFingerprint
  storyRevision
  transitionId
  stageEpoch
  camera descriptor
  fog descriptor
  layer descriptors
  prop descriptors
  hotspot pick descriptors containing ids only
  post descriptor
```

```txt
SceneRenderCommitResult
  status
  reason
  manifestFingerprint
  sceneId
  sceneDefinitionFingerprint
  stageEpoch
  resourceCounts
  firstFrameId
```

## Required proof rows

```txt
runtime-and-stage-manifest-fingerprints-match
scene-definition-fingerprint-matches-committed-resources
unknown-scene-never-renders-under-invalid-persisted-identity
hotspot-pick-volumes-use-scene-and-hotspot-ids-only
invalid-render-descriptor-rejected-before-live-stage-clear
first-frame-acknowledges-scene-definition-and-stage-epoch
old-scene-resources-retired-after-commit
```

## Dependency note

Do not implement stage commit or frame correlation before canonical manifest and snapshot identity. The render path needs those identities as inputs, not local ad hoc hashes.
