# Gameplay audit: inspection, clue and completion loop

Timestamp: `2026-07-11T06-21-57-04-00`

## Authored content

```txt
3 scenes
3 hotspots per scene
9 hotspots total
9 unique clue grants
3 required clues per scene
450 ms delayed interlude after derived completion
```

## Current mutation loop

```txt
inspect descriptor
  -> read inspected[currentScene.id]
  -> if seen: re-read text, log, UI and save
  -> if unseen: mark descriptor.id under currentScene.id
  -> grant descriptor.grants into global clues
  -> project descriptor.text
  -> write notebook row
  -> test current scene requirements against global clues
  -> maybe schedule interlude
  -> UI projection
  -> save
```

## Gameplay authority gaps

- The caller supplies `hotspot.id`, `grants`, `text`, `label` and `changesText`.
- No check proves that the descriptor belongs to `currentScene`.
- Inspection is keyed to the current scene even when the payload originated elsewhere.
- Clues have no scene owner, source hotspot, grant command or story revision.
- Completion proves only string inclusion in a global array.
- A repeated hotspot creates a new notebook and save effect without a typed no-op policy.
- Completion can schedule multiple delayed interlude callbacks if distinct accepted calls race around the final clue.
- No explicit phase prevents inspections while the interlude is open or a scene transition is in progress.
- No immutable completion receipt exists for Continue admission.

## Required gameplay state

```txt
storyManifestId
storyRevision
phase
activeSceneId
sceneInspectionLedger[sceneId][hotspotId]
clueGrantLedger[clueId] {
  sceneId
  hotspotId
  commandId
  storyRevision
}
sceneCompletionProof[sceneId]
pendingInterlude
```

## Completion policy

A scene completes only when every required clue is proven by an accepted inspection of a canonical hotspot owned by that scene under the current story manifest. Old-scene, future-scene, unknown or caller-supplied clues must not satisfy the predicate.

## Required fixture rows

```txt
all-nine-canonical-hotspots-map-to-one-scene-owner
unknown-hotspot-rejected
old-scene-hotspot-rejected-after-transition
future-scene-hotspot-rejected
caller-supplied-extra-grant-ignored
accepted-inspection-grants-only-canonical-clues
repeat-inspection-is-idempotent
final-clue-creates-one-completion-proof
completion-schedules-one-interlude
inspection-rejected-during-interlude-or-transition
reload-preserves-authoritative-inspection-and-clue-provenance
```

## Product constraint

Preserve all current story text, scene order, three-hotspot pacing and visual presentation. This is an authority and proof change, not a content expansion.
