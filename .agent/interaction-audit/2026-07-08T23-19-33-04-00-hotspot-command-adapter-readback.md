# Hotspot Command Adapter Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Current interaction path

```txt
hotspot side-panel button
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> clickHotspot()
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

## Current responsibilities inside `inspectHotspot`

```txt
check repeated inspection
mutate state.inspected
mutate state.clues
write visible text
write notebook log
check sceneComplete(currentScene)
schedule showInterlude(currentScene)
renderUi()
saveState()
```

## Interaction gap

`inspectHotspot` is doing command creation, validation, mutation, projection, save, and UI readback in one browser function.

There is no typed command result for:

```txt
first hotspot inspect
repeat hotspot inspect
unknown hotspot
invalid scene
scene incomplete
scene complete
save requested
projection updated
```

## Target contract

```txt
StageKit callback or DOM button
  -> StoryCommandEnvelope {
       type: story.inspect_hotspot,
       source: stage_raycast | hotspot_button,
       sceneId,
       hotspotId,
       timestampPolicy
     }
  -> StoryPreflight
  -> StoryCommandResult
  -> StoryBrowserAdapterPlan
  -> BrowserAdapterReadback
```

## Browser adapter readback should report

```txt
textContentRequested
hotspotListRequested
notebookEntriesRequested
saveProjectionConsumed
interludeProjectionConsumed
stageProjectionConsumed
GameHostProjectionConsumed
leftUnchanged[]
reason
```

## Fixture rows

```txt
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
complete_library_scene
scene_incomplete_continue
browser_adapter_plan
browser_adapter_readback
GameHost_projection
```

No interaction implementation changed in this pass.
