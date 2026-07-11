# Render audit: hotspot stage-epoch consumption gap

Timestamp: `2026-07-11T06-21-57-04-00`

## Current render path

```txt
scene hotspot descriptor
  -> StageKit.createHotspot()
  -> invisible BoxGeometry and MeshBasicMaterial
  -> full descriptor assigned to mesh.userData.hotspot
  -> mesh appended to live stageGroup and hotspots array
  -> pointer raycast returns mesh
  -> click forwards descriptor to story mutator
```

## Findings

- Pick meshes carry mutable descriptor objects instead of immutable scene/hotspot references.
- No stage epoch identifies which committed stage produced the mesh.
- No frame id identifies which rendered view the pointer sample or click targeted.
- `loadScene()` clears and replaces hotspot arrays, but `hovered` and hover-label state are not explicitly retired.
- The raycast result is not checked against `currentScene.id` before story mutation.
- Side-panel buttons bypass the rendered stage entirely, but produce the same untyped mutation path.
- No render-consumption row proves that a committed inspection result was projected by the matching scene and stage epoch.

## Required render-side record

```txt
HotspotPickObservation {
  pointerSequence
  frameId
  stageEpoch
  sceneId
  hotspotId
  viewport
  normalizedPointer
  hitDistance
}
```

The story runtime should consume only the identity fields and resolve the canonical hotspot from the story manifest. It must never trust clue grants or story text carried by mesh `userData`.

## Stage replacement requirements

```txt
prepare next scene
  -> build pick meshes tagged with candidate stage epoch
  -> commit stage epoch atomically
  -> retire prior hotspot index
  -> clear stale hover observation and label
  -> accept picks only from current committed epoch
```

## Required proof rows

```txt
pick-observation-carries-current-stage-epoch
old-stage-pick-rejected-after-transition
hover-label-cleared-on-stage-commit
mesh-userdata-carries-identity-not-authority-payload
side-panel-and-raycast-resolve-same-canonical-hotspot
accepted-inspection-correlates-to-first-feedback-frame
failed-or-stale-inspection-does-not-change-rendered-feedback
```

## Conclusion

Hotspot rendering is currently both presentation and an unversioned authority payload. The renderer should emit identity observations only; the story domain must own canonical hotspot data, admission and mutation.
