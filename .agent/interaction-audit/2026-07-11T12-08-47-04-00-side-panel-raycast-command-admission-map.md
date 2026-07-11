# Interaction audit: Side-panel and raycast command admission

Timestamp: `2026-07-11T12-08-47-04-00`

## Goal

Normalize both visible interaction paths into one id-only command contract and define every admission and rejection result.

## Current side-panel path

```txt
renderUi()
  -> create button for currentScene.hotspots[]
  -> closure captures full hotspot descriptor
  -> click
  -> inspectHotspot(descriptor)
```

## Current raycast path

```txt
StageKit.createHotspot(descriptor)
  -> create invisible mesh
  -> mesh.userData.hotspot = descriptor
  -> pointer/click raycast
  -> extract descriptor
  -> onHotspot(descriptor)
  -> inspectHotspot(descriptor)
```

## Shared weakness

Both paths converge, but they converge after authority has already been delegated to a mutable descriptor. Convergence alone does not prove parity, current-scene ownership, stage ownership, canonical definition identity, or exactly-once mutation.

## Required ingress normalization

```txt
side-panel observation
  sceneId + hotspotId + expected story/stage identity

raycast observation
  sceneId + hotspotId + stageEpoch + frameId + pick evidence

both
  -> InspectionCommand
  -> one admission authority
```

## Required admission checks

```txt
session generation is current
story phase accepts inspection
command id is new
input sequence is monotonic
command scene equals current scene
expected story revision equals current revision
expected stage epoch equals committed stage epoch
hotspot exists in canonical manifest
hotspot belongs to command scene
observation source is valid
completion proof is not already terminal for disallowed mutation
```

## Required result statuses

```txt
applied
duplicate
re_read
stale_session
stale_scene
stale_story_revision
stale_stage_epoch
duplicate_sequence
unknown_hotspot
cross_scene_hotspot
phase_rejected
persistence_failed
failed
```

## Side-panel-specific requirements

- Buttons carry ids and expected revisions, not descriptors.
- Old button closures become harmless through revision and stage admission.
- Button labels are projected from canonical current state.
- Re-rendered buttons must not create independent mutation semantics.

## Raycast-specific requirements

- Mesh `userData` contains stable pick identity only.
- Raycast observations include stage epoch and frame id.
- Retired stage picks are rejected.
- Pick distance or hit point is observation evidence, not story authority.
- Three.js objects never cross into the story domain.

## Parity requirements

```txt
same scene/hotspot
  + same expected story revision
  + same expected stage epoch
  -> same admitted canonical hotspot
  -> same inspection receipt shape
  -> same clue grants
  -> same completion proof
  -> same persisted StorySnapshot
```

The source may differ only in observation metadata and journal attribution.

## Required stale-work rows

```txt
old-button-after-continue -> stale_scene or stale_revision
old-raycast-after-stage-swap -> stale_stage_epoch
replayed-command-id -> duplicate
lower-input-sequence -> duplicate_sequence
unknown-id -> unknown_hotspot
scene-two-command-with-scene-one-hotspot -> cross_scene_hotspot
```

## Current claim

The two paths are visually usable but not authority-safe. This pass documents the shared command boundary without changing interaction behavior.
