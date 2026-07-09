# Hotspot to Command Adapter Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Current interaction seam

Hotspot interaction enters story logic through two paths:

```txt
side-panel button click -> inspectHotspot(hotspot)
StageKit raycast click -> onHotspot callback -> inspectHotspot(hotspot)
```

Both paths pass the full hotspot object into `src/game.js`, where state mutation, clue grants, log writes, completion checks, interlude scheduling, UI projection, and save writes happen inline.

## Target command seam

```txt
hotspot UI event or StageKit callback
  -> StoryCommandEnvelope {
       type: story.inspect_hotspot,
       sceneId,
       hotspotId,
       source: side_panel | stage_raycast,
       timestamp,
       requestId
     }
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryBrowserAdapterPlan
```

## Required command results

```txt
inspect_first_hotspot:
  status: accepted
  reason: hotspot_inspected
  emits: clue_granted, log_written, projection_updated, maybe scene_completed

repeat_hotspot:
  status: no_mutation
  reason: hotspot_repeated
  emits: log_written, projection_updated

unknown_hotspot:
  status: rejected
  reason: hotspot_unknown
  emits: rejection_recorded, projection_updated
```

## Browser adapter plan outputs

```txt
textProjection
hotspotListProjection
notebookProjection
saveProjection
interludeProjection
stageProjection
debugProjection
hostDiagnosticsProjection
```

## Stop condition

Stop when both side-panel and StageKit paths dispatch the same command envelope shape and consume the same adapter plan without duplicating story rules in browser handlers.
