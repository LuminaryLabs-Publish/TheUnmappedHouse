# Interaction audit: Hotspot stage-epoch admission

Timestamp: `2026-07-10T20-38-24-04-00`

## Current input paths

```txt
side-panel button
  -> closes over a hotspot descriptor
  -> inspectHotspot(hotspot)

canvas click
  -> raycast current hotspot mesh array
  -> read mesh.userData.hotspot
  -> inspectHotspot(hotspot)
```

Both paths pass full descriptor objects into gameplay mutation. The raycast path adds an additional render-host identity problem: the selected mesh carries no committed scene id, stage epoch, source revision or commit id.

## Scene replacement risks

- `hovered` is not explicitly cleared when `loadScene()` replaces the group.
- The hover label can retain copy from the prior stage until the next pointer event.
- Pick results cannot prove they came from the currently committed stage.
- A future asynchronous preparation/commit implementation would need stale-result rejection.
- Full descriptor objects couple render meshes to mutable gameplay source objects.

## Required canonical render reference

```json
{
  "sceneId": "library-blank-map",
  "hotspotId": "map",
  "stageEpoch": 1,
  "sourceRevision": "<fingerprint>",
  "commitId": "stage-commit-0001"
}
```

The mesh should retain only this immutable reference. The browser story runtime should resolve it through the canonical story manifest before mutation.

## Admission path

```txt
pick result
  -> extract immutable hotspot ref
  -> compare stageEpoch to current committed epoch
  -> compare sceneId to committed scene identity
  -> compare sourceRevision to active story source
  -> reject stale or unknown refs
  -> create canonical story command with inputOrigin=raycast
  -> return typed result
```

Side-panel buttons should construct the same command shape with `inputOrigin=side-panel`. They do not need a stage epoch for DOM membership, but should include the currently committed scene identity so diagnostics can prove visual and story alignment.

## Required outcomes

```txt
accepted
repeated
rejected_unknown_hotspot
rejected_wrong_scene
rejected_stale_stage_epoch
rejected_stale_source
no_op
```

## Commit behavior

On successful stage commit:

```txt
hovered = null
hover label hidden
hotspot array replaced once
stage epoch incremented once
new hotspot refs stamped with committed epoch
```

On failed preparation:

```txt
old hotspot array retained
old epoch retained
old hover state may remain valid
candidate hotspot refs discarded with candidate ledger
```
