# Architecture audit: inspection command authority DSK map

Timestamp: `2026-07-11T06-21-57-04-00`

## Goal

Create one authoritative path from an input intent to a scene-scoped hotspot result, clue mutation, completion proof, persistence result and observable frame.

## Current architecture

```txt
story-data-kit
  -> scene and hotspot descriptor objects

side-panel-input
  -> button closure captures hotspot object
  -> inspectHotspot(hotspot)

raycast-input
  -> mesh.userData.hotspot stores hotspot object
  -> clickHotspot()
  -> inspectHotspot(hotspot)

browser-story-runtime-kit
  -> trust descriptor object
  -> use currentScene.id for inspected ledger
  -> grant global clue strings
  -> evaluate completion
  -> schedule interlude
  -> project UI
  -> write localStorage
```

## Authority split

| Concern | Current owner | Missing proof |
|---|---|---|
| Scene identity | `currentScene` mutable variable | Expected scene id and story revision |
| Hotspot identity | Arbitrary descriptor object | Manifest membership and descriptor fingerprint |
| Input source | DOM closure or mesh payload | Canonical source and input sequence |
| Admission | Direct function call | Phase, scene, stage and duplicate checks |
| Inspection mutation | `state.inspected[currentScene.id]` | Scene/hotspot revision and accepted result |
| Clue mutation | Global string array | Scene-scoped grant authority and provenance |
| Completion | Global clue inclusion | Scene-scoped completion proof |
| Persistence | Direct localStorage write | Typed result and save revision |
| Rendering | Later recursive RAF | Stage epoch and first consuming frame |
| Diagnostics | Mutable debug JSON | Immutable command/result/frame row |

## Required parent domain

```txt
the-unmapped-house-inspection-authority-domain
```

## Update existing kits first

```txt
story-data-kit
  add manifest identity, scene revision, hotspot identity and clue ownership

browser-story-runtime-kit
  stop accepting descriptor objects as commands
  dispatch canonical command envelopes

inspection-ledger-kit
  record accepted scene/hotspot observations with revision and command id

clue-ledger-kit
  grant scene-owned clue ids from admitted hotspot definitions only

hotspot-volume-kit
  store immutable sceneId/hotspotId/stageEpoch references in userData

hotspot-picking-kit
  return a typed pick observation instead of a raw descriptor

localstorage-save-kit
  return typed persistence results with save revision

debug-json-projection-kit
  project bounded immutable command and result rows
```

## Missing coordinating kits

```txt
inspection-command-envelope-kit
  commandId, source, sceneId, hotspotId, expectedStoryRevision, expectedStageEpoch

inspection-command-admission-kit
  validate phase, scene, hotspot membership, stage epoch and command uniqueness

hotspot-manifest-index-kit
  canonical scene/hotspot/clue lookup and fingerprints

hotspot-pick-observation-kit
  sceneId, hotspotId, stageEpoch, frameId and pointer sample

inspection-result-kit
  accepted, rejected, duplicate, no_op or failed result

scene-scoped-clue-grant-kit
  derive grants from canonical manifest data, never caller payload

scene-completion-proof-kit
  prove required scene-owned clues under one story revision

inspection-transaction-kit
  commit inspection, clues, log, phase and persistence as one result

inspection-journal-kit
  bounded JSON-safe commands, results and effects

inspection-feedback-projection-kit
  project text, hotspot checkmark, interlude and debug state from committed result

inspection-frame-correlation-kit
  correlate command/result/story revision/stage epoch/rendered frame

inspection-authority-fixture-kit
  pure stale, forged, duplicate, dual-ingress and reload scenarios
```

## Canonical flow

```txt
input intent
  -> normalize to sceneId/hotspotId command
  -> resolve canonical hotspot from manifest index
  -> preflight phase, story revision and stage epoch
  -> reject stale, forged or duplicate command
  -> derive scene-owned grants from canonical hotspot
  -> build candidate story snapshot
  -> persist with expected revision
  -> commit inspection result
  -> project UI and interlude from committed snapshot
  -> acknowledge rendered stage epoch and result
```

## Result contract

```txt
InspectionResult {
  commandId
  status
  reason
  source
  sceneId
  hotspotId
  storyRevisionBefore
  storyRevisionAfter
  stageEpoch
  grantedClueIds
  completionProofId
  saveRevision
  committedFrameId
}
```

## Dependency order

```txt
versioned story manifest and snapshot
  -> hotspot manifest index
  -> canonical inspection command
  -> admission and duplicate policy
  -> scene-scoped clue grants
  -> completion proof
  -> persistence transaction
  -> feedback and frame correlation
  -> fixture gate
  -> atomic story/stage Continue transition
```
