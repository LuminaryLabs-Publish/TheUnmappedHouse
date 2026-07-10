# Interaction audit: hotspot command projection result map

Timestamp: `2026-07-10T08-39-05-04-00`

## Current interaction inputs

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit canvas click
  -> pick()
  -> hotspot = hit.object.userData.hotspot
  -> onHotspot(hotspot)
  -> inspectHotspot(hotspot)

continue button click
  -> nextScene()

KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Current command paths

### Hotspot inspect

```txt
inspectHotspot(hotspot)
  -> reads state.inspected[currentScene.id]
  -> if repeated: sets text, writes Re-read log, renderUi(), saveState(), return undefined
  -> if first: marks inspected, grants clues, sets text, writes log
  -> if sceneComplete(currentScene): writes map log and schedules showInterlude(currentScene)
  -> renderUi()
  -> saveState()
  -> return undefined
```

### Continue

```txt
nextScene()
  -> find current scene index
  -> if no next: writes prototype-complete text to interlude DOM and returns undefined
  -> otherwise mutates currentScene, state.sceneId, route, log
  -> closes interlude DOM
  -> stage.loadScene(currentScene)
  -> renderUi()
  -> saveState()
```

## Missing interaction records

```txt
StoryCommandEnvelope
StoryCommandSource
StoryPreflight
StoryCommandResult
StoryReasonCode
StoryProjectionRecord
StoryAdapterLedgerRow
BrowserAdapterReadback
```

## Missing stable outcomes

```txt
inspect accepted
inspect repeated no_mutation
inspect unknown hotspot rejected
inspect stale hotspot rejected
inspect scene mismatch rejected
scene complete
continue accepted next scene
continue terminal
reset requested
save requested
stage load requested
projection requested
```

## Finding

The interaction loop has useful behavior but no typed output. Repeated inspection and terminal continue are especially important because they currently return by side effect only, so tests cannot distinguish no-op, accepted/no-mutation, accepted/terminal, or rejected cases without DOM inspection.

## Next interaction ledge

Add command envelopes and result rows first, then route both side-panel and StageKit click paths through the same source-owned command API.
